import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import LogoImg from "../images/appIcon.ico";

export default function Navbar(props) {
    const {login} = useParams()
    const navigate = useNavigate()
    const customerExit = ()=>{
        sessionStorage.removeItem("customer_login");
        sessionStorage.removeItem("customer_role");
        navigate("/authorisation");
    }

    const staffExit = ()=>{
        sessionStorage.removeItem("staff_login");
        sessionStorage.removeItem("staff_role");
        navigate("/authorisation");
    }

    const adminExit = ()=>{
        sessionStorage.removeItem("admin_login");
        sessionStorage.removeItem("admin_role");
        navigate("/authorisation");
    }

    const exportOrders = ()=>{
        fetch(`http://localhost:8080/api/admin/export`, {
            method: 'GET'
        })
            .then(response => {
                if (response.status === 200) {
                    return response.text()
                }
                throw new Error(`${response.status}: Error while importing`)
            }).then(data => {
            alert(data)
        }).catch(error => {
            alert(error);
        })
    }

    return (<div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{background: "#c402b4"}}>
            <div className="container-fluid">
                <img src={LogoImg} alt='#' className="img-fluid" style={{width: "3%", height: "3%"}}/>
                {props.default ? <>
                    </>

                    : props.admin ? <>
                        <div className="text-white p-md-1">{window.sessionStorage.getItem("admin_login")}</div>
                        <div className="container-fluid text-white" style={{paddingRight: "40px"}}>
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main">
                                Home
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main/orders">
                                Orders
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main/executed">
                                Executed
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main/goods">
                                Goods
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main/reviews">
                                Show
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/admin/main/staff">
                                Staff
                            </Link>

                            <button className="btn btn-outline-light " onClick={()=>exportOrders()}>
                               Export
                            </button>
                        </div>
                        <button className="btn btn-outline-light justify-content-end" onClick={()=>adminExit()}>
                            Exit
                        </button>
                    </> : props.customer ? <>
                        <div className="text-white p-md-1">{window.sessionStorage.getItem("customer_login")}</div>
                        <div className="container-fluid text-white" style={{paddingRight: "40px"}}>
                            <Link className="btn btn-outline-light m-lg-1" to="/customer/main">
                                Home
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/customer/main/goods">
                                Goods
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/customer/main/history">
                                History
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/customer/main/orders">
                                Orders
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to='/customer/main/orders/order'>
                                Card
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/customer/main/review">
                                Review
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/customer/main/reviews">
                                Show
                            </Link>
                        </div>
                        <button className="btn btn-outline-light justify-content-end" onClick={()=>customerExit()}>
                            Exit
                        </button>
                    </> : props.staff ? <>
                        <div className="text-white p-md-1">{window.sessionStorage.getItem("staff_login")}</div>
                        <div className="container-fluid text-white" style={{paddingRight: "40px"}}>
                            <Link className="btn btn-outline-light m-lg-1" to="/staff/main">
                                Home
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/staff/main/orders">
                                Orders
                            </Link>
                            <Link className="btn btn-outline-light m-lg-1" to="/staff/main/reviews">
                                Show
                            </Link>

                        </div>
                        <button className="btn btn-outline-light justify-content-end" onClick={()=>staffExit()}>
                            Exit
                        </button>
                    </> : <> <Link className="navbar-brand" to="/"/></>}
            </div>
        </nav>
    </div>);
}