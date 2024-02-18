import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export default function CustomerConfirmOrder(props) {
    const navigate = useNavigate();
    let location = useLocation();
    let order = location.state;
    const [showError, setShowError] = useState("")

    const confirmOrder = async (e) => {
        e.preventDefault()
        (JSON.stringify(order))
        await fetch("http://localhost:8080/api/user/order", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'text/plain',
            },
            body: JSON.stringify(order)
        })
            .then(response => {
                if (response.ok) {
                    props.setGoods([])
                    navigate("/customer/main/goods")
                    return
                }
                return response.json()
            }).then(data => {
                if(data.message){
                    setShowError(data.message)
                }
        })
    };

    const back = () => {
        navigate("/customer/main/orders/order/issue",
            {state: order}
        )
    }
    return (
        <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Confirm order</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="goodName" className="form-label">
                        Good Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="goodName"
                        value={location.state.goodName}
                        readOnly={true}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Item Price
                    </label>
                    <input type="text" name="tourName"
                           className="form-control"
                           readOnly={true}
                           value={location.state.price}/>

                </div>
                <div className="mb-3">
                    <label htmlFor="deliveryDate" className="form-label">
                        Delivery date
                    </label>
                    <input type="text" name="deliveryDate"
                           className="form-control"
                           readOnly={true}
                           value={`${new Date(location.state.deliveryDate).toISOString().substring(0,10)}`}/>

                </div>

                <div className="mb-3">
                    <label htmlFor="deliveryType" className="form-label">
                        Delivery type
                    </label>
                    <input type="text" name="deliveryType"
                           className="form-control"
                           readOnly={true}
                           value={location.state.deliveryType}/>

                </div>

                <div className="mb-3">
                    <label htmlFor="deliveryPoint" className="form-label">
                        Delivery point
                    </label>
                    <input type="text" name="deliveryPoint"
                           className="form-control"
                           readOnly={true}
                           value={location.state.deliveryAddress}/>
                </div>
                <div className="mb-3">
                    <p className="text-danger" >{showError}</p>
                </div>
                <button className="btn btn-outline-secondary m-2"
                        onClick={() => back()}>
                    Cancel
                </button>

                <button type="button" className="btn btn-outline-success"
                        onClick={(e) => confirmOrder(e)}>
                    Confirm Buy
                </button>
            </form>
        </div>
    );
}