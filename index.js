const fs = require('fs');
const app = require('express')()
const express = require('express')
const http = require('http').createServer(app)
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const mapPositions = JSON.parse(fs.readFileSync('mapPositions.json'));
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
  socket.on('initPlayer', (data) => {
    socket.broadcast.emit('initPlayer', data)
  });

  socket.on('updatePlayer', (data) => {
    socket.broadcast.emit('updatePlayer', data)
  });

  socket.on('attackPlayer', (data) => {
    socket.broadcast.emit('attackPlayer', data)
  });

  socket.on('initbonuses', (data) => {
    socket.broadcast.emit('initbonuses', data)
  });

  socket.on('removebonus', (data) => {
    io.sockets.emit('removebonus', data)
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit('disconectitem', socket.id)
  });
})

setInterval(function (argument) {
  const pos = mapPositions[Math.floor(Math.random() * mapPositions.length)];

  io.sockets.emit('bonus', {
    id: uuidv4(),
    x: pos.x,
    y: pos.y,
    model: 'Heart',
    value: 100
  })
}, 2000)

http.listen(3000, () => {
  console.log('listening on *:3000')
})



