
// The ApolloServer constructor requires two parameters: your schema

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs as jobSchema, resolvers as jobResolver } from "./schemes/jobSchema.js";
import { typeDefs as userSchema, resolvers as userResolver } from "./schemes/userSchema.js";




// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs: [jobSchema, userSchema],
    resolvers: [jobResolver, userResolver],
    introspection:
    //diri
     true
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

// console.log(jobSchema);
// console.log(jobResolver);
