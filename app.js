const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const adminRoute = require('./routes/adminRoute')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute')
const customerRoute = require('./routes/customerRoute')
const categoryRoute = require('./routes/categoryRoute')
const path = require('path')


// Cross Unblocker File..
const crossUnblocker = require('./middlewares/cros-unblocker');
// Custom Error Hanndler..
const errorHandler = require('./middlewares/error-handler');

const app = express()

// CROS Unblocker Middleware..
app.use(crossUnblocker.allowCross);
app.use(express.static('public')),  //make the public directory public
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Router Request Handeler..
app.use('/api/admin', adminRoute)
app.use('/api/product', productRoute)
app.use('/api/customer', customerRoute)
app.use('/api/category', categoryRoute)
app.use('/api/order', orderRoute)


//Error Handelar..
app.use(errorHandler.extra);

if(process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
// if(app.get('env') === 'development') {
//     app.use('dev')
// }

app.get('/', (req, res) => {
    res.send('<h1>Welcome Ecomerce Demo Two</h1>')
})

const PORT = process.env.PORT || 8080
// const MONGODB_URI = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0-p4dm8.mongodb.net/ecommerce_two?retryWrites=true&w=majority`
const MONGODB_URI = `mongodb://localhost:27017/ecommerce_halalDokan`

mongoose.connect(MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log(`Database Connected`)
        app.listen(PORT, () => {
            console.log(`Listening PORT: ${PORT}`)
        })
    })
    .catch(e => {
        console.log(e)
    })
