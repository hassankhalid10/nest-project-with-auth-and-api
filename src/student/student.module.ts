import { Module } from '@nestjs/common'; // Imports the @Module decorator from NestJS, used to define a module
import { MongooseModule } from '@nestjs/mongoose'; // Imports MongooseModule for MongoDB integration
import { StudentController } from './student.controller'; // Imports the StudentController to handle HTTP requests for students
import { StudentService } from './student.service'; // Imports the StudentService to handle the business logic for students
import { StudentSchema } from './schemas/student.schema'; // Imports the StudentSchema for the Student model definition in MongoDB
import { AuthModule } from '../auth/auth.module'; // Imports AuthModule for authentication-related functionality

@Module({
  imports: [
    AuthModule, // Imports the AuthModule to enable authentication-related features
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]) // Registers the 'Student' schema with Mongoose for database operations
  ],
  controllers: [StudentController], // Registers the StudentController for handling student-related HTTP routes
  providers: [StudentService], // Registers the StudentService to provide business logic for students
})
export class StudentModule {}


