require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const server = express();
const path = require('path');
const bcrypt = require("bcrypt");
const User = require('./model/user');
const cors = require('cors');
const jwt = require("jsonwebtoken");


server.use(express.json());

server.use(cors({ origin: 'http://localhost:3000' }));

server.use(express.static(path.join(__dirname, '../frontend/public/index.html')));

//INDEX ENDPOINT

server.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/frontend/public/index.html"));
});

// REGISTRATION

server.post("/api/registration", (req, res) => {

	const { username, userID, password } = req.body;

	if (!(username && userID && password)) {

		res.status(400).json({ msg: "Required data missing" })

	} else {

		User.findOne({ userID }, async (error, doc) => {  // a "doc" dobja vissza a választ, ha létezik már a bekapott username
			if (error) throw error;
			if (doc) res.status(409).json({ msg: "User already registered" });
			if (!doc) {

				const hashedPass = await bcrypt.hash(password, 10);
				const newUser = new User({
					username: username,
					userID: userID,
					password: hashedPass
				});

				await newUser.save();
				res.status(201).json({ msg: "User created" })
			}
		})
	}
})

// LOGIN

server.post("/api/login", async (req, res) => {

	const { userID, password } = req.body;

	if (!(userID && password)) {

		res.status(400).json({ msg: "Required data missing" })

	} else {

		const logUser = await User.findOne({ userID });
		const logPass = await bcrypt.compare(password, logUser.password)

		if (logUser && logPass) {

			const token = jwt.sign(
				{ user_id: logUser._id, userID, username: logUser.username },
				process.env.TOKEN_KEY,
				{ expiresIn: "2h" });
			logUser.token = token;

			console.log("Login successful");
			console.log(logUser);
			res.status(200).json({ msg: "User logged in", token: token })
		} else {
			res.status(409).json({ msg: "ID number or password is incorrect" })
		}
	}
})


// USERS

server.get("/api/users", async (req, res) => {
	await User.find({}, (error, data) => {
			if(error) throw error;
			if(data) {
					res.json({data});
					console.log("data fetch successful");
			}
	})
})


//ERROR HANDLING MIDDLEWARE

server.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})

//LISTENING

const port = 8080;
server.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
})