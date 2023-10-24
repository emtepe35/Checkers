// install express with `npm install express` 
const express = require('express')
const app = express()

var path = require("path")
var fs = require("fs");

app.use(express.static('static'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname + "/static/index.html")))


// export 'app'
module.exports = app