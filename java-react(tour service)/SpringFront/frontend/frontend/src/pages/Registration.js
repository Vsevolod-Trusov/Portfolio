import axios from "axios";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function Registration() {
    const navigate = useNavigate();
    const [showError, setShowError] = useState("")
    const [user, setUser] = useState({
        login: "",
        password: "",
        email: "",
        role: "ROLE_USER"
    });

    const { login, password, email, role } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value});
    };

    const checkData = () =>{
        if(login.length <= 0 ){
            setShowError("Login is empty")
            return false
        }
        if(login.length > 50)
        {
            setShowError("Wrong login. Max length is 50 characters")
            return false
        }
        if(password.length <= 0 ){
            setShowError("Password is empty")
            return false
        }
        if(password.length > 300)
        {
            setShowError("Wrong password. Max length is 300 characters")
            return false
        }
        if(email.length <=0 ){
            setShowError("Email is empty")
            return false
        }
        if(email.length > 50){
            setShowError("Wrong email. Max length is 50 characters")
            return false
        }
        let regExpr = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
        if(regExpr.test(email) === false){
            setShowError("Wrong email")
            return false
        }
        if(role <=0 ){
            setShowError("Role is empty")
            return false
        }
        return true
    }

    const onSubmit =  async (e) => {
        e.preventDefault();

        if (!checkData()) {
            return
        }

        await fetch("http://localhost:8080/api/auth/registration", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {

                if(response.ok){
                    setShowError("")
                    navigate("/authorization")
                }
                else return response.json()
            }).then(data=>{
                if(data.message){
                    setShowError(data.message)
                }
            })
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Registration</h2>

                    <form>
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
                            <label htmlFor="Email" className="form-label">
                                E-mail
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your e-mail address"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                       <div className="mb-3">
                           <label htmlFor="Role" className="form-label">
                               Role
                           </label>
                           <Form.Select aria-label="Default select example"
                                        name={"role"}
                                        value={role} onChange={(e)=>onInputChange(e)} >
                               <option value={"ROLE_USER"}>ROLE_USER</option>
                               <option value={"ROLE_ADMIN"}>ROLE_ADMIN</option>
                           </Form.Select>
                       </div>
                        <div className="mb-3">
                            <p className="text-danger" >{showError}</p>
                        </div>
                        <button type="button" className="btn btn-outline-primary"
                        onClick={(e)=>onSubmit(e)}>
                            Sign Up
                        </button>
                        <div className="container mt-3">
                            <Link to="/authorization">
                                Sign In?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}