//App.jsx
import React from 'react';
import { Outlet } from "react-router-dom";


function App() {
    return (     
        <div className="contentSection"> 
            <Outlet />
        </div>
    )
}



export default App