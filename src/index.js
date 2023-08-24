import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'firebase/firestore';
import App from './App';
import Add from './Add';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// firebase.initializeApp(firebaseConfig);
// const firestore = firebase.firestore();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>  },
    {
      path: "/Add",
      element: <Add/>  },
]);
// ReactDOM.render(<App />, document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}   
   <RouterProvider router={router} />

  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
