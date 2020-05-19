const express = require('express')
const router = express.Router()
const restaurant = require('../../models/restaurant')

//route setting for show detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//route setting to edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//route setting to edit detail
router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router