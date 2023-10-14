const { ObjectId } = require('mongodb')
const { getDB } = require('../config/config')
const { hashPass } = require('../helpers/bcrypt')


class UserModel {
    static async insertOne({ username, email, password, role, phoneNumber, address }) {
        try {
            if (!email) throw { name: 'validationError', message: 'email is required' }
            if (!password) throw { name: 'validationError', message: 'password is required' }
            // console.log(email, password);
            const database = getDB()
            const hashedPass = hashPass(password)
            const users = database.collection('users')
            const newUser = await users.insertOne({ username, email, password: hashedPass, role, phoneNumber, address })
            return newUser
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    static async getUsers() {
        try {
            const database = getDB()
            const dbUser = database.collection('users')
            const users = await dbUser.find().toArray()
            return users
        } catch (error) {
            throw error
        }
    }
    static async getUser(id) {
        try {
            console.log(id);
            const database = getDB()
            const dbUser = database.collection('users')
            const users = await dbUser.findOne({_id: new ObjectId(id)})
            return users
        } catch (error) {
            throw error
        }
    }


    static async destroy(id){
        try {
            const database = getDB()
            const users = database.collection('users')
            const user = await users.findOne({_id: new ObjectId(id)})
            if(!user) return {name:'NotFound', message: 'user not found'}
            await users.deleteOne({_id: new ObjectId(id)})
            return 'user deleted'
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserModel