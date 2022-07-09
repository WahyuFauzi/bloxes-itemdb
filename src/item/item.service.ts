import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, ItemDocument } from './schemas/item.schema';

@Injectable()
export class ItemService {
	constructor(
		@InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>
	) {}

	//somehow it return backwards from updatedAt to _id
	async createItem(createItemDto: CreateItemDto): Promise<Item> {
		return await this.itemModel.create({
			_id: nanoid(),
			itemName: createItemDto.itemName,
			itemTotalSize: createItemDto.itemTotalSize,
			createdAt: Date.now().toString(),
			updatedAt: Date.now().toString(),
		});
	}

	async getItemById(itemId: string): Promise<Item> {
		return await this.itemModel.findById(itemId).exec();
	}

	async updateItemById(
		itemId: string,
		updateItemDto: UpdateItemDto
	): Promise<Item> {
		return await this.itemModel
			.findByIdAndUpdate(itemId, {
				itemName: updateItemDto.itemName,
				itemTotalSize: updateItemDto.itemTotalSize,
				updatedAt: Date.now().toString(),
			})
			.exec();
	}

	async deleteItemById(itemId: string): Promise<void> {
		await this.itemModel.findByIdAndDelete(itemId).exec();
	}
}
