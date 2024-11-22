import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async saveUser(email: string, content: string, request: string, responseTime: string): Promise<void> {
    const query = `
      INSERT INTO users1 (email, content, request, response_time)
      VALUES ($1, $2, $3, $4)
    `;
    await this.dataSource.query(query, [email, content, request, responseTime]);
  }
// all users
  async getUsers(): Promise<any[]> {
    const query = `SELECT * FROM users1`;
    return this.dataSource.query(query);
  }

  // user by id
  async getUserById(id: number): Promise<any> {
    const query = `SELECT * FROM users1 WHERE id = $1`;
    const result = await this.dataSource.query(query, [id]);
    return result.length ? result[0] : null;
  }
// get a emails details from table 
  async getUserByEmail(email: string): Promise<any> {
    const query = `SELECT * FROM users1 WHERE email = $1`;
    const result = await this.dataSource.query(query, [email]);
    return result;
  }
}
