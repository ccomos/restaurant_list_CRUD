//require packages used in project
const express = require('express')
const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const restaurant = require('./models/restaurant')
const routes = require('./routes')
require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public')) // setting static files
app.use(routes) //express router is default to find index.js

//start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})