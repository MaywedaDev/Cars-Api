
require('dotenv').config();

const express = require('express')

const mongoose = require('mongoose')

const cors = require('cors')

const Car = require('./models/cars')

const app = express()

const PORT = 5000 || process.env.prototype

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const dbURI = process.env.MONGO_URI

mongoose.connect(dbURI)
	.then((result) => { 
		console.log('connected')
		app.listen(PORT, () => {
			console.log(`App listening on port ${PORT}`)
		})
	})
	.catch((err) => console.log(err))

app.post('/create', (req, res) => {
	const car = new Car(req.body)
	console.log(req.body)
	car.save().then((data) => {
		res.send(data)
	}).catch((err) => {
		console.log(err)
		res.status(400).send(err)
	})
})

app.get('/', (req, res) => {
	res.sendFile('./create.html', { root: __dirname})
})

// app.get('/about', (req, res) => {
// 	res.redirect('https://www.google.com')
// })

app.get('/cars', (req, res) => {
	Car.find().then((data) => {
		res.send(data)
	}).catch((err) => {
		console.log(err)
		res.status(500).send("Network or server Error")
	})
})

app.get('/cars/:id', (req, res) => {
	const id = req.params.id
	console.log(id)
	Car.findById(id).then((data) => {
		res.send(data)
	}).catch((err) => {
		console.log(err)
		res.status(404).send(err)
	})
})

app.delete('/cars/:id', (req, res) => {
	const id = req.params.id
	console.log(id)
	Car.findByIdAndDelete(id).then((data) => {
		res.send(data)
	}).catch((err) => {
		console.log(err)
		res.status(404).send(err)
	})
})

app.use((req, res) => {
	res.status(404).send('404 page not found')
})

