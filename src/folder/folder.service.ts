import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { ItemService } from '../item/item.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder, FolderDocument } from './schemas/folder.schema';

@Injectable()
export class FolderService {
	constructor(
		@InjectModel(Folder.name)
		private readonly folderModel: Model<FolderDocument>,
		private itemService: ItemService
	) {}

	async createFolder(createFolderDto: CreateFolderDto): Promise<Folder> {
		return this.folderModel.create({
			_id: nanoid(),
			folderName: createFolderDto.folderName,
			nestedFolders: createFolderDto.nestedFolders,
			items: createFolderDto.items,
			createdAt: Date.now().toString(),
			updatedAt: Date.now().toString(),
		});
	}

	async getFolderById(folderId: string): Promise<Folder> {
		return this.folderModel.findById(folderId).exec();
	}

	async updateFolderById(
		folderId: string,
		updateFolderDto: UpdateFolderDto
	): Promise<Folder> {
		return this.folderModel.findByIdAndUpdate(folderId, {
			folderName: updateFolderDto.folderName,
			nestedFolders: updateFolderDto.nestedFolders,
			items: updateFolderDto.items,
			updatedAt: Date.now().toString(),
		});
	}

	async deleteFolderById(folderId: string): Promise<void> {
		this.getFolderById(folderId).then((e) => {
			for (const i in e.items) {
				this.itemService.deleteItemById(e.items[i]);
			}
			for (const i in e.nestedFolders) {
				this.deleteFolderById(e.nestedFolders[i]);
			}
			this.folderModel.findByIdAndDelete(folderId).exec();
		});
	}
}
