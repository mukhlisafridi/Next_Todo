import DBConnection from "@/app/libs/db";
import TodoModel from "@/app/models/todo.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, desc } = await request.json();
    if (!title || !desc) {
      return NextResponse.json(
        { success: false, message: "All fildes are required" },
        { status: 400 },
      );
    }
    await DBConnection();

const todo = await TodoModel.create({ title, desc });
    return NextResponse.json(
      { success: true, message: "Todo Create Successfully", todo },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await DBConnection();
    const todo = await TodoModel.find();
    return NextResponse.json({ success: true, todo }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "intneral server error" },
      { status: 500 },
    );
  }
}
