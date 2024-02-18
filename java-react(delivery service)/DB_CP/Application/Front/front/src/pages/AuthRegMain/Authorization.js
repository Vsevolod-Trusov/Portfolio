import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";


export default function Authorization() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        login: "",
        password: ""
    });

    const { login, password } = user;
    const [showError, setShowError] = useState("")
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const checkData = () => {
        if (login.length <= 0) {
            setShowError("Login is empty")
            return false
        }
        if (login.length > 20) {
            setShowError("Wrong login. Max length is 20 characters")
            return false
        }
        if (password.length <= 0) {
            setShowError("Password is empty")
            return false
        }
        if (password.length > 200) {
            setShowError("Wrong password. Max length is 200 characters")
            return false
        }
        return true
    }

    const onSubmit =  async (e) => {
        e.preventDefault();

        if (!checkData()) {
            return
        }

        await fetch("http://localhost:8080/api/user/authorization", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {

                if(response.ok){
                    setShowError("")
                }
                return response.json()

            }).then(data => {
                if(data.message){
                    setShowError(data.message)
                    return
                }

                if (data.role === 'user') {
                    window.sessionStorage.setItem("customer_login", `${data.login}`)
                    window.sessionStorage.setItem("customer_role", `${data.role}`)
                    navigate("/customer/main")
                }
                else if (data.role === 'admin'){
                    window.sessionStorage.setItem("admin_login", `${data.login}`)
                    window.sessionStorage.setItem("admin_role", `${data.role}`)
                    navigate(`/admin/main`)
                }
                else if (data.role === 'staff') {
                    window.sessionStorage.setItem("staff_login", `${data.login}`)
                    window.sessionStorage.setItem("staff_role", `${data.role}`)
                    navigate("/staff/main")
                }
            })
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4" >Authorization</h2>

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
                        <button type="submit" className="btn btn-outline-primary" onClick={(e)=>onSubmit(e)}>
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