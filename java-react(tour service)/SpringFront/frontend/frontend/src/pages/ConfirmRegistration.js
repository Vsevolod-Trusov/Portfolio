import React, {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function ConfirmRegistration() {
    let {code} = useParams()
    let navigate=useNavigate()
    const [message, setMessage] = useState("")
          fetch(`http://localhost:8080/api/auth/activate/${code}`, {
             method: 'GET',
             headers: {
                 'Content-type': 'application/json'
             }
         })
             .then(response => {
                 if(response.ok){
                     navigate("/authorization")
                 }
                 else
                     navigate("/")
                 return response.json()
             }).then(data => {setMessage(data.message)})



    return (
        <div className="container">
            <h2 className="text-center m-4">Activate profile</h2>
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <form>
                    <div className="mb-3">
                        <input
                            readOnly={true}
                            type={"text"}
                            className={`form-control text-center `}
                            value={message}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}