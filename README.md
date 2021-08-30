# JSON_Web_Token_practice

## Description

Simple registration/login site using React.js, Express.js and JSON Web Token Autentication.

## Implementation

- Database
		- Using MongoDB database to store the users. The database contains the user's `ID card number`, `name` and `password`.
		- When we get to the route "/users", the page writes out every registered users.
		- When there are no users registered in the database, the page writes "No users in the system".

- Registration
		- There is a registration form in the route "/registration"
    - When we register successfuly, the webpage redirects to the login page
		- If we try to register when any of the input field is empty, it displays "Please fill all the required data"
    - If the ID number is already in the database, it writes to the page "User already registered"

- Login
		- For the login process, the user needs to add his ID number and his password.
    - Login authentication using JSON Web Token
		- If we try to login when any of the input field is empty, it displays "Please fill all the required data"
    - When we log in successfuly, the page redirects to the profile page
    - If the ID or the password is incorrect, the page writes to the page "ID number or password is incorrect"

- Profile page
    - If we try to access this page without authentication, it redirects to the login page
    - When we get to this page, our registered ID and name is displayed in the page
    - There is a logout button in the page that logs us out from the session and drops us to the login page

## TODO

- Add design
