import React, {useEffect} from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";

export default function CustomerHistory() {
    const [historyList , setHistoryList] = React.useState([]);

    useEffect(() => {
        loadHistory()
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
                items += `${item.name}, `
            }
            items = items.substring(0,items.length-2)
            result.push({
                orderDate: collection[key][0].orderDate,
                deliveryDate: collection[key][0].deliveryDate,
                orderStatus: collection[key][0].status,
                orderPrice: collection[key][0].orderPrice,
                goodsName: items,
            })
            items = ""
        }
        return result
    }

    const loadHistory = async () => {
        await fetch(`http://localhost:8080/api/user/history/${window.sessionStorage.getItem("customer_login")}`, {
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
                setHistoryList([...changeCollection(data)]);
            }).catch(error => {
                alert(error);
            })
    };

    return (
        historyList.length === 0 ?
            <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h4 className="text-center m-4">History is empty</h4>
            </div>
            :
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center w-25">Name</th>
                        <th scope="col" className="text-center">Status</th>
                            <th scope="col" className="text-center">Delivery Date</th>
                            <th scope="col" className="text-center">Order Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {historyList.map((good, index) => (
                        <tr key={index}>
                            <td className="text-center">{good.goodsName}</td>
                            <td className="text-center">{good.orderStatus}</td>
                            <td className="text-center">{good.deliveryDate}</td>
                            <td className="text-center">{good.orderDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}