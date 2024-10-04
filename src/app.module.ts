import { Module } from '@nestjs/common'; // Importing the main module decorator from NestJS.
import { ConfigModule } from '@nestjs/config'; // Importing the configuration module to manage environment variables.
import { MongooseModule } from '@nestjs/mongoose'; // Importing the Mongoose module to interact with MongoDB.
import { AppController } from './app.controller'; // Importing the main application controller.
import { AppService } from './app.service'; // Importing the main application service.
import { AuthModule } from './auth/auth.module'; // Importing the authentication module.
import { BookModule } from './book/book.module'; // Importing the book module.

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Load environment variables from a .env file.
      isGlobal: true, // Make the configuration module available globally in the app.
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/library-next-api'), // Connect to the MongoDB instance running on localhost (port 27017), database named `library-next-api`.
    // MongooseModule.forRoot(process.env.DB_URI), // Option to load the database URI from environment variables.
    AuthModule, // Import the AuthModule to handle authentication-related logic.
    BookModule, // Import the BookModule to handle book-related logic (e.g., CRUD operations for books).
  ],
  controllers: [AppController], // Specify that `AppController` handles incoming requests at the root level.
  providers: [AppService], // Register the `AppService` to handle the business logic of the root module.
})
export class AppModule {}
