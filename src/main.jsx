//main.jsx

import React, {StrictMode} from 'react';
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import App from './App.jsx';
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Messenger from './pages/Messenger.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {index: true, element: <ProtectedRoute> <Messenger /> </ProtectedRoute>},
            {path: "login", element: <Login />},
            {path: "signup", element: <Signup />}

        ]
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router = {router} />
        </AuthProvider>
    </StrictMode>
);
