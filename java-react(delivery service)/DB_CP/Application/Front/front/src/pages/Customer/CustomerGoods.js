import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function CustomerGoods(props) {
    const [goodsList, setGoodsList] = React.useState([]);
    const [rowsCount, setRowsCount] = React.useState(0);
    const goodsPerTableList = 7
    const [indexOfFirstGood, setIndexOfFirstGood] = useState(1)

    useEffect(() => {
        loadGoods(indexOfFirstGood, goodsPerTableList - 1);
        setRows()
    }, []);

    const setRows = async () => {
        await fetch(`http://localhost:8080/api/user/good/count`, {
            method: 'GET'
        })
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
            }).then(data => {
                setRowsCount(data)
                (data)
            })
    }
    const loadGoods = async (startIndexGood, interval) => {
        await fetch(`http://localhost:8080/api/user/goods/${startIndexGood}/${interval}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }else return response.json()
            }).then(data => {
                if(data.message){
                    setIndexOfFirstGood(0)
                    loadGoods(1, goodsPerTableList-1)
                }else setGoodsList([...data]);
            })
    };

    const previousTableList = () => {
        setIndexOfFirstGood(indexOfFirstGood - goodsPerTableList)
        loadGoods(indexOfFirstGood - goodsPerTableList, goodsPerTableList - 1);
    }

    const nextTableList = () => {
        setIndexOfFirstGood(indexOfFirstGood + goodsPerTableList)
        loadGoods(indexOfFirstGood + goodsPerTableList, goodsPerTableList - 1);
    }

    const putInBasket = (good) => {
        alert(`Good ${good.name} was added to card`)
        props.setGoods([...props.goods, good])
    }

    return (
         goodsList.length === 0 ?
             <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                 <h4 className="text-center m-4">No goods</h4>
             </div>
                 :
                <div className="container">
                    <div className="py-4">
                        <div className="container" style={{paddingLeft: "2%", paddingRight: "2%", paddingBottom: "1%"}}>
                            <button className="btn btn-primary offset-0"
                                    disabled={(indexOfFirstGood - goodsPerTableList) <= 0}
                                    onClick={() => previousTableList()}
                            >Back
                            </button>
                            <button className="btn btn-primary offset-9" onClick={() => nextTableList()}
                                    disabled={(indexOfFirstGood + goodsPerTableList) >= rowsCount}>Next
                            </button>
                        </div>
                        <table className="table border shadow">
                            <thead>
                            <tr>
                                <th scope="col" className="text-center">Name</th>
                                <th scope="col" className="text-center">Description</th>
                                <th scope="col" className="text-center">Price</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {goodsList.map((good, index) => (
                                <tr key={index}>
                                    <td className="text-center">{good.name}</td>
                                    <td className="text-center">{good.description}</td>
                                    <td className="text-center">{good.price}</td>
                                    <td className="text-center">
                                        <button className="btn btn-outline-success mr-2"
                                                onClick={() => putInBasket(good)}>
                                            Buy
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