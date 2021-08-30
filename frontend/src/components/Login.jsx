import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

	const [userID, setUserID] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const login = async () => {

		const loginUser = { userID, password };

		await axios.post("http://localhost:8080/api/login", loginUser)
			.then(res => {
				if (res.status === 200) {
					console.log("User logged in", res);
					setUserID("");
					setPassword("");
					localStorage.setItem("token", res.data.token)
					history.push("/profile")
				}
			})
			.catch(error => {
				console.log("An error occured: ", error.response)

				if (error.response.status === 400) {
					toast.error("Please fill all the required data", {
						position: toast.POSITION.BOTTOM_CENTER
					})
				}
				else if (error.response.status === 409) {
					toast.error("ID number or password is incorrect", {
						position: toast.POSITION.BOTTOM_CENTER
					})
				}
			})
	}


	return (
		<div>
			<h2>Login</h2>
			<ToastContainer />
			<label htmlFor="logID">ID Card Number</label>
			<input id="logID" type="text" autoComplete="off" required onChange={(e) => setUserID(e.target.value)} />
			<label htmlFor="logPass">Password</label>
			<input id="logPass" type="password" autoComplete="off" required onChange={(e) => setPassword(e.target.value)} />
			<button onClick={login}>Login</button>
		</div>
	)
}

export default Login
