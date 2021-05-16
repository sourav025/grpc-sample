const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');


const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObj = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObj.com.src.todo;

const client = new todoPackage.Todo("localhost:40000", 
grpc.credentials.createInsecure());

const todoText = process.argv[2];

client.create({
    id: -1,
    text: todoText
}, (err, res) => {
    if(err) {
        console.log('Error Occured!!!', err);
        return;
    }
    console.log("Craeted in server", JSON.stringify(res));
});

client.getTodo({id: 2}, (err, res) => {
    if(err) {
        console.log('This is an error', err);
        return;
    }
    console.log("Found in server", JSON.stringify(res));
});

// client.findAll(null, (err, res) => {
//     if(err) {
//         console.log("Resulted error");
//         return;
//     }
//     console.log("Findall -> "+ JSON.stringify(res));
//     // res.for(r => console.log(JSON.stringify(r)));
// });

const stream = client.todoStream();
stream.on("data", item => {
    console.log(item);
});
stream.on("end", (e)=> {
    console.log("Server Send done.");
});
