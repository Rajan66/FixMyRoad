const express = require("express");
const app = express();
require("dotenv").config();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connection } = require("./config/dbconnection");

const routes = require("./routes/route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors());
app.options("*", cors());

// --- db connection here ---
connection();

const apiPrefix = "/api";

// --- routes go here ----
app.use(apiPrefix, routes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});
