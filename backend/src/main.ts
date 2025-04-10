import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS (Cross-Origin Resource Sharing) for all routes
  app.enableCors({
    origin: '*', // Allow all origins (you can specify a specific origin if needed)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Accept', // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    maxAge: 3600, // Cache preflight response for 1 hour
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
