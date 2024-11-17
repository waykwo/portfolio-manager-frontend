
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
        <a href="./SignupPage">Signup</a>

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