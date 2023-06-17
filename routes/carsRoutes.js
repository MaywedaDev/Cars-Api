const express = require('express')

const router = express.Router()


const Car = require('../models/cars')


router.get('/', (req, res) => {

	Car.find().then((data) => {
		res.send(data)
	}).catch((err) => {
		console.log(err)
		res.status(500).send("Network or server Error")
	})
})

router.get('/:id', (req, res) => {
	const id = req.params.id
	console.log(id)

	Car.findById(id).then((data) => {
		res.send(data)
	}).catch((err) => {
		console.log(err)
		res.status(404).send(err)
	})
})

router.delete('/:id', (req, res) => {
	const id = req.params.id
	console.log(id)

	Car.findByIdAndDelete(id).then((data) => {
		res.send(data)
	}).catch((err) => {
		console.log(err)
		res.status(404).send(err)
	})
})

module.exports = router;