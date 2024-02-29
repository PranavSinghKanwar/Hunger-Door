import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const handleSubmit = async function (e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/create_user", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:credentials.name, email:credentials.email, password: credentials.password, location: credentials.location}),
    });
  };

  const changing = function(event){
    setCredentials({...credentials, [event.target.name]:event.target.value});
  }
  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="name" className="form-label">
              Name
            </label>
            <input type="text" id="name" className="form-control" name="name" value={credentials.name} onChange={changing}/>
          </div>
          <div className="mb-3">
            <label for="email" className="form-label">
              Email
            </label>
            <input type="email" id="email" className="form-control" name="email" value={credentials.email} onChange={changing}/>
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
              Password
            </label>
            <input type="password" id="password" className="form-control" name="password" value={credentials.password} onChange={changing}/>
          </div>
          <div className="mb-3">
            <label for="location" className="form-label">
              Address
            </label>
            <input type="text" id="location" className="form-control" name="location" value={credentials.location} onChange={changing}/>
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
