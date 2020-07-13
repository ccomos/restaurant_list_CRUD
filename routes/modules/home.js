// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入model database
const restaurant = require('../../models/restaurant')

// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  //res.render('index', { restaurant: restaurantList.results })
  restaurant.find({ userId: userId }) //取出 model裡的資料
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  //console.log(req.body)
  const userId = req.user._id
  const sortBy = req.body.sortBy
  restaurant.find({ userId: userId })
    .lean()
    .sort(sortBy)
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router