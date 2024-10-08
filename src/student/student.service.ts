import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Student } from './schemas/student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: mongoose.Model<Student>, // Injects the Mongoose model for Student schema
  ) {}

  // Fetches all students from the database
  async findAll(): Promise<Student[]> {
    const students = await this.studentModel.find(); // Retrieves all student documents
    return students;
  }

  // Creates a new student in the database
  async create(student: Student): Promise<Student> {
    const res = await this.studentModel.create(student); // Creates a new student document
    return res;
  }

  // Finds a student by their ID
  async findById(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id); // Searches for a student document by its ID

    if (!student) {
      throw new NotFoundException('Student not found.'); // Throws an error if the student is not found
    }

    return student;
  }

  // Updates an existing student by their ID
  async updateById(id: string, student: Student): Promise<Student> {
    return await this.studentModel.findByIdAndUpdate(id, student, {
      new: true, // Returns the updated document instead of the original
      runValidators: true, // Ensures validation rules are applied during update
    });
  }

  // Deletes a student by their ID
  async deleteById(id: string): Promise<Student> {
    return await this.studentModel.findByIdAndDelete(id); // Deletes the document by its ID
  }
}
