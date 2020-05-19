const db = require('../../config/mongoose')
const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantSeeder = require('./restaurant.json')

db.once('open', () => {
  Restaurant.create(Object.assign(restaurantSeeder.results, restaurantSeeder))
  console.log('restaurant seeder imported!')
})