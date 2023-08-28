import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function Add(){
    const navigate = useNavigate();
    const [id, setid] = useState(0);
    const [name, setname] = useState(0);

    const [recipename, setrecipename] = useState("");
    const [ingredients, setingredients] = useState("");
    const [instructions, setinstructions] = useState("");


    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await Axios.get(`http://localhost:3001/getid`);
                console.log(response.data.id);
                setid(response.data.id)
                setname(response.data.name)
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUserData();
    }, []);
    const handleBack = (e) => {
        id && navigate(generatePath("/home/:id", { id }));
      };

    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        var b = document.forms["myform"]["binput"].value;
        var c = document.forms["myform"]["cinput"].value;
        if (a == "" ||b == "" ||c == ""){
            alert("All fields must be filled out");
        }
        else{
            Axios.post("http://localhost:3001/addrecipe", {name: name, recipename: recipename, ingredients: ingredients, instructions: instructions});
            alert("Recipe created")
            id && navigate(generatePath("/home/:id", { id }));
        }
    }
    return (
        <div className="App">
            <h1 class="titleheadform">New Recipe for {name}</h1>
            <button type="button" class="btn btn-primary backbutton" onClick={handleBack}>Back</button>
            <main class="container-fluid">
            <form class="formdiv" enctype="multipart/form-data" name="myform" required>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Recipe Name</label>
                    <input name="ainput" type="text" class="form-control" placeholder="Recipe Name" id="inputDefault" onChange={(e) =>{setrecipename(e.target.value)}} required/>
                </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Ingredients</label>
                    <input name="binput" type="text" class="form-control" placeholder="Ingredients" id="inputDefault" onChange={(e) =>{setingredients(e.target.value)}} required/>
                </div>
                <div class="form-group">
                    <label class="col-form-label mt-4" for="inputDefault">Instructions</label>
                    <input name="cinput" type="text" class="form-control" placeholder="Instructions" id="inputDefault" onChange={(e) =>{setinstructions(e.target.value)}} required/>
                </div>
                <button type="submit" value="Submit" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
            </form>
            </main>
        </div>
    )


}

export default Add;