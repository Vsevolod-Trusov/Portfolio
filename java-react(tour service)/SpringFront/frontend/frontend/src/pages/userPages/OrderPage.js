import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useLocation, useNavigate} from "react-router-dom";

export default function OrderPage() {
    let navigate = useNavigate();
    const location = useLocation()
    const [showError, setShowError] = useState("")
    const tour = location.state;
    const [order, setOrder] = useState({
        tourName: tour.name,
        amountOfBoughtTickets: 1,
        orderDate: new Date(),
        tourDate: tour.startDate
    });

    let {amountOfBoughtTickets} = order;

    const [selectedDate, setSelectedDate] = useState(new Date(tour.startDate));

    const back = () => {
        navigate(`/user/main`)
    }

    function diffDates(day_one, day_two) {
        return (day_one - day_two) / (60 * 60 * 24 * 1000);
    }

    const checkData = () => {
        if (amountOfBoughtTickets < 0) {
            setShowError("Wrong amount of tickets value")
            return false;
        }

        if (Math.ceil(diffDates(new Date(tour.endDate), selectedDate)) < 0
            || Math.ceil(diffDates(selectedDate, new Date(tour.startDate))) < 0) {
            setShowError("Wrong date value")
            return false;
        }
        return true;
    }

    const onInputChange = (e) => {
        setOrder({...order, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!checkData()) {
            return
        }

        order.tourDate = selectedDate;
        await fetch("http://localhost:8080/api/user/orders", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(order)
        })
            .then(response => {

                if (response.ok) {
                    navigate("/user/main")
                }else if(response.status === 500){
                    navigate("/authorization")
                }
                else return response.json()
            }).then(data => {
                if (data.message) {
                    setShowError(data.message)
                }
            })
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Order</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="tourPeriod" className="form-label">
                                Tour period
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="tourPeriod"
                                value={`${new Date(tour?.startDate).getDate()<10?"0":""}${new Date(tour?.startDate).getDate()}.${new Date(tour?.startDate).getMonth() + 1<10?"0":""}${new Date(tour?.startDate).getMonth() + 1}.${new Date(tour?.startDate).getFullYear()}  -  ${new Date(tour?.endDate).getDate()<10?"0":""}${new Date(tour?.endDate).getDate()}.${new Date(tour?.endDate).getMonth() + 1<10?"0":""}${new Date(tour?.endDate).getMonth() + 1}.${new Date(tour?.endDate).getFullYear()}`}
                                readOnly={true}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tourName" className="form-label">
                                Tour name
                            </label>
                            <input type="text" name="tourName"
                                   className="form-control"
                                   readOnly={true}
                                   value={tour.name}/>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="amountOfBoughtTickets" className="form-label">
                                Amount
                            </label>
                            <input
                                type="number"
                                min={1}
                                className="form-control"
                                name="amountOfBoughtTickets"
                                value={amountOfBoughtTickets}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tourDate" className="form-label">
                                Tour date
                            </label>
                            <DatePicker name="tourDate" className="form-control" selected={selectedDate}
                                        onChange={(date: Date) => setSelectedDate(date)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">
                                Price
                            </label>
                            <input
                                type="text"
                                readOnly={true}
                                className="form-control"
                                name="price"
                                value={+(tour.price * amountOfBoughtTickets) ? tour.price * amountOfBoughtTickets : 0}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <p className="text-danger">{showError}</p>
                        </div>
                        <button className="btn btn-outline-secondary m-2" onClick={() => back()}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-outline-primary">
                            Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}