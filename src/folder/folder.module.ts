import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from '../item/item.module';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { Folder, FolderSchema } from './schemas/folder.schema';

@Module({
	imports: [
		MongooseModule.forFeature(
			[{ name: Folder.name, schema: FolderSchema }],
			'folder'
		),
		ItemModule,
	],
	controllers: [FolderController],
	providers: [FolderService],
})
export class FolderModule {}
