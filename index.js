const fs = require('fs');
const app = require('express')()
const express = require('express')
const http = require('http').createServer(app)
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

var timeBonus = 10000;
var mapPositions = fs.readFileSync('mapPositions.json');
mapPositions = JSON.parse(mapPositions);

var newBonus = {
  id: '',
  x: 0,
  y: 0,
  model: 'Heart',
  value: 30
};

setInterval(function (argument) {
  const pos = randomPosition()  
  newBonus = {
    id: uuidv4(),
    x: pos.x,
    y: pos.y,
    model: 'Heart',
    value: 30
  }
}, timeBonus)

function randomPosition() {
  return mapPositions[Math.floor(Math.random() * mapPositions.length)];
}

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

  socket.on('initbonuses', (data) => {
    socket.broadcast.emit('initbonuses', data)
  });

  socket.on('removebonus', (data) => {
    io.sockets.emit('removebonus', data)
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit('disconectitem', socket.id)
  });

  setInterval(function (argument) {
    socket.emit('bonus', newBonus)
  }, timeBonus)
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
