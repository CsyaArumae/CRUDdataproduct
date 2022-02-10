//import
const express = require('express');
const cors = require('cors');

//implementasi 
const app = express();
app.use(cors());

//endpoint admin
const admin = require('./routes/admin'); //import
app.use("/admin", admin)

//endpoint admin
const customer = require('./routes/customer'); //import
app.use("/customer", customer)

//run server
app.listen(8080, ()  => {
    console.log('server run on port 8080')
})

//import end-point letakkan disini
const product = require('./routes/product')//import
app.use("/product", product)//implementasi