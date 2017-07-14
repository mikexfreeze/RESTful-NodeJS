import http from 'http'
import { env, mongo, port, ip } from './config'
import mongoose from './services/mongoose'
// import mongoose from 'mongoose'

import express from './services/express'
import api from './api'

const app = express(api)
const server = http.createServer(app)

mongoose.connect(mongo.uri)
// mongoose.connect("mongodb://127.0.0.1:27017/res-tful-node-js-dev")

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
