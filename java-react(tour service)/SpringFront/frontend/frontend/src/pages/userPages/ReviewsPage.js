import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";

export default function ReviewsPage() {
    const {name} = useParams()
    const [reviews, setReviews] = React.useState([])
    let navigate=useNavigate()
    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = () => {
        fetch(`http://localhost:8080/api/user/reviews/${name}`,
            {
                method: 'GET',
                headers:
                    {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
                    }
            }
        )
            .then(response => {
                if(response.status === 500){
                    navigate("/authorization")
                }
                return response.json()
            })
            .then(data => {
                setReviews(data.reviews);
            })
    }
    return (
        <div className="container">
            <h2 className="display-4 text-center m-4">Reviews</h2>
            <h3 className="display-6 text-center m-4">About: {name} tour</h3>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Customer</th>
                        <th scope="col" className="text-center">Content</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        reviews.map((review, index) => (
                            <tr key={index}>
                                <td className="text-center">{review.userProfile}</td>
                                <td className="text-center">
                                    <textarea class="form-control" readOnly={true}>{review.content}</textarea>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}