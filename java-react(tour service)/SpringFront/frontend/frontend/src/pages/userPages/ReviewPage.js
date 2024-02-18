import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function ReviewPage() {
    const navigate = useNavigate();
    const {name} = useParams()
    const [showError, setShowError] = useState("")
    const [review, setReview] = useState({
        tour: name,
        content: ""
    });

    let {content} = review;

    const onInputChange = (e) => {
        setReview({...review, [e.target.name]: e.target.value});
    };

    const checkData = () => {
        if (content === "") {
            setShowError("Content is empty");
            return false;
        }

        if (content.length > 300) {
            setShowError("Content max 300 length");
            return false;
        }
        return true
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!checkData()) {
            return
        }

        await fetch("http://localhost:8080/api/user/reviews", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(review)
        })
            .then(response => {

                if (response.ok) {
                    navigate("/user/main")
                } else if(response.status === 500){
                    navigate("/authorization")
                } else return response.json()
            }).then(data => {
                if (data.message) {
                    setShowError(data.message)
                }
            })
    };

    const back = () => {
        navigate(`/user/main`)
    }


    return (
        <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Review</h2>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Tour name
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        readOnly={true}
                        name="name"
                        value={name}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        name="content"
                        value={content}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <p className="text-danger">{showError}</p>
                </div>
                <button className="btn btn-outline-secondary m-2" onClick={() => back()}
                >
                    Cancel
                </button>
                <button type="submit" className="btn btn-outline-primary">
                    Send
                </button>
            </form>
        </div>
    )
}