import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function StaffPage() {
    const [executorsList, setExecutorsList] = useState([]);
    useEffect(() => {
        loadeExecutors()
    }, []);
    const loadeExecutors = async () => {
        await fetch(`http://localhost:8080/api/admin/staff`, {
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
    return (
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col" className="text-center">Login</th>
                            <th scope="col" className="text-center">Orders count</th>
                        </tr>
                        </thead>
                        <tbody>
                        {executorsList.map((executor, index) => (
                            <tr key={index}>
                                <td className="text-center">{executor.name}</td>
                                <td className="text-center">{executor.ordersCount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
    );
}
