

const express = require('express')

const app = express()

const PORT = 5000 || process.env.prototype

app.get('', (req, res) => {
	res.send("Hello World. This is express")
})

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`)
})