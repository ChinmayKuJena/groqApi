import { Controller, Post, Get, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { EmailService } from 'src/email/email.service';
import { GroqService } from 'src/groq/groq.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly groqService: GroqService
  ) {}

  @Post()
  async getGroqResponse(@Body() body: any): Promise<string> {
    console.log('Received body:', body);

    //  input 
    if (!body || !body.email) {
      console.error('Invalid input: missing email or content.');
      throw new HttpException('Email and content are required.', HttpStatus.BAD_REQUEST);
    }
    
    const { email, request ,username } = body;
    const userName = username ? username : 'Anonymous';
    console.log('Received email:', email);
    console.log('Received content:', request);

    //  time for Groq service response
    const startTime = Date.now(); 
    const chatCompletionResponse = await this.groqService.getChatCompletion(request);
    const endTime = Date.now(); 

    //  response time
    const responseTime = (endTime - startTime) + 'ms'; // time difference in milliseconds
    console.log('Groq service response time:', responseTime);
    console.log('Groq service response :', chatCompletionResponse);

    await this.userService.saveUser(email, chatCompletionResponse, request, responseTime);

    const htmlContent = `
    <html>
      <body>
        <h1>Hello, ${userName}!</h1>
        <p>Thank you for using our service. Here are your details:</p>
        <ul>
          <li>Request: ${request}</li>
          <li>Response Time: ${responseTime}</li>
          <li>Response: ${chatCompletionResponse}</li>
        </ul>
        <p>Best regards, <br> Chinmay</p>
      </body>
    </html>
  `;
    const subject=`${request}`
    await this.emailService.sendEmail(email, subject, htmlContent);
    return `Thanks! Please Check Email\nHere is Your Response \n${chatCompletionResponse}`;
  }

  @Get()
  async getAllUsers(): Promise<any[]> {
    const users = await this.userService.getUsers();
    // console.log('Users fetched:', users);
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<any> {
    console.log('Fetching user with ID:', id);
    const user = await this.userService.getUserById(id);
    // console.log('User fetched:', user);
    return user;
  }
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<any> {
    // Fetch user by email using the user service
    const user = await this.userService.getUserByEmail(email);

    // If the user is not found, throw a 404 error
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    console.log('User fetched by email:', user);
    return user;
  }
}
