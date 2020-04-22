const http = require('http');
const server =http.createServer();

server.on('request',(req,res)=>{
    res.end('Site Reached');
});

server.listen(3000,()=>console.log('server works'));
