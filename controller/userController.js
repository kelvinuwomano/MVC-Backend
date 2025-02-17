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
};

const updateUser = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        const update = await userModel.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password,
        },
        { new: true}
    );
    res.status(200).json({message: "User updated successfully", data: update});
    } catch (error) {
        res.status(500).json({message: "Unable to update ", error: error.message});
    }
};

const deleteOne = async (req, res) => {
    try {
        const deleteUser = await userModel.findByIdAndDelete(req.params.id);

        if (!deleteUser) {
            res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted", user: deleteUser});
    } catch (error) {
        res.status(500).json({message: "Unable to delete user", error: error.message});

    }
};

const login = async (req, res) => {
    try {
        const { email} = req.body;

        const loginEndpoint = await userModel.findOne({email})

        if (!loginEndpoint) {
            res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({ name: loginEndpoint.name, email: loginEndpoint.email, password: loginEndpoint.password, id: loginEndpoint._id});
    } catch (error) {
        res.status(500).json({message: "An error occured", error: error.message});
    }
};

module.exports = { getAllUser , getOneUser, createUser, updateUser, deleteOne, login};