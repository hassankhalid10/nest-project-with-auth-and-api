import { Module } from '@nestjs/common'; // Imports the @Module decorator from NestJS, used to define a module
import { MongooseModule } from '@nestjs/mongoose'; // Imports MongooseModule for MongoDB integration
import { BookController } from './book.controller'; // Imports the BookController to handle HTTP requests for books
import { BookService } from './book.service'; // Imports the BookService to handle the business logic for books
import { BookSchema } from './schemas/book.schema'; // Imports the BookSchema for the Book model definition in MongoDB
import { AuthModule } from '../auth/auth.module'; // Imports AuthModule for authentication-related functionality

@Module({
  imports: [
    AuthModule, // Imports the AuthModule to enable authentication-related features
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]) // Registers the 'Book' schema with Mongoose for database operations
  ],
  controllers: [BookController], // Registers the BookController for handling book-related HTTP routes
  providers: [BookService], // Registers the BookService to provide business logic for books
})
export class BookModule {}

