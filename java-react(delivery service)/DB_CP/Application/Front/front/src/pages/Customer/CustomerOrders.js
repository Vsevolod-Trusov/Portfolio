import React, {useEffect} from "react";

export default function CustomerOrders() {
    const [ordersList , setOrdersList] = React.useState([]);
    let groupListByOrder = []
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
                orderStatus: collection[key][0].orderStatus,
                deliveryType: collection[key][0].deliveryType,
                goodsName: items,
                customerLogin: collection[key][0].customerLogin,
                executorLogin: collection[key][0].executorLogin,
                deliveryPoint: collection[key][0].deliveryPoint,
                price: collection[key][0].price,
                status: collection[key][0].status
            })
            items = ""
        }
        return result
    }

    const loadOrders = async () => {
        await fetch(`http://localhost:8080/api/user/orders/${window.sessionStorage.getItem("customer_login")}`, {
            method: 'POST',
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
                groupListByOrder = changeCollection(data)
                setOrdersList([...groupListByOrder]);
            }).catch(error => {
                alert(error);
            })
    };

    const onDelete = async (orderName) =>{

        (orderName)
        await fetch(`http://localhost:8080/api/user/order/${orderName}`, {
            method: 'DELETE'
        })
            .then(response => {

                if (response.status === 200) {
                    return response.text()
                }
                throw new Error(`${response.status}`)
            }).then(data => {
                loadOrders()
            }).catch(error => {
                alert(error);
            })
    }

    const onTook = async (orderName) =>{

        (orderName)
        await fetch(`http://localhost:8080/api/user/order/${orderName}`, {
            method: 'GET'
        })
            .then(response => {

                if (response.status === 200) {
                    return response.text()
                }
                throw new Error(`${response.status}`)
            }).then(data => {
                loadOrders()
            }).catch(error => {
                alert(error);
            })
    }
    return (
        ordersList.length === 0 ?
            <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h4 className="text-center m-4">No orders</h4>
            </div>
            :
        <div className="container-fluid">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Order Name</th>
                        <th scope="col" className="text-center w-25">Goods Name</th>
                        <th scope="col" className="text-center ">Status</th>
                        <th scope="col" className="text-center">Executor</th>
                        <th scope="col" className="text-center">Delivery Date</th>
                        <th scope="col" className="text-center">Order Date</th>
                        <th scope="col" className="text-center">Price</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ordersList.map((order, index) => (
                        <tr key={index}>
                            <td className="text-center">{order.orderName}</td>
                            <td className="text-center">{order.goodsName}</td>
                            <td className="text-center">{order.status}</td>
                            {order.executorLogin === 'executor'
                                ? <td className="text-center">{order.deliveryType}</td>
                                    : <td className="text-center">{order.executorLogin}</td>}
                            <td className="text-center">{order.deliveryDate}</td>
                            <td className="text-center">{order.orderDate}</td>
                            <td className="text-center">{order.price === 0?"":order.price}</td>
                            <td className="text-center">
                                {
                                    order.deliveryType === 'pickup'?
                                    <button className="btn btn-primary me-2"
                                    onClick={() => onTook(order.orderName)}>Took
                                    </button>
                                        :<></>
                                }
                                <button className="btn btn-danger justify-content-end"
                                        onClick={() => onDelete(order.orderName)}>Delete
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