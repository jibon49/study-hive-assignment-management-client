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
import UpdateAssignment from './Components/Assignments/UpdateAssignment/UpdateAssignment.jsx';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.jsx';
import ViewAssignment from './Components/Assignments/ViewAssignment/ViewAssignment.jsx';
import SubmittedAssignment from './Components/Assignments/SubmittedAssignment/SubmittedAssignment.jsx';

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
        element: <PrivateRoute><CreateAssignment></CreateAssignment></PrivateRoute>
      },
      {
        path: "submitted-assignment",
        element: <PrivateRoute><SubmittedAssignment></SubmittedAssignment></PrivateRoute>,
        loader: () => fetch('http://localhost:5000/submitted',{credentials:'include'})
      },
      {
        path: "all-assignment",
        element: <AllAssignment></AllAssignment>,
        loader: () => fetch('http://localhost:5000/assignments')
      },
      {
        path: "update-assignment/:id",
        element: <PrivateRoute><UpdateAssignment></UpdateAssignment></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/assignment/${params.id}`)

      },
      {
        path: "view-assignment/:id",
        element: <PrivateRoute><ViewAssignment></ViewAssignment></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/assignment/${params.id}`)

      },
      {
        path: "my-assignment",
        element: <PrivateRoute><MyAssignment></MyAssignment></PrivateRoute>
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
