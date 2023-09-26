const { responseWithError, responseREST } = require("../config/commonFunction");
const httpStatus = require("../config/httpStatus");
const Users = require("../models/users");
const { createToken } = require("./authFunctions");
const bcrypt = require('bcrypt');
const userRegisterInDB = async (req, res) => {
    try {
        const {
            email_id,
            first_name,
            last_name,
            password
        } = req.body;


        // check if email id already exist in db;
        const checkUserExist = await Users.findOne({
            email_id
        })
        if (checkUserExist) {
            return responseREST(
                res,
                httpStatus.ALREADY_EXIST,
                "User Already Exist.."
            )
        }

        // hash the password 

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // create user in db
        const userData = await Users.create({
            first_name,
            last_name,
            password: hashedPassword,
            email_id
        })
        // create token
        const getAccessToken = await createToken(
            req,
            userData,
        )
        if (!getAccessToken.status) {
            return responseREST(
                res,
                httpStatus.INTERNAL_SERVER_ERROR,
                'Internal Server Error',
                null,
                ['Could not create Token']
            )
        }

        let dataToreturn = {
            access_token: getAccessToken.data.access_token,
            user_id: userData.user_id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            email_id: userData.email_id
        }
        // user registered Success
        return responseREST(
            res,
            httpStatus.SUCCESS,
            "User Registered Successfully..",
            dataToreturn
        )

    } catch (error) {
        return responseWithError(req, res, error)
    }
}
const loginUserInDB = async (req, res) => {
    try {
        const { email_id, password } = req.body;
        const checkUserExist = await Users.findOne({
            email_id
        })
        if (!checkUserExist) {
            return responseREST(
                res,
                httpStatus.NOT_FOUND,
                "Invalid Email Or Password"
            )
        }
        const checkPassword = await bcrypt.compare(
            password,
            checkUserExist.password
        )
        if (!checkPassword) {
            return responseREST(
                res,
                httpStatus.NOT_FOUND,
                "Invalid Email Or Password"
            )
        }
        // create token
        const getAccessToken = await createToken(
            req,
            checkUserExist
        )
        if (!getAccessToken.status) {
            return responseREST(
                res,
                httpStatus.INTERNAL_SERVER_ERROR,
                'Internal Server Error',
                null,
                ['Could not create Token']
            )
        }

        let dataToreturn = {
            access_token: getAccessToken.data.access_token,
            user_id: checkUserExist.user_id,
            first_name: checkUserExist.first_name,
            last_name: checkUserExist.last_name,
            email_id: checkUserExist.email_id
        }
        return responseREST(
            res,
            httpStatus.SUCCESS,
            "User Login Successfully..",
            dataToreturn
        )

    } catch (error) {
        console.log(error)
        return responseWithError(req, res, error)
    }
}
module.exports = {
    userRegisterInDB,
    loginUserInDB
}