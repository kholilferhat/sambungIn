const axios = require('axios')
const Redis = require('ioredis');
const redis = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    username: "default", // needs Redis >= 6
    password: process.env.REDIS_PASSWORD,
    db: 0, // Defaults to 0
  })

const pgUrl = 'http://localhost:4001/'
const mongoUrl = 'http://localhost:4000/'

class Controllers {
    static async getJobs(req, res) {
        try {
            const checkJobs = await redis.get('app:jobs')
            if (checkJobs) {
                return res.json({ jobs: JSON.parse(checkJobs), msg: 'sudah terredis' })
            }
            const { data } = await axios(pgUrl + 'jobs')
            redis.set('app:jobs', JSON.stringify(data))
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
            if (error.response.status === 404) { return res.status(404).json({ message: error.response.data.message }) }
            res.status(500).json({ message: 'internal server error' })

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
            await redis.del('app:jobs')
            res.status(201).json({message: `${title} posted`})
        } catch (error) {
            console.log(error.response.status);
            if (error.response.status === 400) { return res.status(400).json({ message: error.response.data.message }) }
            else { res.status(500).json({ message: "Internal Server Error" }) }
        }
    }

    static async updateJob(req, res){
        try {
        // let id = +req.params.id
        // console.log(id, '<<<<id');
        // console.log(req.body);
        // const { data } = await axios(pgUrl + 'jobs/' + id)
        const {title, description, companyId, mongoAuthor, jobType} = req.body
        await axios({
            url: pgUrl + 'jobs/' + req.params.id,
            method: 'put',
            data: {title, description, companyId, mongoAuthor, jobType}
        } )
        await redis.del('app:jobs')
        res.status(201).json({ message: "Update job success" })
        } catch (error) {
            console.log(error.response);
            if (error.response.status === 404) { return res.status(404).json({ message: error.response.data.message }) }
            if (error.response.status === 400) { return res.status(400).json({ message: error.response.data.message }) }
            else { res.status(500).json({ message: "Internal Server Error" }) }
        }
    }

    static async deleteJob(req, res){
        try {
            await axios.delete(pgUrl + 'jobs/'+ req.params.id)
            await redis.del('app:jobs')
            res.json({message: 'jobs deleted'})
        } catch (error) {
            console.log(error);
            if (error.response.status === 404) { return res.status(404).json({ message: error.response.data.message }) }
            res.status(500).json({ message: 'internal server error' })
        }
    }

}


module.exports = Controllers