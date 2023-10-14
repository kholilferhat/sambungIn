import axios from "axios";
import Redis from 'ioredis'
const redis = new Redis()
const baseUrl = 'http://localhost:4001'

export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Job {
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
                    return JSON.parse(checkJobs)
                }
                const { data } = await axios(baseUrl + '/jobs')
                redis.set('app:jobs', JSON.stringify(data))
                return data
            } catch (error) {
                throw error
            }
        },
        jobDetail: async (_, args) => {
            try {
                const { id } = args
                // console.log(id, '<<apollo');
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
                // console.log(args);
                await axios({
                    url: baseUrl + '/jobs',
                    method: 'POST',
                    data: args.inputJob,
                })
                await redis.del('app:jobs')
                return { message: 'job created' }
                // const {data}
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
                // console.log(args);
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

