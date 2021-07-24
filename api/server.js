const express=require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const {restricted} = require('../api/auth/auth-middleware')

const authRouter = require('../api/auth/auth-router')
const usersRouter = require('./users/users-router')
const itemsRouter = require('./items/items-router')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())

server.use('/api/auth',authRouter)
server.use('/api/users',usersRouter,restricted)
server.use('/api/items',itemsRouter,restricted)

module.exports = server
