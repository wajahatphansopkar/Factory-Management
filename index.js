const connectToMongo = require('./db');
const express = require('express')
var cors =  require('cors')


connectToMongo();
const app = express()
const port = 8000
app.use(cors())
app.use(express.json())


// awailable routes
app.use('/api/auth', require('./routes/auth'))



app.listen(port, () => {
  console.log(`Housing Society Management Backend listening at http://localhost:${port}`)
})

