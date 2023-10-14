const UserModel = require("../models/user");

class UserController {
    static async createUSer(req, res) {
        try {
            const {email, password} = req.body
            if(!email){return res.status(400).json({message: 'email is required'})}
            if(!password){return res.status(400).json({message: 'password is required'})}
            const newUser = await UserModel.insertOne(req.body)
            res.status(201).json(newUser)
        } catch (error) {
            console.log(error);
            if (error.name === 'validationError') return res.status(400).json(error.message)
            else {
                res.status(500).json('internal server error')
            }
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await UserModel.getUsers()
            res.json(users)
        } catch (error) {
            console.log(error);
            res.status(500).json('internal server error')
        }
    }

    static async getUserById(req, res) {
        try {
            const id = req.params.id
            const user = await UserModel.getUser(id)
            if(!user) {return res.status(404).json({message: 'user not found'})}
            res.json(user)
        } catch (error) {
            console.log(error);
            res.status(500).json('internal server error')
        }
    }

    static async deleteUser(req, res) {
        try {
            const id = req.params.id
            const user = await UserModel.destroy(id)
            res.json(user)
        } catch (error) {
            console.log(error);
            if (error.name === 'NotFound') return res.status(404).json(error.message)
            else {
                res.status(500).json('internal server error')
            }
        }
    }
}

module.exports = UserController