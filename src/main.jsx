import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from './Components/Error/Error.jsx';
import Home from './Components/HomePage/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import AuthProviders from './AuthProviders/AuthProviders.jsx';
import Register from './Components/Register/Register.jsx';
import CreateAssignment from './Components/Assignments/CreateAssignment/CreateAssignment.jsx';
import AllAssignment from './Components/Assignments/AllAssignment/AllAssignment';
import MyAssignment from './Components/Assignments/MyAssignment/MyAssignment';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      },
      {
        path: "create-assignment",
        element: <CreateAssignment></CreateAssignment>
      },
      {
        path: "all-assignment",
        element: <AllAssignment></AllAssignment>,
        loader: () => fetch('http://localhost:5000/assignments')
      },
      {
        path: "my-assignment",
        element: <MyAssignment></MyAssignment>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
    </AuthProviders>
  </React.StrictMode>,
)
