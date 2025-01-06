import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import authRoutes from './routes/authRoute.js'
import messageRoutes from './routes/messageRoute.js'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import {app,server} from './lib/socket.js'

dotenv.config()
const port = process.env.PORT || 5000
const __dirname = path.resolve()

app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({limit:'10mb',extended:true}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)

app.use(express.static(path.join(__dirname,'../../frontend/build')))

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'../../frontend/build','index.html'))
})

server.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`)
    connectDB()
})