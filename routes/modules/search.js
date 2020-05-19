const express = require('express')
const router = express.Router()
const restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword

  restaurant.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] }) //{$or:[{expression1}, {expression2}, ...]} $or為mongodb的邏輯判斷子, 只要滿足其中一條件即成立。 'i'作為對大小寫不敏感的匹配
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

module.exports = router