import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import jwt_decode from "jwt-decode";

const Profile = () => {

	const history = useHistory();
	const [loggedInID, setLoggedInID] = useState("");
	const [loggedInName, setLoggedInName] = useState("");
	const token = localStorage.getItem("token");


 	useEffect(() => {

		if (token){
			const decoded = jwt_decode(token);
			const id = decoded.userID;
			const name = decoded.username;
			setLoggedInID(id)
			setLoggedInName(name)
		} else {
			history.push("/login")
		}

	}, [token])

	const logout = () => {
		localStorage.removeItem("token")
		history.push("/login")
	}


	return (
		<div>
			<h1>Welcome {loggedInName}!</h1>
			<h5>Your registered ID number: {loggedInID}</h5>

			<button onClick={logout}> Logout </button>
		</div>
	)
}

export default Profile
