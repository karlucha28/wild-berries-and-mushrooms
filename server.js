import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const location = 'LOCATION';
const API_URL = `https://api.open-meteo.com/weather?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max&hourly=temperature_2m_1h`;

// const apiKey = 'YOUR_API_KEY';



// const config = {
//     headers: {
//       'Authorization': `Bearer ${apiKey}`,
//     },
//   }
  

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Waiting for data..." });
  });

app.post("/", async (req, res) => {
    // const searchId = req.body.id;
    try {
      const result = await axios.get(API_URL);
      res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
      res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
  });





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
