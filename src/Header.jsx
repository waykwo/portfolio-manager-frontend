// import { Link } from "react-router-dom";
import { LoginPage } from "./LoginPage";

export function Header() {
  return (
    <header>
      <nav>
        {/* <Link to="#">Home</Link> | <Link to="#">Link</Link> | <Link to="./LoginPage"></Link> */}
        <a href="#">Home</a> |&nbsp;
        <a href="#">Link</a> |&nbsp;
        <a href="./LoginPage">Login</a> |&nbsp;
        <a href="./SignupPage">Signup</a> |&nbsp;
        <a href="./LogoutLink">Logout</a> |&nbsp;
      </nav>
    </header>
  )
}