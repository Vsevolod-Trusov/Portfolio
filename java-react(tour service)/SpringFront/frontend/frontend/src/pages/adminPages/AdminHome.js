import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function AdminHome() {
    const [tours, setTours] = useState([]);
    let navigate = useNavigate();

    if(window.sessionStorage.getItem('role')!== 'ROLE_ADMIN'){
        navigate("/authorization")
    }

    useEffect(() => {
        loadTours();
    }, []);

    const loadTours = () => {
        fetch("http://localhost:8080/api/user/tours",
            {
                method: 'GET',
                headers:
                    {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
                    }
            }
        )
            .then(response => {
               if(response.status === 500){
                   navigate("/authorization")
               }
               else return response.json()
            })
            .then(data => {
                setTours(data.tours);
            })
    }

    const deleteTour = async (id) => {
        await fetch(`http://localhost:8080/api/admin/tour/${id}`,
            {
                method: 'DELETE',
                headers:
                    {
                        "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
                    }
            }
        )
            .then(response => {
                if(response.status === 500){
                    navigate("/authorization")
                }
            })
        loadTours();
    };

    return (
        <div className="container">
            <h2 className="text-center m-4">Tours List</h2>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">N</th>
                        <th scope="col" className="text-center">Name</th>
                        <th scope="col" className="text-center">Price</th>
                        <th scope="col" className="text-center">Tickets</th>
                        <th scope="col" className="text-center">Start</th>
                        <th scope="col" className="text-center">End</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tours.map((tour, index) => (
                        <tr key={index}>
                            <th scope="row" key={index}
                                className="text-center">
                                {index + 1}
                            </th>
                            <td className="text-center">{tour.name}</td>
                            <td className="text-center">{tour.price}</td>
                            <td className="text-center">{tour.amountOfTickets}</td>
                            <td className="text-center">{new Date(tour.startDate).toLocaleDateString()}</td>
                            <td className="text-center">{new Date(tour.endDate).toLocaleDateString()}</td>
                            <td className="text-center">
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => deleteTour(tour.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}