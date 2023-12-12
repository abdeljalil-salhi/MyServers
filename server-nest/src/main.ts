import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules/app.module';

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
  app.enableCors({
    origin: [process.env.CLIENT_LOCALHOST, process.env.CLIENT_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('MyServers')
    .setDescription('MyServers API description')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the application on the specified port
  await app.listen(process.env.PORT || 3000);
}

// Call the bootstrap function and handle potential errors
bootstrap().catch((error: Error) => {
  console.error(error);
});
