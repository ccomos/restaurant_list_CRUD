const express = require('express')
const router = express.Router()
const restaurant = require('../../models/restaurant')

//route setting for creat page
router.get('/', (req, res) => {
  res.render('new')
})

//post route setting for receiving the data from creat page
router.post('/', (req, res) => {
  const newRestaurant = req.body
  newRestaurant.userId = req.user._id
  //console.log(newRestaurant)
  return restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router