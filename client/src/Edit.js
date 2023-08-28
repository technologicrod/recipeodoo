import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';
import Axios from 'axios';

function Edit(){
    const navigate = useNavigate();
    const { recipeid, userid } = useParams();
    const recid = recipeid;
    const uid = userid
    const [id, setid] = useState(0);

    const [recipename, setrecipename] = useState("");
    const [ingredients, setingredients] = useState("");
    const [instructions, setinstructions] = useState("");
    const [datalist, setdatalist] = useState([]);
    const [trecipename, settrecipename] = useState("");
    const [tingredients, settingredients] = useState("");
    const [tinstructions, settinstructions] = useState("");
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await Axios.get(`http://localhost:3001/viewrecipe/${recid}`);
                setdatalist(response.data);
                settrecipename(response.data[0].x_name)
                settingredients(response.data[0].x_studio_ingredients)
                settinstructions(response.data[0].x_studio_instructions)
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUserData();
    }, [recid]);
    useEffect(() =>{
        setrecipename(trecipename)
        setingredients(tingredients)
        setinstructions(tinstructions)
      }, [trecipename, tingredients, tinstructions])
    const handleBack = (e) => {
        uid && navigate(generatePath("/home/:uid", { uid }));
      };

    const register = () => {
        var a = document.forms["myform"]["ainput"].value;
        var b = document.forms["myform"]["binput"].value;
        var c = document.forms["myform"]["cinput"].value;
        if (a == "" ||b == "" ||c == ""){
            alert("All fields must be filled out");
        }
        else{
            Axios.put(`http://localhost:3001/editrecipe/${recipeid}`, {recipename: recipename, ingredients: ingredients, instructions: instructions});
            alert("Recipe edited")
            uid && navigate(generatePath("/home/:uid", { uid }));
        }
    }
    
    return (
        <div className="App">
            <button type="button" class="btn btn-primary backbutton" onClick={handleBack}>Back</button>
            {datalist.map((val)=> {
                return(
                    <div>
                        <h1 class="titleheadform">Edit {trecipename} Recipe</h1>
                        <button type="button" class="btn btn-primary backbutton" onClick={handleBack}>Back</button>
                        <main class="container-fluid">
                        <form class="formdiv" enctype="multipart/form-data" name="myform" required>
                            <div class="form-group">
                                <label class="col-form-label mt-4" for="inputDefault">Recipe Name</label>
                                <input name="ainput" type="text" class="form-control" placeholder={val.x_name} defaultValue={val.x_name} id="inputDefault" onChange={(e) =>{setrecipename(e.target.value)}} required/>
                            </div>
                            <div class="form-group">
                                <label class="col-form-label mt-4" for="inputDefault">Ingredients</label>
                                <input name="binput" type="text" class="form-control" placeholder={val.x_studio_ingredients} defaultValue={val.x_studio_ingredients} id="inputDefault" onChange={(e) =>{setingredients(e.target.value)}} required/>
                            </div>
                            <div class="form-group">
                                <label class="col-form-label mt-4" for="inputDefault">Instructions</label>
                                <input name="cinput" type="text" class="form-control" placeholder={val.x_studio_instructions} defaultValue={val.x_studio_instructions} id="inputDefault" onChange={(e) =>{setinstructions(e.target.value)}} required/>
                            </div>
                            <button type="submit" value="Submit" class="btn btn-outline-success submitbutton" onClick={register}>Submit</button>
                        </form>
                        </main>
                    </div>
                )
            })}
        </div>
    )


}

export default Edit;