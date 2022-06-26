import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Item, ItemSchema } from './schemas/item.schema';

@Module({
	imports: [
		MongooseModule.forFeature(
			[{ name: Item.name, schema: ItemSchema }],
			'item'
		),
	],
	controllers: [ItemController],
	providers: [ItemService],
	exports: [ItemService],
})
export class ItemModule {}
