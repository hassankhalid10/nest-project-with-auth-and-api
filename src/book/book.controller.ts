import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';   //schema for books
import { UpdateBookDto } from './dto/update-book.dto';   //schema for books
import { Book } from './schemas/book.schema';           //schema for books

@Controller('books')            //here all method of book controllers
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard())   //here i have protected route so that for creating new book first user have to login then copy token and pass token in header to create new book
  async createBook(
    @Body()
    book: CreateBookDto,
  ): Promise<Book> {
    return this.bookService.create(book);
  }

  @Get(':id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, book);
  }

  @Delete(':id')
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}


//routes
//get  http://localhost:3000/books
//post  http://localhost:3000/books
//get  http://localhost:3000/books/id
//patch http://localhost:3000/books/id
//delete http://localhost:3000/books/id