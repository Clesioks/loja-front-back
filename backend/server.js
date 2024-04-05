import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/DB.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'


const port = process.env.PORT || 5000

connectDB() // Conecta com o mongoDB

const app = express()

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.send('API está rodando...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => console.log(`Servidor está rodando na porta ${port}.`))