const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const rakeRouter = require('./router/rake_analysis_router')
const mongoose = require('mongoose')

const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/rake_analysis_db', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', function() {
  console.log('database connected!');
});

app.use('/api', rakeRouter)

app.listen(apiPort, '0.0.0.0', () => console.log(`API Server running on port ${apiPort}`))
