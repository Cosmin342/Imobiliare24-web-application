# Imobiliare24

# Description

A web application that offers possibility to user to add announcements
for different buildings. The project uses a postgres database, .NET for
its server and React library for its graphic interface.

An user can login with an existent account or create a new one, with role of
personnel or client. There is also an admin role that offers access to
every page from the website.

Every user can see details about announcements and follow them to get
notifications when one of them is updated by an administrator or its owner.

Users with 'personnel' role can post announcements and do different operations
on them after creation (updating, disabling, deleting etc.).

Users that are administrators can also do allowed operations for users with
'personnel' role, but they can also modify announcements that are not created
by themselves. Besides, they can send custom notifications to all users that
are following an announcement.

# Requirements

For database, you need to install docker and docker-compose. After these tools
are installed, you can use following command into `\server\Deployment` folder
to create the database:

```
docker-compose -f .\docker-compose.yml -p mobylab-app-db up -d
```

To build and start the server, you should install dotnet sdk.

On client side, NodeJS is needed to be installed on your machine to be able to
install dependencies of the project using `npm install` command into
`\client` folder.

# Run

For database, you will start its container from Docker Desktop app, if it is
not running.

Server should be started using following command into folder
`\server\MobyLabWebProgramming.Backend`:
```
dotnet run
```

And, for client part, you should use following command into `\client` folder:

```
npm start
```