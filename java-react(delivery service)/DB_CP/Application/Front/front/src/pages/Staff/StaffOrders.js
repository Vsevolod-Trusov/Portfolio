import React, {useEffect, useState} from "react";

export default function StaffOrders() {
    const [ordersList , setOrdersList] = React.useState([]);
    const [showError, setShowError] = useState("")

    useEffect(() => {
        loadOrders()
    }, []);

    const changeCollection = (list) =>{
        let collection = list.reduce((r, a) => {

            r[a.orderName] = r[a.orderName] || [];

            r[a.orderName].push(a);

            return r
        }, {});

        let result = []
        let items = ""
        for(let key in collection){
            for(let item of collection[key]){
                items += `${item.goodName}, `
            }
            items = items.substring(0,items.length-2)
            result.push({
                orderName: key,
                deliveryDate: collection[key][0].deliveryDate,
                goodsName: items,
                customerLogin: collection[key][0].customerLogin,
                userAddress: collection[key][0].userAddress,
                price: collection[key][0].price
            })
            items = ""
        }
        return result
    }

    const loadOrders = async () => {
        await fetch(`http://localhost:8080/api/staff/orders/${window.sessionStorage.getItem("staff_login")}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
               return response.json()

            }).then(data => {
                if(data.message) {
                    setShowError(data.message)
                    return
                }
                setOrdersList([...changeCollection(data)])
                (data);
            })
    };

    const onUpdate = async (orderName) =>{
        await fetch(`http://localhost:8080/api/staff/order/${orderName}`, {
            method: 'GET'
        })
            .then(response => {

                if (response.ok) {
                    return response.text()
                }
                return response.json()
            }).then(data => {
                if(data.message) {
                    setShowError(data.message)
                    return
                }
                loadOrders()
                })
    }

    return (
        ordersList.length === 0 ?
            <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h4 className="text-center m-4">No orders</h4>
            </div>
            :
        <div className="container">
            <div className="mb-3">
                <p className="text-danger" >{showError}</p>
            </div>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Order Name</th>
                        <th scope="col" className="text-center">Goods Name</th>
                        <th scope="col" className="text-center">Customer Login</th>
                        <th scope="col" className="text-center">Delivery Date</th>
                        <th scope="col" className="text-center">User Address</th>
                        <th scope="col" className="text-center">Price</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ordersList.map((order, index) => (
                        <tr key={index}>
                            <td className="text-center">{order.orderName}</td>
                            <td className="text-center w-25">{order.goodsName}</td>
                            <td className="text-center">{order.customerLogin}</td>
                            <td className="text-center">{order.deliveryDate}</td>
                            <td className="text-center">{order.userAddress}</td>
                            <td className="text-center">{order.price}</td>
                            <td className="text-center">
                                <button className="btn btn-success mr-2" onClick={()=>onUpdate(order.orderName)}>Execute</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}