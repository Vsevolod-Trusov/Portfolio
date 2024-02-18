import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Navbar from "../../components/Navbar";

export default function Registration() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        login: "",
        password: "",
        email: "",
        role: "user",
        pointName: ""
    });

    const [showError, setShowError] = useState("")
    const [pointsList, setPointsList] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const { login, password, email, role, pointName } = user;
    useEffect(() => {
        loadPoints()
    }, []);
    const loadPoints = () => {
        fetch("http://localhost:8080/api/admin/points", {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        })
            .then(response => {
                if(response.status === 200){
                    return response.json()
                }
                throw new Error(`${response.status}`)
            }).then(data=>{
              setPointsList([...data])
        }).catch(error => {
            setShowError(error.message)
        })

    }

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value});
    };

    const checkData = () =>{
        if(login.length <= 0 ){
            setShowError("Login is empty")
            return false
        }
        if(login.length > 20)
        {
            setShowError("Wrong login. Max length is 20 characters")
            return false
        }
        if(password.length <= 0 ){
            setShowError("Password is empty")
            return false
        }
        if(password.length > 200)
        {
            setShowError("Wrong password. Max length is 200 characters")
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
        if(user.role.length <=0 ){
            setShowError("Role is empty")
            return false
        }
        if(user.pointName.length <=0 ){
            setShowError("Region is empty")
            return false
        }
        return true
    }

    const onSubmit =  async (e) => {
        e.preventDefault();

         if (!checkData()) {
             return
         }
        await fetch("http://localhost:8080/api/user/registration", {
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
                    navigate("/authorisation")
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
                                type="email"
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
                                <option value={"user"}>user</option>
                                <option value={"admin"}>admin</option>
                                <option value={"staff"}>staff</option>
                            </Form.Select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pointName" className="form-label">
                                Region
                            </label>
                            <select
                                        className="form-select"
                                        name="pointName" disabled={isDisabled}
                                        value={pointName}
                                        onChange={(e)=>onInputChange(e)}>
                                <option value={""}>Select region</option>
                               {
                                   role==='user'?  pointsList.filter(item => item.type === 'user').map((point, index) => (
                                         <option key={index} value={point.pointName}>{point.pointName}</option>
                                   )) : role === "staff" || role === "admin" ? pointsList.filter(item => item.type === 'staff').map((point, index) => (
                                       <option key={index} value={point.pointName}>{point.pointName}</option>
                                      )) : <option value={""}>Select region</option>
                               }
                            </select>
                        </div>
                        <div className="mb-3">
                           <p className="text-danger" >{showError}</p>
                        </div>
                        <button type="button" className="btn btn-outline text-white"
                                style={{background: "#c402b4"}}
                        onClick={(e)=>onSubmit(e)}>
                            Sign Up
                        </button>
                        <div className="container mt-3">
                            <Link to="/authorization">
                                Sign Up?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}