import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export default function ConfirmUpdateOrder() {
    const navigate = useNavigate()
    let location = useLocation()
    const [showError, setShowError] = useState("")

    const back = () => {
        navigate(`/admin/main/orders/secondstep`, {state: location.state})
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        location.state.price = location.state.price.toFixed(2)
        (JSON.stringify(location.state))
        await fetch("http://localhost:8080/api/admin/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(location.state)
        })

            .then(response => {
                if (response.ok) {
                    {
                        navigate(`/admin/main/orders`)
                        return
                    }
                }
                return response.json()

            }).then(data => {
                if (data.message) {
                    setShowError(data.message)
                }
            })
    }

        return (
            <>
                <div className="container col-md-6 offset-md-3 border p-4 mt-2 shadow">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="order" className="form-label">
                                Order name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="order"
                                value={location.state.orderName}
                                readOnly={true}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                Delivery address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={location.state.deliveryAddress}
                                readOnly={true}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="executor" className="form-label">
                                Executor login
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="executor"
                                value={location.state.executorLogin}
                                readOnly={true}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">
                                Order price
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="price"
                                value={location.state.price.toFixed(2)}
                                readOnly={true}
                            />
                        </div>
                        <div className="mb-3">
                            <p className="text-danger">{showError}</p>
                        </div>
                        <button className="btn btn-outline-secondary m-2" onClick={() => back()}
                        >
                            Cancel
                        </button>

                        <button type="submit" className="btn btn-outline-success">
                            Confirm order
                        </button>
                    </form>
                </div>
            </>
        )
}