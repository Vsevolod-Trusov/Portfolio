import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function AddGoodForm() {

    let navigate = useNavigate()
    const [good, setGood] = useState({
        name: "",
        description: "",
        price: 0.0
    });

    let {name, description, price} = good;
    const [showError, setShowError] = useState("")

    const checkData = () => {
        if (name.length <= 0) {
            setShowError("Good name is empty")
            return false
        }
        if (name.length > 20) {
            setShowError("Wrong name. Max length is 20 characters")
            return false
        }

        if (+price <= 0) {
            setShowError("Wrong price value.")
            return false
        }

        if (description.length <= 0) {
            setShowError("Description is empty")
            return false
        }

        if (description.length > 300) {
            setShowError("Wrong description. Max length is 300 characters")
            return false
        }

        return true
    }

     const sendGood = async () => {
         if (!checkData()) {
             return
         }
         await fetch("http://localhost:8080/api/admin/good",
             {
                 method: 'POST',
                 headers:
                     {
                         "Content-Type": "application/json",
                     },
                 body: JSON.stringify(good)
             }
         )
             .then(response => {
                 if (response.ok) {
                     setShowError("")
                     navigate("/admin/main/goods")
                 }
                 return response.json()
             }).then(data => {
                 if(data.message){
                     setShowError(data.message)
                 }
         })
     }

    const onInputChange = (e) => {
        setGood({...good, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        sendGood();
    }

    return (
        <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Good</h2>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Good name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={price}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea name="description" className="form-control" value={description}
                              onChange={e => onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <p className="text-danger" >{showError}</p>
                </div>
                <Link className="btn btn-secondary me-2" to="/admin/main/goods">
                    Cancel
                </Link>
                <button type="submit" className="btn btn-outline-primary " onClick={(e) => onSubmit(e)}>
                    Add good
                </button>
            </form>
        </div>
    )
}