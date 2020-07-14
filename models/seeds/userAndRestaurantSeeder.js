const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantSeeder = require('./restaurant.json')
const db = require('../../config/mongoose')

const SEED_USER1 = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}
const SEED_USER2 = {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}
const restaurants1 = restaurantSeeder.results.slice(0, 3)
const restaurants2 = restaurantSeeder.results.slice(3, 6)

const createPromise = (user, restaurants) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const promises = restaurants.map(restaurant => {
          restaurant.userId = user._id
          return Restaurant.create(restaurant)
        })
        resolve(promises)
      })
      .catch(error => reject(error))
  })
}

Promise.all([createPromise(SEED_USER1, restaurants1), createPromise(SEED_USER2, restaurants2)])
  .then(promiseArrays => {
    const array = [...promiseArrays[0], ...promiseArrays[1]]
    return Promise.all(array)
  })
  .then(() => {
    console.log('done')
    process.exit()
  })
  .catch(error => console.error(error))
