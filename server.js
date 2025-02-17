const express = require("express");
const database = require("./config/db");
const userRouter = require("./routes/userRoutes");
require("dotenv/config");


const { PORT } = process.env;

console.log(PORT);


const port = PORT;
database();
const app = express();
app.use(express.json());
app.use("/api", userRouter);

app.listen(port, () => {
    console.log(new Date().toLocaleDateString(), port);
});