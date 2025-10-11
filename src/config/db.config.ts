import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export const databaseConfig = {
  useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => {
    const uri = configService.get<string>('MONGODB_URI');
    
    // Log connection attempt
    console.log(`Attempting to connect to MongoDB`);

    // Set up connection event listeners
    mongoose.connection.on('connecting', () => {
      console.log('Connecting to MongoDB...');
    });

    mongoose.connection.on('connected', () => {
      console.log('Connected to database successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Database connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });

    // Handle process termination to close connection gracefully
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });

    return {
      uri,
    };
  },
  inject: [ConfigService],
};