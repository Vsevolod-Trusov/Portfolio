import React, {useEffect} from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";

export default function CustomerShowReviews() {
    const [reviewsList , setReviewsList] = React.useState([]);

    useEffect(() => {
        loadReviews()
    }, []);

    const loadReviews = async () => {
        await fetch(`http://localhost:8080/api/staff/reviews`, {
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

    return (
        reviewsList.length === 0 ?
            <div className="container col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h4 className="text-center m-4">No reviews</h4>
            </div>
            :
        <div className="container">

            <div className="py-4">
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