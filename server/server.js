const axios = require('axios');
const express = require('express');
const convert = require('./Converter');
const http = require('http');
const socketIO = require('socket.io');
//const todo = require('./public/index.js');
var app=express();
app.use(express.static(__dirname+'/public'));
const port=process.env.PORT || 3000;
//console.log(todo.text);
var server = http.createServer(app);
var io=socketIO(server);
io.on('connection',(socket)=>{
  socket.on('newMessage',(message)=>{
    var url=`http://codeforces.com/api/user.info?handles=${message.text}`
    axios.get(url).then((response)=>
    { var data=response.data
      data.result[0].lastOnlineTimeSeconds=convert.timer(data.result[0].lastOnlineTimeSeconds)
      data.result[0].registrationTimeSeconds=convert.timer(data.result[0].registrationTimeSeconds)
        return Promise.resolve(data)
    }).then((data)=>{
      socket.emit('takeinfo',data)
    }).
    catch((e)=>{
        console.log(`Username doesnot exist ${e}`);
    socket.emit('takeinfo',"User not found")
    })
  });
});


server.listen(port,()=>{
 console.log(`Running on port ${port}`);
})
