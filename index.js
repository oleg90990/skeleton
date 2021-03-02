const app = require('express')()
const express = require('express')
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

app.use("/css", express.static(path.join(__dirname, 'game/dist/css')))
app.use("/js", express.static(path.join(__dirname, 'game/dist/js')))
app.use("/img", express.static(path.join(__dirname, 'game/dist/img')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/game/dist/index.html')
})

const users = {};

io.on('connection', (socket) => {
  socket.on('emit', (data) => {
    users[data.id] = data
    socket.broadcast.emit('emit', data)
  });

  socket.on('init', (data) => {
    users[data.id] = data
    socket.emit('init', users)
  });

  socket.on("disconnect", () => {
    delete users[socket.id]
    socket.emit('disconectitem', socket.id)
  });
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
