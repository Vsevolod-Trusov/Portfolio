import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from "react-router-dom";

export default function AddTour() {

    let navigate = useNavigate();

        useEffect(()=>{if(window.sessionStorage.getItem('role')!== 'ROLE_ADMIN')navigate("/authorization")},[])

    const [startTour, setStartTour] = useState(new Date());
    const [endTour, setEndTour] = useState(new Date());
    const [showError, setShowError] = useState("")

    const [tour, setTour] = useState({
        name: "",
        amountOfTickets: 5,
        price: "",
        startDate: "",
        endDate: "",
        description: ""
    });

    let {name, amountOfTickets, price, description} = tour;



    function diffDates(day_one, day_two) {
        console.log(day_two)
        return (day_one - day_two) / (60 * 60 * 24 * 1000*365);
    }

    const checkData = () => {

        if(name.length === 0){
            setShowError("Name is empty")
            return false;
        }

        if(name.length > 50){
            setShowError("Name length only 50 characters")
            return false;
        }

        if(amountOfTickets < 0)
        {
            setShowError("Invalid amount of tickets value")
            return false;
        }

        if(price.length === 0)
        {
            setShowError("Price is empty")
            return false;
        }

        if(+price < 0)
        {
            setShowError("Invalid price value")
            return false;
        }

        console.log(Math.ceil(diffDates(startTour, endTour)))
        if(Math.ceil(diffDates(startTour, endTour)) < 0)
        {
            setShowError("Wrong start or end tour date")
            return false;
        }

        if(description.length === 0){
            setShowError("Description is empty")
            return false;
        }

        if(description.length > 300){
            setShowError("Description max 300 characters")
            return false;
        }

        return true
    }

    const sendTour = () => {

        fetch("http://localhost:8080/api/admin/tours",
            {
                method: 'POST',
                headers:
                    {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
                    },
                body: JSON.stringify(tour)
            }
        )
            .then(response => {
                if(response.ok){
                    setShowError("")
                    navigate('/admin/main')
                }else if(response.status === 500){
                    navigate('/authorization')
                }
                else return response.json()
            }).then(data =>{
                if(data.message){
                    setShowError(data.message)
                }
        })
    }

    const onInputChange = (e) => {
        setTour({...tour, [e.target.name]: e.target.value});
    };

    const onSubmit =  (e) => {
        e.preventDefault();

        if (!checkData()) {
            return
        }

        tour.startDate = startTour;
        tour.endDate = endTour;
        console.log(JSON.stringify(tour))
        sendTour()
    }

    const back = () => {
        navigate(`/admin/main`)
    }

    return (
        <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Tour</h2>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Tour name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="amountOfTickets" className="form-label">
                        Amount
                    </label>
                    <input
                        type="number"
                        min={1}
                        className="form-control"
                        name="amountOfTickets"
                        value={amountOfTickets}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={price}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">
                        Start tour
                    </label>
                    <DatePicker  name="startDate"  className="form-control" selected={startTour}
                                 onChange={(date:Date) => setStartTour(date)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">
                        End tour
                    </label>
                    <DatePicker  name="endDate"  className="form-control" selected={endTour}  onChange={(date:Date) => setEndTour(date)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                <textarea name="description" className="form-control" value={description} onChange={e=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <p className="text-danger" >{showError}</p>
                </div>
                <button className="btn btn-outline-secondary m-2" onClick={() => back()}
                >
                    Cancel
                </button>
                <button type="submit" className="btn btn-outline-primary " onClick={(e)=>onSubmit(e)}>
                    Add tour
                </button>
            </form>
        </div>
    )
    }
