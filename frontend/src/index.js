import React from "react";
import ReactDOM from "react-dom/client";
import { UserContextProvider } from "./context/UserContext";
import "./index.css";
import App from "./App";
import { RoomContextProvider } from "./context/RoomContext";
import Navbar from "./components/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Navbar></Navbar>
		<UserContextProvider>
			<RoomContextProvider>
				<App />
			</RoomContextProvider>
		</UserContextProvider>
	</React.StrictMode>
);
