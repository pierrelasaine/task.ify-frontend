const express = require('express')
const path = require('path')
const app = express()

// Serve static assets from the "dist" folder
app.use(express.static(path.join(__dirname, 'dist')))

// Always return the main index.html, so react-router renders the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})
