import axios from "axios";
import Redis from 'ioredis'
const redis = new Redis({
    port: 16837, // Redis port
    host: "redis-16837.c299.asia-northeast1-1.gce.cloud.redislabs.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "ktZDmEO7qOv8ncb32RTSiKlHB3yAg8Xm",
  })
const baseUrl = 'http://service-app:4001'
// const baseUrl = 'http://localhost:4001'
// const baseUrl = 'http://service-app:8001'


export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Job {
    id: ID
    title: String
    description: String
    companyId: Int
    jobType: String
    mongoAuthor: String
    Company: Company
    Skills: [Skill]
  }

  type Company {
    name: String
    companyLogo: String
    email: String
  }

  type Skill {
    name: String
    level: String
  }

  type CreateSuccessResponse{
    message: String
  }

  type UpdateSuccessResponse {
  message: String
  }

  type DeleteSuccessResponse{
    message: String
  }

  input newJob {
    title: String
    description: String
    companyId: Int
    jobType: String
    mongoAuthor: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    jobs: [Job]
    jobDetail(id: ID!): Job

  },
  type Mutation {
    createJob(inputJob: newJob): CreateSuccessResponse
    updateJob(id: ID!, inputJob: newJob): UpdateSuccessResponse
    deleteJob(id: ID!): DeleteSuccessResponse
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
    Query: {
        jobs: async () => {
            try {
                const checkJobs = await redis.get('app:jobs')
                if (checkJobs) {
                    // console.log('dari redis');
                    return JSON.parse(checkJobs)
                }
                const { data } = await axios(baseUrl + '/jobs')
                await redis.set('app:jobs', JSON.stringify(data))
                // console.log('bukan dari redis');
                return data
            } catch (error) {
                throw error
            }
        },
        jobDetail: async (_, args) => {
            try {
                const { id } = args
                const { data } = await axios(baseUrl + '/jobs/' + id)
                return data
            } catch (error) {
                throw error
            }
        }
    },
    Mutation: {
        createJob: async (_, args) => {
            try {
                await axios({
                    url: baseUrl + '/jobs',
                    method: 'POST',
                    data: args.inputJob,
                })
                await redis.del('app:jobs')
                return { message: 'job created' }
            } catch (error) {
                throw error
            }
        },
        updateJob: async (_, args) => {
            try {
                const { id, inputJob } = args;
                await axios({
                    url: baseUrl + '/jobs/' + id,
                    method: 'PUT',
                    data: inputJob,
                });
                await redis.del('app:jobs');
                return { message: 'job updated' };
            } catch (error) {
                throw error;
            }
        },
        deleteJob: async (_, args) => {
            try {
                const { id } = args
                await axios({
                    url: baseUrl + '/jobs/' + id,
                    method: 'DELETE',
                })
                await redis.del('app:jobs')
                return { message: 'job deleted' }
            } catch (error) {
                throw error
            }
        }
    }
};

