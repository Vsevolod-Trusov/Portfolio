import React from "react";
import {Link, Navigate, Outlet, Route, Routes} from "react-router-dom";

export default function Main() {
    return (
        <div className="container">
            <div className="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow" >
                <h2>Welcome</h2>
                <div className="container" style={{display: "flex", alignItems: "center", alignContent:"center", justifyContent: "center"}}>
                    <div className="me-5" style={{textAlign:"Left"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Why do we use it?
                    </div>
                    <div style={{textAlign:"Left"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Why do we use it?
                    </div>
                </div>
            </div>
            <Link className="btn btn-primary  me-2 mt-2" to="/registration">
                Sign Up
            </Link>
            <Link className="btn btn-primary offset-md-2 mt-2"  to="/authorization">
                Sign In
            </Link>
        </div>
    );
}