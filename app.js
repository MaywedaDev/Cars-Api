
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
		price: 65125,
		transmission: "manual",
		year: "2015",
		cylinders: "6",
		top_speed: 155,
		acceleration: 4.2,
		origin: "Germany",
		engine_type: "Twin-turbocharged V6",
		power: 425,
		image: "https://hips.hearstapps.com/hmg-prod/images/bmw-1669908626.jpeg?crop=0.585xw:0.878xh;0.275xw,0.112xh&resize=480:*"
	})

	car.save().then((data) => {
		res.send(data)
	}).catch((err) => {
		console.log(err)
	})
})

app.get('/', (req, res) => {
	res.sendFile('./products.html', { root: __dirname})
})

app.get('/about', (req, res) => {
	res.redirect('https://www.google.com')
})

app.get('/cars', (req, res) => {
	Car.find().then((data) => {
		res.send(data)
	}).catch((err) => {
		console.log(err)
	})
})

app.use((req, res) => {
	res.status(404).send('404 page not found')
})

