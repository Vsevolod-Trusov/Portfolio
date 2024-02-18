import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";

export default function CustomerOrderForm(props) {
    let navigate = useNavigate();
    const [goodsName, setGoodsName] = useState("");
    const [allPrice, setAllPrice] = useState(0);
    const [order, setOrder] = useState({
        customerLogin: window.sessionStorage.getItem("customer_login"),
        goodName: "",
        orderDate: new Date(),
        deliveryDate: new Date(),
        price: 0,
        deliveryType: "pickup", deliveryAddress: "",
    });

    useEffect(() => {
        if(props.goods.length <= 0)
            navigate("/customer/main/goods")

        const getGoodsName = ()=>{
            let goodsName = ""
            for (let i =0; i < props.goods.length; i++){
                goodsName += `${props.goods[i].name}, `
            }
            order.goodName = goodsName.substring(0, goodsName.length-2)
            setGoodsName(order.goodName)
        }
        const getAllPrice = ()=>{
            let price = 0;
            for (let i =0; i < props.goods.length; i++){
                 price += props.goods[i].price
            }
            order.price = price
            setAllPrice(price)
        }
        getGoodsName()
        getAllPrice()
    }, []);

    let [deliveryDate, setDeliveryDate] = useState(new Date());
    const [showError, setShowError] = useState("")

    const onInputChange = (e) => {
        setOrder({...order, [e.target.name]: e.target.value});
    };

    function diffDates(day_one, day_two) {
        return (day_one - day_two) / (60 * 60 * 24 * 1000);
    };

    const checkData = () => {
        if (Math.ceil(diffDates(deliveryDate, order.orderDate)) < 0) {
            setShowError("Wrong delivery date value")
            return false;
        }
        return true;
    }

    const onSubmit = async (e) => {
        e.preventDefault()


        if (!checkData()) {
            return
        }
        order.deliveryDate = deliveryDate.setHours(deliveryDate.getHours() + 3);
        order.orderDate = order.orderDate.setHours(order.orderDate.getHours() + 3);
        (JSON.stringify(order))
        await fetch("http://localhost:8080/api/user/order", {
            method: 'POST', headers: {
                'Content-type': 'application/json',
            }, body: JSON.stringify(order)
        })
            .then(response => {

                if (response.ok) {
                    setShowError("")
                    props.setGoods([])
                    navigate("/customer/main/goods")
                }
                else
                    return response.json()
            }).then(data => {
                if (data.message) {
                    setShowError(data.message)
                }
            })
    };

    const onSelectIssuePoint = () => {
        if (!checkData()) {
            return
        }
        order.deliveryDate = deliveryDate.setHours(deliveryDate.getHours() + 3);
        order.orderDate = order.orderDate.setHours(order.orderDate.getHours() + 3);
        navigate(`/customer/main/orders/order/issue`, {state: order})
    }

    return (
        <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Order</h2>
            <form >
                <div className="mb-3">
                    <label htmlFor="goodName" className="form-label">
                        Good Names
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="goodName"
                        value={goodsName}
                        readOnly={true}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input type="text" name="tourName"
                           className="form-control"
                           readOnly={true}
                           value={allPrice}/>

                </div>

                <div className="mb-3">
                    <label htmlFor="tourDate" className="form-label">
                        Delivery date
                    </label>
                    <DatePicker name="tourDate" className="form-control" selected={deliveryDate}

                                onChange={(date:Date) => setDeliveryDate(date)}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="deliveryType" className="form-label">
                        Delivery Type
                    </label>
                    <Form.Select aria-label="Default select example"
                                 name={"deliveryType"}
                                 value={order.deliveryType}
                                 onChange={(e) => onInputChange(e)}>
                        <option value={"pickup"}>pickup</option>
                        <option value={"courier"}>courier</option>
                    </Form.Select>
                </div>
                <div className="mb-3">
                    <p className="text-danger">{showError}</p>
                </div>
                <Link className="btn btn-outline-secondary m-2"
                      to="/customer/main/goods">
                    Cancel
                </Link>

                <button type="button" className="btn btn-outline-success me-2"
                        onClick={(e) => {
                            order.deliveryType === 'pickup' ? onSelectIssuePoint() : onSubmit(e)
                        }}>
                    {order.deliveryType === "pickup" ? "Select issue point" : "Confirm Buy"}
                </button>

                <button type="button" className="btn btn-outline-danger"
                        onClick={() => {
                            props.setGoods([])
                            navigate("/customer/main/goods")
                        }}>
                    Clear basket
                </button>
            </form>
        </div>
    );
}