import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function AdminGoodsPage() {
    const [goodsList, setGoodsList] = React.useState([]);
    const [rowsCount, setRowsCount] = React.useState(0);
    const goodsPerTableList = 7
    const [indexOfFirstGood, setIndexOfFirstGood] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        loadGoods(indexOfFirstGood, goodsPerTableList - 1);
        setRows()
    }, []);

    const setRows = async () => {
        await fetch(`http://localhost:8080/api/admin/good/count`, {
            method: 'GET'
        })
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
            }).then(data => {
                setRowsCount(data)
            })
    }

    const loadGoods = async (startIndexGood, interval) => {
        await fetch(`http://localhost:8080/api/admin/goods/${startIndexGood}/${interval}`, {
            method: 'GET', headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }else
                    return response.json()
            }).then(data => {
                if(data.message){
                    setIndexOfFirstGood(1)
                    loadGoods(1, goodsPerTableList-1)
                }else setGoodsList([...data]);
            })
    };

    const onDelete = async (goodName) =>{

        await fetch(`http://localhost:8080/api/admin/good/${goodName}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.status === 200) {
                    return response.text()
                }

                throw new Error(`${response.status}: Error while deleting good`)
            }).then(data => {
                loadGoods(indexOfFirstGood, goodsPerTableList-1)
            }).catch(error => {
                alert(error);
            })
    }

    const addGood = () => {
        navigate("/admin/main/goods/good")
    }

    const previousTableList = () => {
        setIndexOfFirstGood(indexOfFirstGood - goodsPerTableList)
        loadGoods(indexOfFirstGood - goodsPerTableList, goodsPerTableList - 1);
    }

    const nextTableList = () => {
        setIndexOfFirstGood(indexOfFirstGood + goodsPerTableList)
        loadGoods(indexOfFirstGood + goodsPerTableList, goodsPerTableList - 1);
    }

    const deleteGoods = () => {
         fetch(`http://localhost:8080/api/admin/goods`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.status === 200) {
                    return response.text()
                }
                throw new Error(`${response.status}: Error while deleting goods`)
            }).then(data => {
                setIndexOfFirstGood(1)
             loadGoods(1, goodsPerTableList-1)
            }).catch(error => {
                alert(error);
            })
    }

    const importGoods = () =>{
        fetch(`http://localhost:8080/api/admin/import`, {
            method: 'POST'
        })
            .then(response => {
                if (response.status === 200) {
                    return response.text()
                }
                throw new Error(`${response.status}: Error while importing`)
            }).then(data => {
                (data)
            setIndexOfFirstGood(1)
            loadGoods(1, goodsPerTableList-1)
        }).catch(error => {
            alert(error);
        })
    }

    const loadRows = () =>{
        fetch(`http://localhost:8080/api/admin/load`, {
            method: 'GET'
        })
            .then(response => {
                if (response.status === 200) {
                    return response.text()
                }
                throw new Error(`${response.status}: Error while importing`)
            }).then(data => {
            alert(data)
            setIndexOfFirstGood(1)
            loadGoods(1, goodsPerTableList-1)
        }).catch(error => {
            alert(error);
        })
    }

    return (
        goodsList.length === 0 ?
            <div className='py-4'>
                <div className="container" style={{paddingLeft: "4%", paddingRight: "9%", paddingBottom: "1%"}}>
                    <button className="btn btn-primary offset-1" onClick={() => importGoods()}>
                        Import
                    </button>
                    <button className="btn btn-primary offset-1" onClick={() => loadRows()}>
                        Load
                    </button>
                    <button className="btn btn-primary offset-1" onClick={() => addGood()}>Add Good</button>
                </div>
                <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h4 className="text-center m-4">No goods</h4>
                </div>
            </div>
            :
        <div>
            <div className="container">
                <div className="py-4">
                    <div className="container" style={{paddingLeft: "4%", paddingRight: "9%", paddingBottom: "1%"}}>
                        <button className="btn btn-primary me-1"
                                disabled={(indexOfFirstGood - goodsPerTableList) <= 0}
                                onClick={() => previousTableList()}
                        >Back
                        </button>
                        <button className="btn btn-primary " onClick={() => nextTableList()}
                                disabled={(indexOfFirstGood + goodsPerTableList) >= rowsCount}>Next
                        </button>
                        <button className="btn btn-danger offset-3" onClick={() => deleteGoods()}
                                disabled={goodsList.length === 0}>
                        Delete goods
                        </button>
                        <button className="btn btn-primary offset-1" onClick={() => importGoods()}>
                            Import
                        </button>
                        <button className="btn btn-primary offset-1" onClick={() => loadRows()}>
                            Load
                        </button>
                        <button className="btn btn-primary offset-1" onClick={() => addGood()}>Add Good</button>
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
                                <button className="btn btn-danger mr-2" onClick={()=>onDelete(good.name)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}