const { signJwt, verifyJwt } = require("../config/commonFunction");
const Users = require("../models/users");

const createToken = async (_req, user) => {
    try {
        console.log(user)
        const expireAt =
            new Date().getTime() +
            parseInt(process.env.ACCESS_TOKEN_EXPIRY_MILISEC)

        let access_token;
        access_token = await signJwt(
            {
                user_id: user._id,
                expireAt
            },
            process.env.ACCESS_JWT_SECRET,
            process.env.ACCESS_EXPIRES_IN_HOURS
        )
        return {
            status: true,
            data: {
                user_id: user._id,
                access_token: access_token,
                access_token_exprires_at: new Date(expireAt)
            }
        }

    } catch (error) {
        return {
            status: false,
            error: error
        }
    }
}
const verifyUser = async (data) => {
    try {

        const tokenInfo = await verifyJwt(
            data.access_token,
            process.env.ACCESS_JWT_SECRET
        )
        // console.log(tokenInfo)

        if (!tokenInfo.status) {
            return {
                status: false,
                statusCode: 401,
                message: tokenInfo.message,
                error: tokenInfo.error
            }
        }
        if (!tokenInfo.data.user_id) {
            return {
                status: false,
                statusCode: 401,
                message: "Token is Invalid",
                error: "User Id Not found In Token"

            }
        }
        // validate userInfo
        const getUser = await getUserInfo(tokenInfo.data.user_id)
        if (!getUser.status) {
            return getUser;
        }
        return {
            status: true,
            data: getUser.data
        }
    } catch (error) {
        return {
            status: false,
            statusCode: 500,
            message: "Internal Server Error",
            error: error
        }
    }
}

const getUserInfo = async (userId) => {
    try {
        const userData = await Users.findById(userId)
        if (!userData) {
            return {
                status: false,
                statusCode: 402,
                message: "User Not Found",
                error: null
            }
        }
        return {
            status: true,
            data: userData
        }
    } catch (error) {
        return {
            status: false,
            statusCode: 500,
            message: "Internal Server Error",
            error: error
        }
    }
}
module.exports = {
    createToken,
    verifyUser
}
