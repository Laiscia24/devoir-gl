//1 - import express
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./db/db");
const authRoute = require("./routes/authRoute");
const etudiantRoute = require("./routes/etudiantRoute");
const classeRoute = require("./routes/classeRoute");
const utilisateurRoute = require("./routes/utilisateurRoute");
const noteRoute = require("./routes/noteRoute");
const remarqueRoute = require("./routes/remarqueRoute");

dotenv.config();

//2 - use expres
const app = express();


app.use(express.json());
app.use(cors());

db.connect((error)=>{
  if(error){
    console.log(error);
  }else{
    console.log("Connexion MySQL reussie !!!")
  }});

app.use("/",authRoute);
app.use("/", etudiantRoute);
app.use("/", classeRoute);
app.use("/", utilisateurRoute);
app.use("/", noteRoute);
app.use("/", remarqueRoute);


//3 - create server Port

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Connect to ${PORT}`);
});
