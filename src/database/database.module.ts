import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { databaseConfig } from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: databaseConfig.host,
        port: databaseConfig.port,
        username: databaseConfig.username,
        password: process.env.POSTGRES_PASSWORD,
        // password: databaseConfig.password,
        database: databaseConfig.database,
        synchronize: true,  // set to false in production
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
  constructor(private dataSource: DataSource) {
    this.checkConnection();
  }

  private async checkConnection() {
    try {
      if (this.dataSource.isInitialized) {
        console.log('Database connection is successful!');
      } else {
        await this.dataSource.initialize();
        console.log('Database connection established successfully!');
      }
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }
}
