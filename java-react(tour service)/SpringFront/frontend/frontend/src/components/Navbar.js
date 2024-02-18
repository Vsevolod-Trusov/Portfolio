import React from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";

export default function Navbar(props) {
    const navigate = useNavigate()
    const Exit = ()=>{
        sessionStorage.removeItem("token");
        navigate("/authorization");
    }

    return (<div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" >
            <div className="container-fluid">
                {props.default ? <>
                        <div className="navbar-brand text-white ">{props.default}</div>
                    </>

                    : props.admin ? <>
                        <div className="text-white p-md-4">{window.sessionStorage.getItem("admin_login")}</div>
                        <div className="container-fluid text-white" >
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main">
                                Home
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main/tour">
                                Add
                            </Link>
                        </div>
                        <button className="btn btn-outline-light justify-content-end" onClick={()=>Exit()}>
                            Exit
                        </button>
                    </> : props.user ? <>
                        <div className="text-white">{window.sessionStorage.getItem("customer_login")}</div>
                        <div className="container-fluid text-white" >
                            <Link className="btn btn-outline-light m-lg-1" to="/user/main">
                                Home
                            </Link>
                        </div>
                        <button className="btn btn-outline-light justify-content-end" onClick={()=>Exit()}>
                            Exit
                        </button>
                    </> : <> <Link className="navbar-brand" to="/"/></>}
            </div>
        </nav>
    </div>);
}
