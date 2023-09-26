# To-Do List App

A simple To-Do List application built with Node.js and MongoDB.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- MongoDB installed on your machine.

## How to Run the App

- Clone the repository.
- Run `npm install` to install the dependencies.
- Run `npm run start` to start the server.

## API Documentation

## Register a User

- URL : 'users/register'
  Registers a new user in the database and returns a JWT token.

- Body Parameters:
  - `first_name` : The first_name of the user.
  - `last_name` : The last_name of the user.
  - `email` : The email of the user.
  - `password` : The password of the user.

## Login a User

- URL : 'users/login'
  Logs in a user and returns a JWT token.

## This API requires a JWT token to be passed in the headers of the request. The token can be obtained by registering or logging in a user.

### Get All Tasks

- URL : 'users/get-all-todos'
  Returns all tasks in the database according to the query parameters.

- Query Parameters:
  - `page` : The page number of the results. Default is 1.
  - `limit` : The number of results per page. Default is 10.
  - `date` : The date of the tasks to be returned. Default is today's date.

### CREATE A TASK

- URL : 'users/create-todo'
  Creates a new task in the database.

- Body Parameters:
  - `title` : The title of the task.
  - `description` : The description of the task.
  - `due_date` : The due date of the task.

### UPDATE A TASK

- URL : 'users/update-todo/:id'
  Updates a task in the database.

- Body Parameters:
  - `title` : The title of the task.
  - `description` : The description of the task.
  - `due_date` : The due date of the task.

### DELETE A TASK

- URL : 'users/delete-todo/:id'
  Deletes a task in the database.

### UPDATE A TASK STATUS

- URL : 'users/update-todo-status/:id'
  Updates the status of a task in the database.

- Body Parameters:
  - `status` : The status of the task. Can be either `completed` or `pending`.
