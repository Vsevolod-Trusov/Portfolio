import React, {useEffect, useState} from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";

export default function StaffMain() {
    const [staffInfo, setStaffInfo] = useState({})

    useEffect(()=>{
        loadInfo()
    })

    const loadInfo = async () => {
        await fetch(`http://localhost:8080/api/staff/info/${window.sessionStorage.getItem("staff_login")}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            }).then(data => {
                setStaffInfo(data)
            })
    }

    return (
        <div className="container col-md-5 border rounded p-4 mt-2 shadow">
            <h3>Info</h3>
            <div className="row justify-content-center mt-4">
                <h5 className="col-5">{`Orders:`}</h5>
                <h5 className="col-5">{staffInfo.ordersCount?staffInfo.ordersCount:0}</h5>
            </div>
        </div>
    );
}