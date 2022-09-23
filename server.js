// this is my server file
const express=require('express'); // the express func to start server

// object to specify server actions
const app=express();

const http=require('http'); // package available in node by default

const server=http.createServer(app); // server object

const cors = require('cors');
const io=require('socket.io')(server,{cors:{
    origin:'*',  // allow access from anywhere , * just like regex
    methods:["GET","POST"]

}});

app.use(cors()); // .use simply does this whenver that page is accessed

const PORT=process.env.PORT|| 5000;

app.get('/',function(req,res){
    res.send('Server is UP!');
});

io.on('connection',function(socket){
    socket.emit('me',socket.id);  // the unique 20 character ID for each user 

    socket.on('disconnect',function(){
        socket.broadcast.emit("CallEnded!");
    });

    socket.on("Calling",function({ToCall,signalstuff,from,name}){

        // emitting the details to the corresponding client (basically telling that someone is calling)
        io.to(ToCall).emit("Calling",{signal:signalstuff,from,name});

    });

    socket.on("CallAnswer",function({signal,to,AccepterName}){
        // telling the the 1st client that 2nd client has accepted the call and providing the 1st client with details
        io.to(to).emit("Accepted",{signal,AccepterName});
    });

    socket.on('Chat',function({idToSend,SenderName,msg}){
        // sending private chat msg to specific socket id 
        io.to(idToSend).emit("Chat",{SenderName,msg});
    })

});

server.listen(PORT,function(){
    console.log(`I am at port ${PORT}`);
})

