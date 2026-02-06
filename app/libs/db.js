import mongoose from "mongoose";
const DBConnection=async()=>{
    try {
       await mongoose.connect("mongodb+srv://mukhlisafridi4_db_user:afridi@cluster0.s4cpju6.mongodb.net/Nextapp")
        console.log('mongodb connected')
    } catch (error) {
        console.log('mongodb error',error)
    }
}

export default DBConnection