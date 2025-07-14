const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const NEWS_API_KEY = process.env.NEWS_API_KEY || '9108cf15ac524d778f909aadfdd3e0dd';

app.get("/api/worldNews", async (req,res) => {
    try{
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
            params:{
                category:'general',
                language: 'en',
                pageSize: 6,
                apiKey:NEWS_API_KEY,
            }
        });

        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "Failed to fetch news"});
    }
});


app.listen(PORT, ()=> {
    console.log(`Backend running on localhost ${PORT}`);
})