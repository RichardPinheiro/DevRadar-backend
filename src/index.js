'use strict'
const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose')
const http = require('http')
const routes = require("./routes/routes")
const { setupWebSocket } = require('./websocket')

const app = express()
const server = http.Server(app)

setupWebSocket(server)

mongoose.connect("mongodb://localhost:27017,localhost:27018/omniStack?replicaSet=rs0", { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())
app.use('/api', routes)

server.listen(3333)
