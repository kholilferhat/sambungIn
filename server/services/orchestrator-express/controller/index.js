const axios = require('axios')
const Redis = require('ioredis');
const redis = new Redis()

const pgUrl = 'http://localhost:4001/'
const mongoUrl = 'http://localhost:4000/'

class Controllers {
    static async getJobs(req, res) {
        try {
            const checkJobs = await redis.get('jobs:')
            if (checkJobs) {
                return res.json({ jobs: JSON.parse(checkJobs), msg: 'sudah terredis' })
            }
            const { data } = await axios(pgUrl + 'jobs')
            redis.set('jobs:', JSON.stringify(data))
            res.json({ jobs: data, msg: 'belum terredis' })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'internal server error' })
        }
    }

    static async getJobById(req, res) {
        try {
            const id = +req.params.id
            // console.log(id);
            const { data } = await axios(pgUrl + 'jobs/' + id)
            const author = data.mongoAuthor
            const { data: user } = await axios(mongoUrl + 'users/' + author)
            console.log(user);
            res.json({ jobs: data, user })
        } catch (error) {
            console.log(error);

        }
    }

    static async postJob(req, res) {
        try {
            const {title, description, companyId, mongoAuthor, jobType} = req.body
            await axios({
                url: pgUrl + 'jobs',
                method: 'post',
                data: {title, description, companyId, mongoAuthor, jobType}
            } )
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = Controllers