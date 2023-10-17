import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs as jobSchema, resolvers as jobResolver } from "./schemes/jobSchema.js";
import { typeDefs as userSchema, resolvers as userResolver } from "./schemes/userSchema.js";




const server = new ApolloServer({
    typeDefs: [jobSchema, userSchema],
    resolvers: [jobResolver, userResolver],
    introspection:
    //diri
     true
});


const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
});

// console.log(`🚀  Server ready at: ${url}`);
console.log(`🚀  Server ready at: ${url}`);

