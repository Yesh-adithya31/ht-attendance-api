import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`ERROR: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB