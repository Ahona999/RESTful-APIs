const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));//Parsing Patch Post data or else data cannot be shown
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'Pluto@2013'
  });

  let getRandomUser = () =>{
    return [
      faker.datatype.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
  };

  let data = [];//Values will be filled in q = query


  //Home page route
    app.get("/", (req,res) => {
      let q = "SELECT count(*) FROM user";
      try {
        connection.query(q, (err,result)=>{
              if (err) throw err;
              let count = (result[0]["count(*)"]);
              res.render("home.ejs", {count});
          });
        } catch (err) {
              console.log(err);
              res.send("some error in DB");
        };
    });



    //Show users route page
    app.get("/user", (req,res) => {
      let q = "SELECT * FROM user";

      try {
        connection.query(q, (err,users)=>{
            if (err) throw err;
            res.render("showusers.ejs", {users});
        });
        } catch (err) {
              console.log(err);
              res.send("some error in DB");
        };
    });
   

    //Edit route page
    app.get("/user/:id/edit", (req,res) => {
      let {id} = req.params;
      let q = `SELECT * FROM USER WHERE id ='${id}' `;
      try {
        connection.query(q, (err,result)=>{
            if (err) throw err;
            let user = result[0];//this user has pw, uname, id
            res.render("edit.ejs", {user});
        });
        } catch (err) {
              console.log(err);
              res.send("some error in DB");
        };
    });

    //Update in the Database(DB)Route
    app.patch("/user/:id", (req, res) => {
      let {id} = req.params;//form id
      let {password: formPass, username: newUsername} = req.body//actions takig place in form
      let q = `SELECT * FROM USER WHERE id ='${id}' `;//db id and getting of user from DB

      try {
        connection.query(q, (err,result)=>{
            if (err) throw err;
            let user = result[0];//we get the specific user
            if (formPass != user.password){
              res.send("Wrong Password Sent");
            } 
              else {
              let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;//add quotes cz SQL wont add quotes
              connection.query(q2, (err,result)=>{//update query is being sent
              if (err) throw err;
              res.send(result);
            });
           }
        });
        } catch (err) {
              console.log(err);
              res.send("some error in DB");
        }
    });

    app.listen("3000", () => {
     console.log("server is listening on port number 3000");
    });


  