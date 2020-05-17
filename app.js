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
  const restaurant = restaurantList.results.filter(rst => {
    if (rst.name.toLowerCase().includes(keyword.toLowerCase())) {
      return rst.name
    } else if (rst.category.includes(keyword)) {
      return rst.category
    }
    //return rst.name.toLowerCase().includes(keyword.toLowerCase())
  })

  res.render('index', { restaurant: restaurant, keyword: keyword })
})


//start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})