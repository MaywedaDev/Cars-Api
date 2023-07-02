const express = require('express')

const router = express.Router()

const User = require('../models/user')

const app = express()


app.use(express.json())

router.post('/signup', (req, res) => {
    const user = new User(req.body)

    user.save().then((user) => {
        res.status(201).send({success: true, message: "User is created sucessfully", user})
    }).catch((err) => {
        console.log(err)
			res.status(400).send({success: false, message: err.message })
    })
})

module.exports = router