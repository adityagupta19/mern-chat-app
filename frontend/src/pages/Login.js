import React, { useContext, useState } from "react";

import { Navigate } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { UserContext } from "../context/UserContext";

function Login({ socket }) {
	const { user, setUser } = useContext(UserContext);
	const { room, setRoom } = useContext(RoomContext);
	const [logged, setLogged] = useState(false);

	const joinRoom = () => {
		if (user !== "" && room !== "") {
			socket.emit("join_room", room);

			setLogged(true);
		}
	};
	if (logged) {
		return <Navigate to="/chatroom" />;
	}
	return (
		<div className="h-screen w-16 flex-auto bg-slate-300 items-center justify-center">
			<h1 className="text-3xl text-center text-black font-semibold mb-4 mt-16 ">
				Join the Chat
			</h1>
			<div className="h-full flex flex-col items-center ">
				<input
					type="text"
					placeholder="Name"
					onChange={(e) => setUser(e.target.value)}
					value={user}
					className=" w-48 h-16 rounded-xl my-16 text-center bg-gray-800 bold shadow-md shadow-white text-white"
				/>
				<input
					type="text"
					placeholder="Room ID"
					onChange={(e) => setRoom(e.target.value)}
					value={room}
					className=" w-48 h-16 rounded-xl mb-16 text-center bg-gray-800 bold shadow-md shadow-white text-white"
				/>
				<button
					onClick={joinRoom}
					className="px-16 py-4 bg-slate-100 rounded-xl font-bold"
				>
					{" "}
					JOIN{" "}
				</button>
			</div>
		</div>
	);
}

export default Login;
