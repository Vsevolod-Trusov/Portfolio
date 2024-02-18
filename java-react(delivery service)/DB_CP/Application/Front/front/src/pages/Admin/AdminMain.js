import React, {useEffect, useState} from "react";

export default function AdminMain() {
    const [adminInfo, setAdminInfo] = useState({})

    useEffect(()=>{
        loadInfo()
    })

    const loadInfo = async () => {
        await fetch("http://localhost:8080/api/admin/info", {
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
                setAdminInfo(data)
            })
    }

    return (
            <div className="container col-md-5 border rounded p-4 mt-2 shadow">
                <h3>Info</h3>
                <div className="row justify-content-center mt-4">
                    <h5 className="col-5">{`Unprocessed orders:`}</h5>
                    <h5 className="col-5">{adminInfo.unprocessedOrdersCount?adminInfo.unprocessedOrdersCount:0}</h5>
                </div>
                <div className="row justify-content-center mt-3">
                    <h5 className="col-5 ">{`Users:`}</h5>
                    <h5 className="col-5">{adminInfo.userCount?adminInfo.userCount:0}</h5>
                </div>
                <div className="row justify-content-center mt-4">
                    <h5 className="col-5">{`Staff:`}</h5>
                    <h5 className="col-5">{adminInfo.staffCount?adminInfo.staffCount:0}</h5>
                </div>
            </div>
    );
}