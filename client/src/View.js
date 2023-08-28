import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Axios from 'axios';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';

function View(){
    const navigate = useNavigate();
    const { recipeid, userid } = useParams();
    const recid = recipeid;
    const uid = userid

    const [recipename, setrecipename] = useState("");
    const [ingredients, setingredients] = useState("");
    const [instructions, setinstructions] = useState("");
    const [name, setname] = useState(0);
    const handleBack = (e) => {
        uid && navigate(generatePath("/home/:uid", { uid }));
      };

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await Axios.get(`http://localhost:3001/viewrecipe/${recid}`);
                console.log(response.data[0].id);
                setrecipename(response.data[0].x_name)
                setingredients(response.data[0].x_studio_ingredients )
                setinstructions(response.data[0].x_studio_instructions)
                setname(response.data[0].x_studio_created_by_1)
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUserData();
    }, [recid]);
    return(
        <div class="App">
            <h1 class="titleheadform">{recipename}</h1>
            <button type="button" class="btn btn-primary backbutton" onClick={handleBack}>Back</button>
            <main class="container-fluid">
                <div class="viewdiv">
                <br></br>
                <h3>Ingredients</h3>
                <h5>{ingredients}</h5>
                <br></br>
                <h3>Instructions</h3>
                <h5>{instructions}</h5>
                <br></br>
                <h3>Created by</h3>
                <h5>{name}</h5>
                </div>
            </main>

        </div>
    )

}
export default View;