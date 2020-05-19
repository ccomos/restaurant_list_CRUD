//require packages used in project
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//require express-handlebars here
const exphbs = require('express-handlebars')
const restaurant = require('./models/restaurant') //填寫路徑載入檔案

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//connect with mongodb
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(bodyParser.urlencoded({ extended: true }))

// setting static files
app.use(express.static('public'))

//routes setting
app.get('/', (req, res) => {
  //res.render('index', { restaurant: restaurantList.results })
  restaurant.find() //取出 model裡的資料
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/', (req, res) => {
  //console.log(req.body)
  const sortBy = req.body.sortBy
  restaurant.find()
    .lean()
    .sort(sortBy)
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

//route setting for show detail page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//route setting for creat page
app.get('/new', (req, res) => {
  res.render('new')
})

//post route setting for receiving the data from creat page
app.post('/new', (req, res) => {
  const newRestaurant = req.body
  //console.log(newRestaurant)
  return restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//route setting for edit page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const editInfo = req.body
  return restaurant.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, editInfo) //Object.assign(target, sources) 複製Sources所有的屬性至目標 target物件
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword

  restaurant.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] }) //{$or:[{expression1}, {expression2}, ...]} $or為mongodb的邏輯判斷子, 只要滿足其中一條件即成立。 'i'作為對大小寫不敏感的匹配
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})


//start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})