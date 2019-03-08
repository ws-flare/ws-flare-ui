import {gql} from 'apollo-server-express';

export const typeDefs = gql`
    type User {
        userId: String!
        token: String
        username: String
    }
    
    type Project {
        id: String!
        userId: String!
        name: String!
        gitUrl: String!
        user: User!
    }
    
    type Session {
        id: String!
        userId: String!
        projectId: String!
        createdAt: String!
        project: Project!
    }
    
    input Directory {
        id: String!
        name: String!
        path: String!
        isDir: Boolean!
        size: Int!
        ext: String!
        parent: String
    }

    type DirectoryStructure {
        id: String!
        name: String!
        path: String!
        isDir: Boolean!
        size: Int!
        ext: String!
        parent: String
    }
    
    type File {
        sessionId: String!
        path: String!
        file: String!
    }
    
    type TaskLog {
        sessionId: String!
        name: String!
        log: String!
        time: Int!
    }
    
    input TaskLogInput {
        sessionId: String!
        name: String!
        log: String!
        time: Int!
    }
    
    type Mutation {
        signup(username: String! email: String! password: String!): User
    
        login(username: String! password: String!): User
        
        createProject(name: String! gitUrl: String!): Project
        
        createSession(projectId: String!): Session
        
        updateDirectory(sessionId: String! directory: [Directory]!): [DirectoryStructure]!
        
        fetchDirectory(sessionId: String!): Boolean
        
        fetchFile(sessionId: String! path: String!): Boolean
        
        updateFile(sessionId: String! path: String! file: String!): File
        
        e2eDirectoryUpdated(directory: [Directory]!): Boolean
        
        e2eFileUpdated(sessionId: String! path: String! file: String!): Boolean
        
        e2eTailTaskLogUpdated(log: TaskLogInput!): Boolean
    }
    
    type Query {
        user(userId: String!): User
        
        projects: [Project]
        
        sessions(projectId: String!): [Session]
    }
    
    type Subscription {
        directoryUpdated(sessionId: String!): [DirectoryStructure]!
        
        fileUpdated(sessionId: String!): File!
        
        tailTaskLog(sessionId: String!): TaskLog!
    }
`;
