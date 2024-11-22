// src/config/email.config.ts

export const emailConfig = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    username: process.env.EMAIL_HOST_USER || 'chinmay.jena7878@gmail.com',
    password: process.env.EMAIL_HOST_PASSWORD ,
  };
  