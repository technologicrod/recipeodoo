import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Axios from 'axios';
import { Link, useNavigate, useParams, generatePath } from 'react-router-dom';

function Admindb(){
    const { userid } = useParams();
    const loginid = userid;
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [checkInfo, setCheckInfo] = useState(false); // Renamed to camelCase
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [accounttype, setaccounttype] = useState("Admin");

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await Axios.get(`http://localhost:3001/check/${loginid}`);
                console.log(response.data);
                if (response.data) {
                    setCheckInfo(true);
                    setIsLoading(false);
                    setName(response.data.x_name);
                    setaccounttype(response.data.accounttype)
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        if (loginid) {
            fetchUserData();
        }
    }, [loginid]);
    console.log(accounttype)
    useEffect(() => {
        async function fetchRecipes() {
            try {
                if (name) {
                    const response = await Axios.get(`http://localhost:3001/allrecipes`);
                    console.log(response.data);
                    setRecipes(response.data);
                }
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        }

        fetchRecipes();
    }, [name]);
    const handleView = (id) => {
        id && userid && navigate(generatePath(`/adminview/:id/:userid`, { id, userid }));
    };
    const handleEdit = (id) => {
        id && userid && navigate(generatePath(`/adminedit/:id/:userid`, { id, userid }));
    };
    const handleDelete = (id) => {
        Axios.put(`http://localhost:3001/deleterecipe/${id}`, {});
        alert("Recipe deleted")
        window.location.reload();
    };
    const handleLogout = async (e) => {
        alert("Logged out");
        navigate(generatePath("/", { replace: true }));
        await Axios.post("http://localhost:3001/logout", { loginid: loginid });
      };
    const handleRecipes = async (e) => {
        alert("Exiting Admin Dashboard");
        loginid && navigate(generatePath("/home/:loginid", { loginid }));
    };
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
        if(accounttype == 'Admin'){
            return(
                <div class="App">
                    <Link to="/"><button type="button" class="btn btn-primary backbutton" onClick={handleLogout}>Log Out</button></Link>
                    <h2>Admin Dashboard</h2>
                    <main class="container-fluid">
                    <Link to="/add"><button type="button" class="btn btn-outline-info secondarybutton">Add a Recipe</button></Link>
                    <button type="button" class="btn btn-outline-info secondarybutton" onClick={handleRecipes}>My Recipes</button>
                    
                    <table class="table table-hover">
                    <thead>
                          <tr>
                            <th scope="col">Recipe Name</th>
                            <th scope="col">Ingredients</th>
                            <th scope="col">Instructions</th>
                            <th scope="col">Creator</th>
                            <th scope="col">View</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                            {recipes.map((val)=>{
                                if(val.x_studio_recipe_status == "Active"){
                                    return(
                                        <tr class="table-active" key={val.id}>
                                            <td scope="row">{val.x_name}</td>
                                            <td scope="row">{val.x_studio_ingredients}</td>
                                            <td scope="row">{val.x_studio_instructions}</td>
                                            <td scope="row">{val.x_studio_created_by_1}</td>
                                            <td scope="row"> <button type="button" class="btn btn-info" onClick={() => handleView(val.id)}>View</button></td>
                                            <td scope="row"><button type="button" class="btn btn-success" onClick={() => handleEdit(val.id)}>Edit</button></td>
                                            <td scope="row"><button type="button" class="btn btn-danger" onClick={() => handleDelete(val.id)}>Delete</button></td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
    
                    </main>
                </div>
            )
        }
        else{
            loginid && navigate(generatePath("/home/:loginid", { loginid }));
        }
    }

}

export default Admindb;