import React, {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import {Link, useNavigate} from "react-router-dom";

export default function UserMain() {
    const [tours, setTours] = React.useState([])
    const navigate = useNavigate()
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
                return response.json()
            })
            .then(data => {
                setTours(data.tours);
            })
    }

    const orderForm =(tour)=>{
        navigate(`/user/main/order`,{state: tour})
    }

    const dateToString = (date) => {
        let newDate = new Date(date)
        return `${newDate.getDate()<10?"0":""}${newDate.getDate()}.${newDate.getMonth() + 1<10?"0":""}${newDate.getMonth() + 1}.${newDate.getFullYear()}`
    }


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
                    {
                        tours.map((tour, index) => (
                        <tr key={index}>
                            <th scope="row" key={index}
                                className="text-center">
                                {index + 1}
                            </th>
                            <td className="text-center">{tour.name}</td>
                            <td className="text-center">{tour.price}</td>
                            <td className="text-center">{tour.amountOfTickets}</td>
                            <td className="text-center">{dateToString(tour.startDate)}</td>
                            <td className="text-center">{dateToString(tour.endDate)}</td>
                            <td className="text-center">
                                <button
                                    className="btn btn-outline-success mx-2"
                                    onClick={()=>orderForm(tour)}
                                    disabled={tour.amountOfTickets>0?false:true}
                                >
                                    Buy
                                </button>
                                <Link
                                    className="btn btn-primary mx-2"
                                    to={`/user/main/reviews/${tour.name}`}
                                >
                                    Reviews
                                </Link>
                                <Link
                                    className="btn btn-outline-primary mx-2"
                                    to={`/user/main/review/${tour.name}`}
                                >
                                    Write
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}