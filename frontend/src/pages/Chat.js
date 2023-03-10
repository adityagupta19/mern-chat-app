import React, { useContext, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";
import { RoomContext } from "../context/RoomContext";
import { UserContext } from "../context/UserContext";

function Chat({ socket }) {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	const { user } = useContext(UserContext);
	const { room } = useContext(RoomContext);

	const handleSend = async () => {
		if (currentMessage !== "") {
			const messageData = {
				room: room,
				author: user,
				message: currentMessage,
				time:
					new Date(Date.now()).getHours() +
					":" +
					new Date(Date.now()).getMinutes(),
			};

			await socket.emit("send_message", messageData);
			setCurrentMessage("");
			setMessageList((list) => [...list, messageData]);
			console.log("function ran");
		}
	};

	const messageListRef = useRef(messageList);

	const messageHandler = (data, messages, setMessageList) => {
		setMessageList([...messages, data]);
	};

	useEffect(() => {
		messageListRef.current = messageList;
	});

	useEffect(() => {
		const handler = (data) => {
			messageHandler(data, messageListRef.current, setMessageList);
		};
		console.log("it ran");
		socket.on("receive_message", handler);

		return () => {
			socket.off("receive_message", handler);
		};
	}, []);

	if (room === "" || user === "") {
		return <Navigate to="/" />;
	}

	return (
		<div className="bg-slate-300 h-screen w-full flex  justify-center">
			<div className="flex flex-col w-[900px] max-h-full bg-gray-700 mt-10 mb-8  rounded-2xl relative">
				<div className="flex justify-center my-4 text-lg font-bold text-white">
					<p>ROOM {room}</p>
				</div>
				<div className="overflow-auto scrollbar mr-2 scrollbar-thumb-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full justify-between mb-9 scrollbar-w-sm">
					{messageList.map((message) => {
						return (
							<div
								className={` rounded-xl mb-4 px-2 mx-2 mr-6 flex flex-col text-white text-right  ${
									message.author === user
										? "items-end bg-slate-400"
										: "bg-slate-600"
								} `}
							>
								<div className="flex ml-1 text-lg">
									<p>{message.message}</p>
								</div>
								<div className=" mx-1 flex flex-row text-xs">
									<p className="pr-0.5">{message.author}</p>
									<p className="pr-0.5">{message.time}</p>
								</div>
							</div>
						);
					})}
				</div>
				<div className="flex flex-row absolute bottom-0 justify-around p-1 max-h-12 bg-slate-600 w-full rounded-md">
					<input
						className="flex px-2 w-full rounded-md"
						type="text"
						placeholder="hello..."
						onChange={(e) => setCurrentMessage(e.target.value)}
						value={currentMessage}
						onKeyPress={(e) => {
							e.key === "Enter" && handleSend();
						}}
					/>
					<button
						className="flex flex-row text-lg p-1 ml-[4px] bg-slate-800 rounded-md text-white"
						onClick={handleSend}
					>
						Send{" "}
					</button>
				</div>
			</div>
		</div>
	);
}

export default Chat;
