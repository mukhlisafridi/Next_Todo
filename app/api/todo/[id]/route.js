import DBConnection from "@/app/libs/db"
import TodoModel from "@/app/models/todo.model"
import { NextResponse } from "next/server"

export async function PUT(request,{params}){
    try {
        const {id}= await params
        const {title,desc}=await request.json()
        if (!title || !desc) {
            return NextResponse.json({success:false,message:'All fildes are required'},{status:400})
        }   
        await DBConnection()
        const todo= await TodoModel.findByIdAndUpdate(id,{title,desc},{new:true})  
        if (!todo) {
            return NextResponse.json({success:false,message:'Todo not found'},{status:404})
        }   
        return NextResponse.json({success:true,message:'Todo Update Successfully',todo},{status:200})
    }   
    catch (error) {
        console.log(error)
        return NextResponse.json({message:'internal server error'},{status:500})
    }
}                        


export async function DELETE(request,{params}){
    try {
        const {id}= await params
              
        await DBConnection()
        const todo= await TodoModel.findByIdAndDelete(id)  
        if (!todo) {
            return NextResponse.json({success:false,message:'Todo not found'},{status:404})
        }   
        return NextResponse.json({success:true,message:'Todo Deleted Successfully',todo},{status:200})
    }   
    catch (error) {
        console.log(error)
        return NextResponse.json({message:'internal server error'},{status:500})
    }
}                        