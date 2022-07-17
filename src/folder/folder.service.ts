/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { ItemService } from '../item/item.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder, FolderDocument } from './schemas/folder.schema';

//TODO repair updated at and created at with standarized date (ISO)
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
			folder_name: createFolderDto.folder_name,
			nested_folders: [],
			items: [],
			created_at: Date.now().toString(),
			updated_at: Date.now().toString(),
		});
	}

	async getFolderById(folderId: string): Promise<Folder> {
		return this.folderModel.findById(folderId).exec();
	}

	async updateFolderById(
		folderId: string,
		updateFolderDto: UpdateFolderDto
	): Promise<Folder> {
		return this.folderModel.findByIdAndUpdate(
			folderId,
			{
				$set: {
					folder_name: updateFolderDto.folder_name,
					nested_folders: updateFolderDto.nested_folders,
					items: updateFolderDto.items,
					updated_at: Date.now().toString(),
				},
			},
			{ new: true }
		);
	}

	async deleteFolderById(folderId: string): Promise<void> {
		this.folderModel.findByIdAndDelete(folderId).exec();
	}
}
