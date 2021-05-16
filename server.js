const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObj = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObj.com.src.todo;

const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

server.addService(todoPackage.Todo.service, {
    "create": createTodo,
    "getTodo": readTodo,
    "findAll": findAll,
    "todoStream": todoStream,
});

server.start();
console.log("Server stated and listening on 40000");

const todos = [];

function createTodo(call, callback) {
    var { text } = call.request;
    todos.push({id: todos.length+1, text});
    callback(null, todos[todos.length-1]);
}

function readTodo(call, callback) {
    var { id } = call.request;
    var res = todos.filter( todo => todo.id == id);
    callback(null, res.length>0 ? res[0] : {
        code: 404,
        message: `Item not found with id = ${id}`
    });
}

function findAll(call, callback){
    var items = todos.map(({id, text})=>({id, text}));
    callback(null, {items});
}

function todoStream(call, callback) {
    var batch = 3;
    var cur = 0;
    while(cur<todos.length){
        var n = Math.min(todos.length, cur+batch);
        while(cur<n) {
            call.write(todos[cur++]);
        }
    }
    call.end();
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
