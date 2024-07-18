let mongoose = require("mongoose")

let connectDB = async()=>{
      try {
          let conn = await mongoose.connect(process.env.MONGO_URI)
            console.log(`Mongodb connected :${ conn.Connection.host}`)
      } catch (error) {
        console.log(error.message)
      }
}

module.exports=connectDB;