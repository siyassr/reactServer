const express = require('express');
const connectionDB = require("./config/dbConnection")
const cors = require('cors');
const router = require('./route/route');
const cookieParser = require('cookie-parser');
const http = require('http');
require('dotenv').config();

const app = express();

const server = http.createServer(app);


const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE', 
  credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

connectionDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is ru port ${PORT}`);
});
