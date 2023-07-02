const express = require('express')

const router = express.Router()


const Car = require('../models/cars')

const multer = require('multer');

const cloudinary = require('../cloudinary')

const upload = multer();

const imgToFile64 = require('../public/js/imageparser')


router.get('/', (req, res) => {

	Car.find().then((data) => {
		res.send(data)
	}).catch((err) => {
		console.log(err)
		res.status(500).send("Network or server Error")
	})
})

router.post('/create', upload.single('image'), (req, res) => {

	if(req.file){
		const file64 = imgToFile64(req.file).content;
		cloudinary.uploader.upload(file64, {overwrite: true, invalidate: true, resource_type: 'auto'})
		.then(result => {
			const car = new Car({...req.body, image: result.secure_url})

			car.save().then((data) => {
				res.status(201).send({success: true, message: "Car is created sucessfully"})
			})
		}).catch((err) => {
			console.log(err)
			res.status(400).send({success: false, message: err.message })
		})
	}else{
		throw new Error("No valid image found")
	}

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