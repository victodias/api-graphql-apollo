import { ApolloServer, gql } from 'apollo-server'
import { randomUUID } from 'node:crypto'

/**
 * Under fetchin
 * Rota HTTP que retorna poucos dados
 * 
 * Over fetching
 * Rota HTTP retorna dados demais
 */

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!): User!
  }
`

interface User {
  id: string
  name: string
}

const users: User[] = []

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => {
        return users
      },
    },
    Mutation: {
      createUser: (_parent, args, _ctx) => {
        const user = {
          id: randomUUID(),
          name: args.name,
        }

        users.push(user)

        return user
      },
    },
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀 HTTP server running on ${url}`)
})
