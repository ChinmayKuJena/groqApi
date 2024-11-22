import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { emailConfig } from '../config/email.config';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
      this.transporter = nodemailer.createTransport({
        host: emailConfig.host,
        port: emailConfig.port,
        auth: {
          user: emailConfig.username,
          pass: process.env.EMAIL_HOST_PASSWORD,
        },
      });
    }
  
    async sendEmail(to: string, subject: string, text: string) {
      const mailOptions = {
        from: emailConfig.username,
        to,
        subject,
        html:text,
      };
  
      return this.transporter.sendMail(mailOptions);
    }    
}
