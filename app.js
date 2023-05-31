
require('dotenv').config();

const express = require('express')

const mongoose = require('mongoose')

const Car = require('./models/cars')

const app = express()

const PORT = 5000 || process.env.prototype

app.use(express.static('public'))

const dbURI = process.env.MONGO_URI

mongoose.connect(dbURI)
	.then((result) => { 
		console.log('connected')
		app.listen(PORT, () => {
			console.log(`App listening on port ${PORT}`)
		})
	})
	.catch((err) => console.log(err))

app.get('/create', (req, res) => {
	const car  = new Car({
		make: "BMW",
		model: "M4",
		transmission: "manual",
		year: "2015",
		cylinders: "6",
		top_speed: 45,
		acceleration: 10,
		origin: "",
		engine_type: "",
		power: 425
	})
})

app.get('/', (req, res) => {
	res.sendFile('./products.html', { root: __dirname})
})

app.get('/about', (req, res) => {
	res.redirect('https://www.google.com')
})

app.use((req, res) => {
	res.status(404).send('404 page not found')
})

