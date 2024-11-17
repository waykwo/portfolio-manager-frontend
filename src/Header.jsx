// import { Link } from "react-router-dom";
// import { LoginPage } from "./LoginPage";
import { LogoutLink } from "./LogoutLink";
import { useEffect, useState } from "react";
import axios from "axios";

export function Header() {
  const [currentUser, setCurrentUser] = useState({});
  const getUserData = () => {
    axios.get("http://localhost:3000/users/current.json").then(response => {
      setCurrentUser(response.data);
    })
  }

  useEffect(getUserData, [])

  let authenticationLinks, user;
  if (localStorage.jwt === undefined) {
    authenticationLinks = (
      <div>
        {/* <a href="./LoginPage">Login</a> |&nbsp; */}
        <a href="./SignupPage">Signup</a>
        {/* <Link to="/signup">Signup</Link> |&nbsp; */}
      </div>
    )
  } else {
    user = <>Welcome, {currentUser.name}!</>
    authenticationLinks = (
      <LogoutLink />
    )
  };

  return (
    <header>
      <nav>
        {/* <Link to="/">Home</Link> |&nbsp;
        <Link to="/">Link</Link> |&nbsp;
        <Link to="./LoginPage"></Link> */}

        {/* <a href="#">Portfolio</a> */}
        {/* &nbsp;|&nbsp; <a href="#">Equities</a> */}
        {/* &nbsp;|&nbsp; <a href="#">Fixed Income</a> */}
        {/* &nbsp;|&nbsp; <a href="#">Commodities</a> */}
        {/* &nbsp;|&nbsp; <a href="#">Gold</a> */}
        {/* &nbsp;|&nbsp; <a href="./LoginPage">Login</a> */}
        {/* &nbsp;|&nbsp; <a href="./SignupPage">Signup</a> */}
        {/* &nbsp;|&nbsp; <a href="./LogoutLink">Logout</a> */}
        <div className="float-left font-raleway text-xl">
          {user}
        </div>
        <div className="float-right font-raleway text-xl hover:font-bold hover:text-orange-600">
          {authenticationLinks}
        </div>
        <div className="clear-both"></div>
      </nav>
    </header>
  )
}