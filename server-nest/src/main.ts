import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './app.module';

/**
 * Bootstrap function to create and start the NestJS application.
 *
 * @async
 * @returns {Promise<void>}
 */
async function bootstrap(): Promise<void> {
  // Create the NestJS application instance
  const app: INestApplication = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Start the application on the specified port
  await app.listen(process.env.PORT || 3000);
}

// Call the bootstrap function and handle potential errors
bootstrap().catch((error: Error) => {
  console.error(error);
});
