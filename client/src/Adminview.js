import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Axios from 'axios';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';

function Adminview(){
    const navigate = useNavigate();
    const { recipeid, userid } = useParams();
    const recid = recipeid;
    const uid = userid
    const [id, setid] = useState("");
    const [recipename, setrecipename] = useState("");
    const [ingredients, setingredients] = useState("");
    const [instructions, setinstructions] = useState("");
    const [name, setname] = useState(0);
    
    const [checkInfo, setCheckInfo] = useState(false);
    const [accounttype, setaccounttype] = useState(true);
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await Axios.get(`http://localhost:3001/checkadmin`);
                console.log(response.data);
                if (response.data) {
                    setCheckInfo(true)
                    setaccounttype(response.data.accounttype)
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        if (recid) {
            fetchUserData();
        }
    }, [recid]);
    const handleBack = (e) => {
        uid && navigate(generatePath("/admindb/:uid", { uid }));
      };

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await Axios.get(`http://localhost:3001/viewrecipe/${recid}`);
                setid(response.data[0].id);
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
    if (checkInfo === false) {
        return (
            <div class="App">
            <div class="headform">
            <h1 class="titleheadform">Loading...</h1>
            </div>
            </div>
            )
        }
    else{
        if(accounttype == "Admin"){
            return(
                <div class="App">
                    <h1 class="titleheadform">{recipename}</h1>
                    <h2 class="titleheadform">Recipe ID: {id}</h2>
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
        else{
            uid && navigate(generatePath("/home/:uid", { uid }));
        }
    }
    

}
export default Adminview;