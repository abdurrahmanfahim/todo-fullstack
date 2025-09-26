const router = require('express').Router()

router.get('/', (request, response) => {
  console.log('first')
  response.send({hello: 'hello devs'})
})
















module.exports = router