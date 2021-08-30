import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {

	const [username, setUsername] = useState("");
	const [userID, setUserID] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const registration = async () => {

		const newUser = { username, userID, password };

		await axios.post("http://localhost:8080/api/registration", newUser)
			.then(res => {
				if (res.status === 201) {
					console.log("New user added", res);
					setUsername("");
					setUserID("");
					setPassword("");
					history.push("/login")
				} 
			})
			.catch(error => {
				console.log("An error occured: ", error.response)

				if (error.response.status === 400) {
					toast.error("Please fill all required data", {position: toast.POSITION.BOTTOM_CENTER})
				} 
				else if (error.response.status === 409) {
					toast.error("User ID already registered in the system", {position: toast.POSITION.BOTTOM_CENTER})
				}
			})
	}

	return (
		<div>
			<h2>Registration</h2>
			<ToastContainer />
			<label htmlFor="regName">Username</label>
			<input id="regName" type="text" autoComplete="off" required onChange={(e) => setUsername(e.target.value)} />
			<label htmlFor="regEmail">ID Card Number</label>
			<input id="regID" type="text" autoComplete="off" pattern="[0-9]{1,}" required onChange={(e) => setUserID(e.target.value)} />
			<label htmlFor="regID">Password</label>
			<input id="regPass" type="password" autoComplete="off" required onChange={(e) => setPassword(e.target.value)} />
			<button onClick={registration}>Register</button>
		</div>
	)
}

export default Registration
