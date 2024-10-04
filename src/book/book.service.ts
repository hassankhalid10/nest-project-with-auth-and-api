import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>, // Injects the Mongoose model for Book schema
  ) {}

  // Fetches all books from the database
  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find(); // Retrieves all book documents
    return books;
  }

  // Creates a new book in the database
  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book); // Creates a new book document
    return res;
  }

  // Finds a book by its ID
  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id); // Searches for a book document by its ID

    if (!book) {
      throw new NotFoundException('Book not found.'); // Throws an error if the book is not found
    }

    return book;
  }

  // Updates an existing book by its ID
  async updateById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true, // Returns the updated document instead of the original
      runValidators: true, // Ensures validation rules are applied during update
    });
  }

  // Deletes a book by its ID
  async deleteById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id); // Deletes the document by its ID
  }
}
