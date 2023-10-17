import axios from 'axios'
import Redis from 'ioredis'
const redis = new Redis({
    port: 16837, // Redis port
    host: "redis-16837.c299.asia-northeast1-1.gce.cloud.redislabs.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "ktZDmEO7qOv8ncb32RTSiKlHB3yAg8Xm",
  })

const userUrl = 'http://localhost:4002/'
// const userUrl = 'http://service-user:8002/'

export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    _id: String
    username: String
    email: String
    password: String
    role: String
    phoneNumber: Int
    address: String
  }

  type CreateSuccessResponse {
    message: String
  }

  type DeleteSuccessResponse {
    message: String
  }

  input newUser{
    username: String
    email: String
    password: String
    role: String
    phoneNumber: Int
    address: String
}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
    userDetail(_id: String!): User
  }


  type Mutation{
    createUser(inputUser: newUser): CreateSuccessResponse
    deleteUser(_id: String!): DeleteSuccessResponse
  }

`;


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
    Query: {
        users: async () => {
            try {
                const checkUser = await redis.get('app:users')
                if (checkUser) {
                    return JSON.parse(checkUser)
                }
                const { data } = await axios(userUrl + 'users')
                redis.set('app:users', JSON.stringify(data))
                return data
            } catch (error) {
                throw error
            }
        },
        userDetail: async (_, args) => {
            try {
                const { _id } = args
                const { data } = await axios(userUrl + 'users/' + _id)
                return data
            } catch (error) {
                throw error
            }
        }
    },
    Mutation: {
        createUser: async (_, args) => {
            try {
                await axios({
                    url: userUrl + 'users',
                    method: 'POST',
                    data: args.inputUser,
                })
                await redis.del('app:users')
                return { message: 'user created' }
            } catch (error) {
                throw error
            }
        },
        deleteUser: async (_, args) => {
            try {
                const { _id } = args
                await axios({
                    url: userUrl + 'users/' + _id,
                    method: 'DELETE',
                })
                await redis.del('app:users')
                return { message: 'user deleted' }
            } catch (error) {
                throw error
            }
        }
    }
};

