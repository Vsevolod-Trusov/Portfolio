import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export default function ChangeOrderFormSecondStep() {
    let location = useLocation();
    const [executorsList, setExecutorsList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        loadeExecutors()
    }, []);
    const loadeExecutors = async () => {
        await fetch(`http://localhost:8080/api/admin/staff/${location.state.deliveryAddress}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {

                if (response.status === 200) {
                    return response.json()
                }
                throw new Error(`${response.status}: ${response.text()}`)
            }).then(data => {
                setExecutorsList([...data]);
            }).catch(error => {
                alert(error);
            })
    };
    const confirmUpdate = async (executorLogin) => {
        location.state.executorLogin = executorLogin;
       navigate(`/admin/main/orders/order/confirm`, {state: location.state})
    };
    const back = () => {
        navigate(`/admin/main/orders/order`, {state: location.state})
    }

    return (
        <>
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col" className="text-center">Executor</th>
                            <th scope="col" className="text-center">Amount of orders</th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {executorsList.map((executor, index) => (
                            <tr key={index}>
                                <td className="text-center">{executor.name}</td>
                                <td className="text-center">{executor.ordersCount}</td>
                                <td className="text-center">
                                    <button className="btn btn-outline-success mr-2" onClick={()=>confirmUpdate(executor.name)}>Select</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-outline-secondary m-2" onClick={() => back()}
                >
                    Cancel
                </button>
            </div>
        </>
    )
}