const express = require('express');
const server = express();
// Configure your server here
server.use(express.json());

// Build your actions router in /api/actions/actions-router.js
// const actionsRouter = require('./actions/actions-router')
// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require('./projects/projects-router')

// server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);


server.use('/api/ja', (req, res) => {
    res.json({
        message:'wazzzz'
    })
})

// Do NOT `server.listen()` inside this file!

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: 'Something went wrong'
    })
})

// server.use('*',(req,res) => {                
//     res.send('<h1>API is working! But page not found!</h1>')
// })

module.exports = server;
