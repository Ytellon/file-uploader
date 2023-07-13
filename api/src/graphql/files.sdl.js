export const schema = gql`
  type File {
    id: Int!
    title: String!
    url: String!
  }

  type Query {
    files: [File!]! @requireAuth
    file(id: Int!): File @requireAuth
  }

  input CreateFileInput {
    title: String!
    url: String!
  }

  input UpdateFileInput {
    title: String
    url: String
  }

  type Mutation {
    createFile(input: CreateFileInput!): File! @requireAuth
    updateFile(id: Int!, input: UpdateFileInput!): File! @requireAuth
    deleteFile(id: Int!): File! @requireAuth
  }
`
