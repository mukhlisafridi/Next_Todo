import mongoose from "mongoose";
const DBConnection=async()=>{
    try {
       await mongoose.connect("etc")
        console.log('mongodb connected')
    } catch (error) {
        console.log('mongodb error',error)
    }
}

export default DBConnection