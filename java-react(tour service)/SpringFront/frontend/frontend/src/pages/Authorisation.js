import axios from "axios";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Authorisation() {

    const navigate = useNavigate();
    const [showError, setShowError] = useState("")
    const [user, setUser] = useState({
        login: "",
        password: ""
    });

    const { login, password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const checkData = () => {
        if (login.length <= 0) {
            setShowError("Login is empty")
            return false
        }
        if (login.length > 50) {
            setShowError("Wrong login. Max length is 50 characters")
            return false
        }
        if (password.length <= 0) {
            setShowError("Password is empty")
            return false
        }
        if (password.length > 300) {
            setShowError("Wrong password. Max length is 300 characters")
            return false
        }
        return true
    }

    const onSubmit =  async (e) => {
        e.preventDefault();

        if (!checkData()) {
            return
        }

        await fetch("http://localhost:8080/api/auth/authorisation", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                    return response.json()
            }).then(data=>{
                if(data.token && data.role){
                    window.sessionStorage.setItem("token", `${data.token}`)
                    window.sessionStorage.setItem("role", `${data.role}`)
                    setShowError("")
                    if (data.role === "ROLE_ADMIN") {
                        navigate("/admin/main")
                    } else if (data.role === "ROLE_USER") {
                        navigate("/user/main")
                    }
                    return
                }

                if(data.message){
                    setShowError(data.message)
                }
        })
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Authorisation</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="login" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your name"
                                name="login"
                                value={login}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type={"password"}
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <p className="text-danger" >{showError}</p>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Sign In
                        </button>
                        <div className="container mt-3">
                            <Link to="/registration">
                                Sign Up?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}