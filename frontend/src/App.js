import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import "./App.css";

const socket = io.connect("http://localhost:3001");

function App() {
	return (
		<div className="flex items-center">
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login socket={socket}/>} />
				<Route path="/chatroom" element={<Chat socket={socket} />} />
			</Routes>
		</BrowserRouter>
		</div>
	);
}

export default App;
