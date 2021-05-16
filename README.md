# GRPC-JS-SAMPLE ( TODO )

This sample project demonstrates how grpc js library works to manage todos. There are two parts in this sample project.

## Prerequisite
Have your system ready with installations Node `v14.xx.x` and your favorite text editor ( e.g VsCode )


## Server
Main component of this sample which shows how grpc definition file/ `proto`  file is written. 

To start the server use the command:
```bash
npm run server
```

**NOTE** Server is stared with `nodemon` that inspects `server.js`. Please feel free to modify to test.

## Client
This client is communicated with the server to create todo. 
```
node client.js
```
