import axios from "axios";
import { useState } from "react";

export function SignupPage() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
      <h3 className="text-3xl font-semibold m-8">Signup</h3>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input name="name" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" />
        </div>
        <div>
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input name="password_confirmation" type="password" />
        </div>
        <button className="bg-indigo-700 hover:bg-indigo-500 text-slate-200 rounded-md  px-5 py-1 mt-8 mb-1 my-2" type="submit">Signup</button>
      </form>
    </div>
  );
}