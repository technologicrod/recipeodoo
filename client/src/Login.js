import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import { Link, useNavigate, generatePath } from 'react-router-dom';

function Login(){
    const [email, setemail] = useState("")
    const [pass, setpass] = useState("")
    const navigate = useNavigate();
    const register = () =>{
      if(email == "" || pass == ""){
        alert("No inputs")
      }
      else{
        Axios.post("http://localhost:3001/auth", {email: email, pass: pass}).then((response)=>{
          if (response.data != 0){
            console.log(response.data[0].id)
            var userid = response.data[0].id;
            var fullname = response.data[0].x_name
            alert("Hello, " + fullname)
            userid && navigate(generatePath("/home/:userid", { userid }));
          }
          else {
            alert("Unknown inputted account.")
          }
        });
      }
    }
    return(
        <div className="App">
        <div class="maindiv2">
        <h5 class="login1">Trial Project Login</h5>
        <br></br>
        <div class="form-group">
          <input
            type="text"
            class="form-control inputclass"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            onChange={(e) =>{setemail(e.target.value)}}
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control inputclass"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) =>{setpass(e.target.value)}}
          />
        </div>
        <button type="button" class="btn btn-primary loginbutton" onClick={register}><b>Login</b></button>
        </div>
        <Link to="/create"><button type="button" class="btn btn-primary createbutton">Create account</button></Link>
      </div>
    )

}

export default Login;