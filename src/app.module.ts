import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FolderModule } from './folder/folder.module';
import { ItemModule } from './item/item.module';

//TODO implement logging
@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost:27017/item', {
			connectionName: 'item',
		}),
		MongooseModule.forRoot('mongodb://localhost:27017/folder', {
			connectionName: 'folder',
		}),
		ItemModule,
		FolderModule,
	],
})
export class AppModule {}
