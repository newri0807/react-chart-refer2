import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./page/Main";
import Draft from "./page/Draft";
import Main2 from "./page/Main2";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error Page 😭</div>,
    children: [
      { index: true, path: "/", element: <Main /> },
      { path: "/2", element: <Main2 /> },
      { path: "/3", element: <Draft /> },
    ],
  },
]);

root.render(<RouterProvider router={router} />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
