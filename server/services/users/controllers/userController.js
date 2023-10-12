
class UserController {
    static async getUser(req, res) {
        try {
            res.send('halo user')
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserController