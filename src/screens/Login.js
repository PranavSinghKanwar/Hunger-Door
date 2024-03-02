import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  let navigate = useNavigate();
  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:credentials.email, password: credentials.password}),
      });
      const json = await response.json();
      console.log(json);
  
      if(!json.success){
        alert("Enter valid credentials");
      }
      else{
        navigate("/");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  

  const changing = function(event){
    setCredentials({...credentials, [event.target.name]:event.target.value});
  }
  return (
<div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" id="email" className="form-control" name="email" value={credentials.email} onChange={changing}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" id="password" className="form-control" name="password" value={credentials.password} onChange={changing}/>
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/create_user" className="m-3 btn btn-danger">
            New user?
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login
