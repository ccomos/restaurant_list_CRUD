// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入 home, new, restaurants, seach 模組程式碼
const home = require('./modules/home')
const newCreat = require('./modules/new')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')


// 將網址結構符合 各自路徑 的 request 導向對應的模組 
router.use('/new', authenticator, newCreat)
router.use('/restaurants', authenticator, restaurants)
router.use('/search', authenticator, search)
router.use('/users', users)
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router