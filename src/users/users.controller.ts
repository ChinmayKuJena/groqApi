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

  @Post('create-request')
  async createUserRequest(@Body() body: any): Promise<string> {
    console.log('Received body:', body);

    // validate input
    if (!body || !body.email) {
      console.error('Invalid input: missing email or content.');
      throw new HttpException('Email and content are required.', HttpStatus.BAD_REQUEST);
    }
    
    const { email, request, username } = body;
    const userName = username ? username : 'Anonymous';
    console.log('Received email:', email);
    console.log('Received content:', request);

    // time for Groq service response
    const startTime = Date.now(); 
    const chatCompletionResponse = await this.groqService.getChatCompletion(request);
    const endTime = Date.now(); 

    //calculate response time
    const responseTime = (endTime - startTime) + 'ms'; 
    console.log('Groq service response time:', responseTime);
    console.log('Groq service response:', chatCompletionResponse);

    //save the user request and response to the database
    await this.userService.saveUser(email, chatCompletionResponse, request, responseTime);
    // small html template 
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
    const subject = `${request}`;
    await this.emailService.sendEmail(email, subject, htmlContent);
    return `Thanks! Please check your email. Here is your response: \n${chatCompletionResponse}`;
  }

  @Get('all-users')
  async getAllUsers(): Promise<any[]> {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: number): Promise<any> {
    console.log('Fetching user with ID:', id);
    const user = await this.userService.getUserById(id);
    return user;
  }

  @Get('user-by-email/:email')
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
