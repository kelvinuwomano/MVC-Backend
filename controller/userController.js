const userModel = require("../model/userModel");
const bcrypt = require("bcrypt")



const getAllUser = async (req, res) => {
    try {
        const allUser = await userModel.find();
        return res.status(201).json({data: allUser})
    } catch (error) {
      return res.status(500).json({ message: "An error occured", error})  
    }
};

const getOneUser = async (req, res) => {
    try {
        const oneUser = await userModel.findById(req.params.id)
        if (!oneUser) {
            return res.status(404).json({message: " User not found"})
        }
        return res.status(200).json({data: oneUser})
    } catch (error) {
        return res.status(500).json({ message: "An error occured", error})  
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const ifUserAlreadyExist = await userModel.findOne({ email });

        if (ifUserAlreadyExist) {
            return res.status(401).json({message: "User already"})
        }
        const createTheUser = await userModel.create({
            name,
            email,
            password: hashPassword,
        });
        return res.status(201).json({message: "User created", data: createTheUser});
    } catch (error) {
        res.status(500).json({message: "An error occured", error: error.message});
    }
}

module.exports = { getAllUser , getOneUser, createUser};