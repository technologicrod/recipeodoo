import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import { Link, useNavigate, generatePath } from 'react-router-dom';

function Create() {
    const [fullname, setfullname] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    const [acctype, setacctype] = useState("")
    const navigate = useNavigate();
    const validateEmail = (email) => {
        // Email regex pattern for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const register = async () => {
        var a = document.forms["myform"]["inputa"].value;
        var b = document.forms["myform"]["inputb"].value;
        var c = document.forms["myform"]["inputc"].value;
        var d = document.forms["myform"]["inputd"].value;
        if (a === "" || b === "" || c === "" || d === "") {
          alert("Required fields must be filled out");
        } 
        else if (!validateEmail(email)) {
            alert("Invalid email address");
            } 
        else {
            const details = {
                fullname: fullname, 
                password: password, 
                email: email, 
                acctype: acctype
            }
            console.log(details)
          try {
            const result =await Axios.post(`http://localhost:3001/adduser`, details);
            if(result.data > 0){
                alert("Account registered");
                navigate('/', { replace: true });
            }
            //window.location.reload();
          } catch (error) {
            if (error.response && error.response.status === 409) {
              alert("Username or email already exists");
            } else {
              alert("Failed to register account");
            }
          }
        }
      }
      
  return (
      <div className="App">
        <Link to="/"><button type="button" class="btn btn-primary backbutton">Back</button></Link>
        <main class="container-fluid">
            <form class="createform" enctype="multipart/form-data" name="myform" required>
            <h3>Create an account</h3>
            <div class="form-group">
            <label class="form-label mt-4">Email address</label>
            <input type="email" class="form-control inputclass2" name="inputa" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  onChange={(e) =>{setemail(e.target.value)}} required/>
            </div>
            <div class="form-group">
            <label class="form-label mt-4">Full Name</label>
            <input type="email" class="form-control inputclass2" name="inputb" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter full name"  onChange={(e) =>{setfullname(e.target.value)}} required/>
            </div>
            <div class="form-group">
            <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
            <input type="password" class="form-control inputclass2" name="inputc" id="exampleInputPassword1" placeholder="Password"  onChange={(e) =>{setpassword(e.target.value)}} required/>
            </div>
            <fieldset name="inputd" class="form-group" onChange={(e) =>{setacctype(e.target.value)}} required>
                            <legend class="mt-4">Harvested Batch Quality</legend>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="Admin"/>
                            <label class="form-check-label" for="optionsRadios1">
                                Admin
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="Basic"/>
                            <label class="form-check-label" for="optionsRadios2">
                                Basic 
                            </label>
                            </div>
                    </fieldset>
            <button type="button" class="btn btn-primary loginbutton" onClick={register}><b>Register</b></button>
            </form>
        </main>
      </div>
    );
}

export default Create;
