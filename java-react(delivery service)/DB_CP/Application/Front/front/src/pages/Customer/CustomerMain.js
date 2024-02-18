import React, {useEffect, useState} from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";

export default function CustomerMain() {
    const [customerInfo, setCustomerInfo] = useState({})

    useEffect(()=>{
        loadInfo()
    })

    const loadInfo = async () => {
        await fetch(`http://localhost:8080/api/user/info/${window.sessionStorage.getItem("customer_login")}`, {
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
                setCustomerInfo(data)
            })
    }

    return (
        <div className="container col-md-5 border rounded p-4 mt-2 shadow">
            <h3>Info</h3>
            <div className="row justify-content-center mt-4">
                <h5 className="col-5">{`Unprocessed orders:`}</h5>
                <h5 className="col-5">{customerInfo.unprocessedOrdersCount?customerInfo.unprocessedOrdersCount:0}</h5>
            </div>
            <div className="row justify-content-center mt-3">
                <h5 className="col-5 ">{`Processed orders:`}</h5>
                <h5 className="col-5">{customerInfo.processedOrdersCount?customerInfo.processedOrdersCount:0}</h5>
            </div>
            <div className="row justify-content-center mt-4">
                <h5 className="col-5">{`All orders:`}</h5>
                <h5 className="col-5">{customerInfo.allOrdersCount?customerInfo.allOrdersCount:0}</h5>
            </div>
        </div>
    );
}