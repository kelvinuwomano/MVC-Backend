const mongoose = require("mongoose");
require("dotenv/config")

const { MONGO_DB_URL } =process.env;

const database = async () => {
    try {
        await mongoose.connect(MONGO_DB_URL)
        console.log("Connected db")
    } catch (error) {
        console.log("An error occured while connnected", error)
    }
}

module.exports = database;