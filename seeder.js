import dotenv from 'dotenv'
import connectDB from './config/db.js'
import Employee from './models/Employee.js'
import sampleEmployees from './data/sampleEmployees.js'
import Team from './models/Team.js'
import sampleLeaves from './data/sampleLeaves.js'
import Leave from './models/Leave.js'
import sampleTeams from './data/sampleTeams.js'


dotenv.config()

connectDB()


const importNewData = async () => {
    try {
        await Team.deleteMany()

        await Team.insertMany(sampleTeams)

        console.log('Data Imported'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`ERROR: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}


const destroyData = async () => {
    try {
        await Employee.deleteMany()
        await Team.deleteMany()
        await Leave.deleteMany()

        console.log('Data Destroyed'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`ERROR: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importNewData()
}