import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {

	const [users, setUsers] = useState([]);


	useEffect(() => {

		axios
		.get("http://localhost:8080/api/users")
		.then((res) => {
			console.log(res)
			setUsers(res.data.data)
		})
		.catch((err) => {
			console.log(err)
		})

	}, []);

	console.log(users)

	if (users.length < 1){

		return <h1> No users in the system </h1>

	} else {

		return (
			<ol>
				{users.map((user, index) => (
					<li key={index}>
						<h3>User ID.: {user.userID}</h3>
						<p> <strong>Username: &nbsp; </strong>{user.username}</p>
					</li>
					))}
			</ol>
		)
	}
}


export default Users
