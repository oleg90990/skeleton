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

io.on('connection', (socket) => {
  socket.on('emit', (data) => {
    socket.broadcast.emit('emit', data)
  });

  socket.on('init', (data) => {
    socket.broadcast.emit('init', data)
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit('disconectitem', socket.id)
  });
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
