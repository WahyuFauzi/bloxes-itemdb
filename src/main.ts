import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const allowedOrigins = [
	'http://localhost:3000',
	'http://localhost:3001',
	'http://localhost:3002',
	'http://localhost:3200',
];
const corsOptions = {
	//NOTE somehow nestjs only accept this cors
	origin: (origin, callback) => {
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Origin not allowed by CORS'));
		}
	},
};

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	//app.enableCors({ ...corsOptions });
	await app.listen(3003);
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
