import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { handleInteraction } from "./handlers/index.js";
// import { User, AddressSet } from "./db/models/index.js";

// import "dotenv/config";

// db setup
// User.sync()
//   .then(() => 
console.log("User table created or successfully verified")
// )
//   .catch(console.error);
// AddressSet.sync()
//   .then(() => 
console.log("AddressSet table created or successfully verified")
// )
//   .catch(console.error);
// console.log(`${c.user.tag} is online`);

// have to trigger this manually
// client.on("interactionCreate", handleInteraction);

const root = ReactDOM.createRoot(document.getElementById("root"));

await handleInteraction({ isCommand: () => false});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
