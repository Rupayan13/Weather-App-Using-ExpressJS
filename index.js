import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.render(__dirname+"/view/index.ejs");
});

app.post("/", async (req, res)=>{
    let city=req.body["city"];
    const apiKey ="5832ac54af65fb4f7939307540871a46";
    const unit = "metric";
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" +apiKey+ "&units="+unit;
    try {
    const response = await axios.get(url);
    const result = response.data;
        res.render(__dirname+"/view/index.ejs", { content: result });
      } catch (error) {
        // res.status(404).send(error.message);
        res.render(__dirname+"/view/index.ejs", { error: "Enter a valid data" });
      }
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});