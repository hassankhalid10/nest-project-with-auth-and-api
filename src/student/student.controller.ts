import {
  Body,      // For handling request bodies
  Controller,  // Defines a controller
  Delete,      // For handling DELETE requests
  Get,         // For handling GET requests
  Param,       // For handling route parameters
  Post,        // For handling POST requests
  Put,         // For handling PUT requests
  UseGuards,   // For using route guards (authentication)
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Passport-based authentication guard
import { StudentService } from './student.service';  // Importing the Student service
import { CreateStudentDto } from './dto/create-student.dto';   // DTO for creating a student
import { UpdateStudentDto } from './dto/update-student.dto';   // DTO for updating a student
import { Student } from './schemas/student.schema';            // Student schema

// Controller handling all routes for students
@Controller('students')            
export class StudentController {
  // Injecting the StudentService via the constructor
  constructor(private studentService: StudentService) {}

  // GET request to fetch all students
  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.findAll();  // Calls the service to return all students
  }

  // POST request to create a new student (Protected route, requires authentication)
  @Post()
  @UseGuards(AuthGuard())   // Protects route, user must be authenticated to create a student
  async createStudent(
    @Body() student: CreateStudentDto,  // Accepts student data from request body
  ): Promise<Student> {
    return this.studentService.create(student);  // Calls the service to create a new student
  }

  // GET request to fetch a single student by their ID
  @Get(':id')
  async getStudent(
    @Param('id') id: string,  // Extracts student ID from route parameter
  ): Promise<Student> {
    return this.studentService.findById(id);  // Calls the service to find the student by ID
  }

  // PUT request to update an existing student by their ID
  @Put(':id')
  async updateStudent(
    @Param('id') id: string,  // Extracts student ID from route parameter
    @Body() student: UpdateStudentDto,  // Accepts updated student data from request body
  ): Promise<Student> {
    return this.studentService.updateById(id, student);  // Calls the service to update the student
  }

  // DELETE request to remove a student by their ID
  @Delete(':id')
  async deleteStudent(
    @Param('id') id: string,  // Extracts student ID from route parameter
  ): Promise<Student> {
    return this.studentService.deleteById(id);  // Calls the service to delete the student
  }
}

// Routes
// GET    http://localhost:3000/students
// POST   http://localhost:3000/students
// GET    http://localhost:3000/students/id
// PUT    http://localhost:3000/students/id
// DELETE http://localhost:3000/students/id
