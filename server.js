import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'

const app = express()

// Configure env
dotenv.config()

// database config
connectDB(); 

// middelwares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product', productRoutes)

// rest api
app.get('/', (req, res) => {
    res.send(`<h1>This is ecommerce website and this master applications..</h1>`);
})

// PORT
const PORT = process.env.PORT || 8080

// run listen
app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`.bgGreen.white)
})