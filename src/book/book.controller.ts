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
import { BookService } from './book.service';  // Importing the Book service
import { CreateBookDto } from './dto/create-book.dto';   // DTO for creating a book
import { UpdateBookDto } from './dto/update-book.dto';   // DTO for updating a book
import { Book } from './schemas/book.schema';            // Book schema

// Controller handling all routes for books
@Controller('books')            
export class BookController {
  // Injecting the BookService via the constructor
  constructor(private bookService: BookService) {}

  // GET request to fetch all books
  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();  // Calls the service to return all books
  }

  // POST request to create a new book (Protected route, requires authentication)
  @Post()
  @UseGuards(AuthGuard())   // Protects route, user must be authenticated to create a book
  async createBook(
    @Body() book: CreateBookDto,  // Accepts book data from request body
  ): Promise<Book> {
    return this.bookService.create(book);  // Calls the service to create a new book
  }

  // GET request to fetch a single book by its ID
  @Get(':id')
  async getBook(
    @Param('id') id: string,  // Extracts book ID from route parameter
  ): Promise<Book> {
    return this.bookService.findById(id);  // Calls the service to find the book by ID
  }

  // PUT request to update an existing book by its ID
  @Put(':id')
  async updateBook(
    @Param('id') id: string,  // Extracts book ID from route parameter
    @Body() book: UpdateBookDto,  // Accepts updated book data from request body
  ): Promise<Book> {
    return this.bookService.updateById(id, book);  // Calls the service to update the book
  }

  // DELETE request to remove a book by its ID
  @Delete(':id')
  async deleteBook(
    @Param('id') id: string,  // Extracts book ID from route parameter
  ): Promise<Book> {
    return this.bookService.deleteById(id);  // Calls the service to delete the book
  }
}


//routes
//get  http://localhost:3000/books
//post  http://localhost:3000/books
//get  http://localhost:3000/books/id
//put http://localhost:3000/books/id
//delete http://localhost:3000/books/id