import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function AdminOrders() {
    const [ordersList , setOrdersList] = React.useState([]);
    const navigate =useNavigate()
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
                orderDate: collection[key][0].orderDate,
                deliveryDate: collection[key][0].deliveryDate,
                status: collection[key][0].status,
                deliveryType: collection[key][0].deliveryType,
                goodsName: items,
                customerLogin: collection[key][0].customerLogin,
                executorLogin: collection[key][0].executorLogin,
                userAddress: collection[key][0].userAddress,
                deliveryAddress: collection[key][0].deliveryAddress,
                price: collection[key][0].price
            })
            items = ""
        }
        return result
    }

    const loadOrders = async () => {
        await fetch(`http://localhost:8080/api/admin/orders`, {
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
                setOrdersList([...changeCollection(data)]);
            }).catch(error => {
                alert(error);
            })
    };

    const changeOrder = async (order) =>{
       navigate(`/admin/main/orders/order`, {state: order})
    }

    return (
        ordersList.length === 0 ?
            <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h4 className="text-center m-4">No orders</h4>
            </div>
            :
        <div style={{padding: "5px"}}>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Goods Name</th>
                        <th scope="col" className="text-center">Status</th>
                        <th scope="col" className="text-center">Executor</th>
                        <th scope="col" className="text-center">Customer Login</th>
                        <th scope="col" className="text-center">Delivery Date</th>
                        <th scope="col" className="text-center">Order Date</th>
                        <th scope="col" className="text-center">User Address</th>
                        <th scope="col" className="text-center">Delivery Address</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ordersList.map((order, index) => (
                        <tr key={index}>
                            <td className="text-center w-25">{order.goodsName}</td>
                            <td className="text-center">{order.status}</td>
                            {order.executorLogin !== 'executor' ? <td className="text-center">{order.executorLogin}</td>
                                : <td className="text-center"></td>}
                            <td className="text-center">{order.customerLogin}</td>
                            <td className="text-center">{order.deliveryDate}</td>
                            <td className="text-center">{order.orderDate}</td>
                            <td className="text-center">{order.userAddress}</td>
                            <td className="text-center">{order.deliveryAddress}</td>
                            <td className="text-center">
                                <button className="btn btn-primary mr-2" onClick={()=>changeOrder(order)}>Change</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}