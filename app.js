
require('dotenv').config();

const express = require('express')

const mongoose = require('mongoose')

const cors = require('cors')

const Car = require('./models/cars')

const carRoutes = require('./routes/carsRoutes')

const userRoutes = require('./routes/userRoutes')

const app = express()

const PORT = 5000 || process.env.prototype



app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

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
	res.sendFile('./create.html', { root: __dirname})
})

app.get('/', (req, res) => {
	
	Car.find().then((result) => {
		res.render('index', {title: "Cars Api Frontend", cars: result})
	})
})


app.use('/cars', carRoutes)

app.use('/user', userRoutes)

app.use((req, res) => {
	res.status(404).send('404 page not found')
})

