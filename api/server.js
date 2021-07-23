const express=require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const config = {origin: "*"}

const {restricted} = require('../api/auth/auth-middleware')

const authRouter = require('../api/auth/auth-router')
const usersRouter = require('./users/users-router')

const server = express()

server.use(helmet())
server.use(cors(config))
server.use(express.json())
server.use(cookieParser())

server.use('/api/auth',authRouter)
server.use('/api/users',usersRouter,restricted)

module.exports = server
