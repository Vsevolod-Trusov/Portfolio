import './App.css';
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Registration from "./pages/Registration";
import {BrowserRouter as Router, Outlet, Route, Routes} from "react-router-dom";
import Authorisation from "./pages/Authorisation";
import Main from "./pages/Main";
import OrderPage from "./pages/userPages/OrderPage";
import AdminHome from "./pages/adminPages/AdminHome";
import AddTour from "./pages/adminPages/AddTour";
import UserMain from "./pages/userPages/UserMain";
import ReviewPage from "./pages/userPages/ReviewPage";
import ReviewsPage from "./pages/userPages/ReviewsPage";
import Navbar from "./components/Navbar";
import ConfirmRegistration from "./pages/ConfirmRegistration";


function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<><Navbar default="Tour Service"/><Outlet/></>
                    }>
                        <Route path="/" element={<Main/>}/>
                        <Route exac path={"/registration"} element={<Registration/>}/>
                        <Route path={"/authorization"} element={<Authorisation/>}/>
                        <Route path={"/activate/:code"} element={<ConfirmRegistration/>}/>
                    </Route>


                    <Route path="/user/main" element={<><Navbar user="User"/><Outlet/></>}>
                        <Route path={"/user/main/order"} element={<OrderPage/>}/>
                        <Route path={"/user/main"} element={<UserMain/>}/>
                        <Route path={"/user/main/review/:name"} element={<ReviewPage/>}/>
                        <Route path={"/user/main/reviews/:name"} element={<ReviewsPage/>}/>
                    </Route>

                    <Route path="/admin/main" element={<><Navbar admin="admin"/><Outlet/></>}>
                        <Route path={"/admin/main"} element={<AdminHome/>}/>
                        <Route path={"/admin/main/tour"} element={<AddTour/>}/>
                    </Route>

                </Routes>
      </Router>
    </div>
  );
}

export default App;
