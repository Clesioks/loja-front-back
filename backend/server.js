import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/DB.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import uploadRoutes from './routes/uploadRoutes.js'


const port = process.env.PORT || 5000

connectDB() // Conecta com o mongoDB

const app = express()

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// Cookie parser middleware
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('API está rodando...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send({
    clientId: process.env.PAYPAL_CLIENT_ID }))

const __dirname = path.resolve() // Set __dirname para o diretório atual
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => console.log(`Servidor está rodando na porta ${port}.`))