const express = require('express');
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const port = process.env.PORT 

app.get('/', (req, res) => {
    console.log("Server runnig fine");
    res.send("Server running Fine at homepage");
})

app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`);
})