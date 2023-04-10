import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import aiRoutes from './routes/aiRoutes.js'


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/ai', aiRoutes)


app.get('/', async (req, res) => {
    res.send('Hello from OpenAI')
})



const startServer = async () => {
    const port = process.env.PORT || 5000

    try {
        connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server port : ${port}`)
        })
    }
    catch (err) {
        console.log(err)
    }
    
}
startServer()