
require('dotenv').config();

const express = require('express')

const mongoose = require('mongoose')

const cors = require('cors')

const Car = require('./models/cars')

const multer = require('multer');

const cloudinary = require('./cloudinary')

const upload = multer();

const carRoutes = require('./routes/carsRoutes')

const app = express()

const PORT = 5000 || process.env.prototype

const imgToFile64 = require('./public/js/imageparser')

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

app.post('/create', upload.single('image'), (req, res) => {

	if(req.file){
		const file64 = imgToFile64(req.file).content;
		cloudinary.uploader.upload(file64, {overwrite: true, invalidate: true, resource_type: 'auto'})
		.then(result => {
			const car = new Car({...req.body, image: result.secure_url})

			car.save().then((data) => {
				res.send(data)
			})
		}).catch((err) => {
			console.log(err)
			res.status(400).send(err)
		})
	}else{
		throw new Error("No valid image found")
	}

})

app.get('/', (req, res) => {
	res.sendFile('./create.html', { root: __dirname})
})


app.use('/cars', carRoutes)

app.use((req, res) => {
	res.status(404).send('404 page not found')
})

