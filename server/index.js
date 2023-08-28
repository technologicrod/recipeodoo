const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
var Odoo = require('odoo-xmlrpc');

app.use(
    cors({
      origin: true,
      credentials: true,
      optionsSuccessStatus: 200
  }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 3001;
//odoo database 15 day trial
//credentials for the odoo app
var odoo = new Odoo({
    url: 'https://for-trial-project.odoo.com',
    port: 443,
    db: 'for-trial-project',
    username: 'matchon.rodwell@gmail.com',
    password: '1Monodoo'
});
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');    
});
/*odoo.connect(function (err) {
    if (err) { return console.log(err); }
    var modelName = 'x_recipes'; // Use the correct model name

    // Search for all records
    var searchParams = [];
    searchParams.push([]);

    odoo.execute_kw(modelName, 'search', [searchParams], function (err, ids) {
        if (err) { return console.log(err); }

        // Read specified fields for the records
        var readParams = [];
        readParams.push(ids);
        readParams.push(['x_name', 'x_studio_ingredients', 'x_studio_instructions', 'x_studio_created_by_1', 'x_studio_recipe_status']); // Replace with the fields you want to fetch

        odoo.execute_kw(modelName, 'read', [readParams], function (err, records) {
            if (err) { return console.log(err); }
            console.log('Result: ', records);
        });
    });
});*/
var uid = 0 //user id
var fn = "" //name
var em = "" //email
var at = "" //account type
//creating new account
app.post('/adduser', async (req, res)  => {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const acctype = req.body.acctype;
    const status = 'Active'
    
    odoo.connect(function (err) {
        if (err) { return console.log(err); }
        var inParams = [];
        inParams.push({'x_name': fullname, 'x_studio_email': email, 'x_studio_password': password, 'x_studio_account_type': acctype, 'x_studio_status': status})
        var params = [];
        params.push(inParams);
        odoo.execute_kw('x_accounts', 'create', params, function (err, value) {
            if (err) { return console.log(err); }
            console.log('Result: ', value);
            res.json(value)
        });
    });
})
//authenticator
app.post('/auth', async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    odoo.connect(function (err) {
        if (err) {
            return console.log(err);
        }

        console.log('Connected to Odoo server.');

        const domain = [
            ['x_studio_email', '=', email],
            ['x_studio_password', '=', pass]
        ];

        const paramsSearch = [
            domain,
            0,  // Offset
            1   // Limit
        ];

        odoo.execute_kw('x_accounts', 'search', [paramsSearch], function (err, value) {
            if (err) {
                return console.log(err);
            }

            if (value.length > 0) {
                const paramsRead = [
                    value, // IDs
                    ['id', 'x_name', 'x_studio_email', 'x_studio_account_type', 'x_studio_status'] // Fields to read
                ];

                odoo.execute_kw('x_accounts', 'read', [paramsRead], function (err2, value2) {
                    if (err2) {
                        return console.log(err2);
                    }
                    console.log('Result: ', value2);
                    uid = value2[0].id
                    fn = value2[0].x_name
                    em = value2[0].x_studio_email
                    at = value2[0].x_studio_account_type
                    res.json(value2);
                });
            } else {
                // No user found with the provided credentials
                res.json(0);
            }
        });
    });
});
//for logout
app.post('/logout', async function (req, res) {
    const loginid = req.body.loginid
    fn = ""
    em = ""
    at = ""
})
//checking account every log in
app.get('/check/:loginid', async function (req, res) {
    const loginid = parseInt(req.params.loginid);

    odoo.connect(function (err) {
        if (err) {
            return console.log(err);
        }

        console.log('Connected to Odoo server.');
        
        var inParams = [];
        inParams.push([['id', '=', loginid]]);
        var params = [];
        params.push(inParams);

        odoo.execute_kw('x_accounts', 'search_read', params, function (err, value) {
            if (err) {
                return console.log(err);
            }
            const result = {
                x_name: value[0].x_name,
                x_studio_email: value[0].x_studio_email,
                x_studio_account_type: value[0].x_studio_account_type,
                x_studio_status: value[0].x_studio_status,
                accounttype: at
            }
            console.log('Result: ', result);
            res.json(result)
        });
    });
});
//geting a recipe for a specific user
app.get('/recipes/:name', (req, res) => {
    const name = req.params.name;
    var inParams = [];
    inParams.push([['x_studio_created_by_1', '=', name]]);
    inParams.push(['x_name', 'x_studio_ingredients', 'x_studio_instructions', 'x_studio_recipe_status']); //fields
    inParams.push(0); //offset
    inParams.push(5); //limit
    var params = [];
    params.push(inParams);
    odoo.execute_kw('x_recipes', 'search_read', params, function (err, value) {
        if (err) { return console.log(err); }
        //console.log('Result: ', value);
        res.json(value)
    });
});
//getting id and name
app.get('/getid', async function (req, res) {
    let data = {id: uid, name: fn}
    res.json(data)
    //console.log(data)
})
//adding new recipe
app.post('/addrecipe', async function (req, res) {
    const name = req.body.name;
    const recipename = req.body.recipename;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    const status = "Active";

    var inParams = [];
    inParams.push({'x_name': recipename, 'x_studio_created_by_1': name, 'x_studio_ingredients': ingredients, 'x_studio_instructions': instructions, 'x_studio_recipe_status': status, })
    var params = [];
    params.push(inParams);
    odoo.execute_kw('x_recipes', 'create', params, function (err, value) {
        if (err) { return console.log(err); }
        console.log('Result: ', value);
    });
})
//view specific recipe
app.get('/viewrecipe/:recipeid', async function (req, res) {
    const recipeid = req.params.recipeid
    var inParams = [];
    inParams.push([['id', '=', recipeid]]);
    inParams.push(['x_name', 'x_studio_created_by_1', 'x_studio_ingredients', 'x_studio_instructions']); //fields
    inParams.push(0); //offset
    inParams.push(5); //limit
    var params = [];
    params.push(inParams);
    odoo.execute_kw('x_recipes', 'search_read', params, function (err, value) {
        if (err) { return console.log(err); }
        console.log('Result: ', value);
        res.json(value)
    });
})
//edit specific recipe
app.put('/editrecipe/:recipeid', async function (req, res) {
    const recipeid = parseInt(req.params.recipeid)
    const recipename = req.body.recipename
    const ingredients = req.body.ingredients
    const instructions = req.body.instructions
    var inParams = [];
    inParams.push([recipeid]); //id to update
    inParams.push({'x_name': recipename, 'x_studio_ingredients': ingredients, 'x_studio_instructions': instructions})
    var params = [];
    params.push(inParams);
    odoo.execute_kw('x_recipes', 'write', params, function (err, value) {
        if (err) { return console.log(err, recipeid); }
        console.log('Result: ', value);
    });
})
//delete recipe but just changing the status of a recipe from "Active" to "Inactive" to avoid deletion of data in the database
app.put('/deleterecipe/:recipeid', async function (req, res) {
    const recipeid = parseInt(req.params.recipeid)
    const status = "Inactive"
    var inParams = [];
    inParams.push([recipeid]); //id to update
    inParams.push({'x_studio_recipe_status': status})
    var params = [];
    params.push(inParams);
    odoo.execute_kw('x_recipes', 'write', params, function (err, value) {
        if (err) { return console.log(err, recipeid); }
        console.log('Result: ', value);
    });
})
//get all recipes for admin dashboard
app.get('/allrecipes', (req, res) => {
    var inParams = [];
    inParams.push([]);
    inParams.push(['x_name', 'x_studio_ingredients', 'x_studio_instructions', 'x_studio_recipe_status', 'x_studio_created_by_1']); // fields
    inParams.push(0); // offset
    var params = [];
    params.push(inParams);
    
    odoo.execute_kw('x_recipes', 'search_read', params, function (err, value) {
        if (err) {
            return console.log(err);
        }
        
        //console.log('Result: ', value);
        res.json(value);
    });
});
//check if user is admin
app.get('/checkadmin', async function (req, res) {
    const result = {
        accounttype: at
    }
    console.log('Result: ', result);
    res.json(result)
});
app.get('/', async function (req, res) {
    let data = {number: 1, name: "hello"}
    res.json(data)
    console.log(data)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });