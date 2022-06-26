import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './item.service';
import { Item } from './schemas/item.schema';

@Controller('item')
export class ItemController {
	constructor(private readonly itemService: ItemService) {}

	@Post()
	async createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
		return this.itemService.createItem(createItemDto);
	}

	@Get(':itemId')
	async getItemById(@Param('itemId') itemId: string): Promise<Item> {
		return this.itemService.getItemById(itemId);
	}

	@Put(':itemId')
	async updateItemById(
		@Param('itemId') itemId: string,
		@Body() updateItemDto: UpdateItemDto
	): Promise<Item> {
		return this.itemService.updateItemById(itemId, updateItemDto);
	}

	@Delete(':itemId')
	async deleteItemById(@Param('itemId') itemId: string): Promise<string> {
		this.itemService.deleteItemById(itemId);
		return `item with id: ${itemId} has been deleted`;
	}
}
