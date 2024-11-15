import axios from "axios";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };
  console.log("Logged out")

  return (
    <a href="/" onClick={handleClick}>
      Logout
    </a>
  );
}