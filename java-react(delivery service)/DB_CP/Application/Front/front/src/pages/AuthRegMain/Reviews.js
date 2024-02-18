import React, {useEffect} from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";

export default function Reviews() {
    const [reviewsList , setReviewsList] = React.useState([]);

    useEffect(() => {
        loadReviews()
    }, []);

    const loadReviews = async () => {
        let url = ""
        if(window.sessionStorage.getItem("admin_login"))
            url = "http://localhost:8080/api/admin/reviews"
        else if (window.sessionStorage.getItem("staff_login"))
            url = "http://localhost:8080/api/staff/reviews"
        else
            url = "http://localhost:8080/api/user/reviews"

        await fetch(url, {
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
                setReviewsList([...data]);
            }).catch(error => {
                alert(error);
            })
    };

    const deleteReviews = () =>{
         fetch(`http://localhost:8080/api/admin/reviews`, {
            method: 'DELETE'
        })
            .then(response => {

                if (response.status === 200) {
                   loadReviews()
                }
            })
    }

    return (
        reviewsList.length === 0 ?
            <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h4 className="text-center m-4">No reviews</h4>
            </div>
            :
        <div className="container">
            <div className="py-4">
                <div>
                    <button className={`btn btn-danger my-2  d-${window.sessionStorage.getItem("admin_login")?"block":"none"}`}
                    onClick={()=>deleteReviews()}>
                        Delete reviews
                    </button>
                </div>
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Customer</th>
                        <th scope="col" className="text-center">Content</th>
                        <th scope="col" className="text-center">Estimation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reviewsList.map((review, index) => (
                        <tr key={index}>
                            <td className="text-center">{review.reviewerLogin}</td>
                            <td className="text-center">{review.content}</td>
                            <td className="text-center">{review.estimation}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}