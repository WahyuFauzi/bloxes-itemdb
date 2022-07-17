/* eslint-disable prefer-const */
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FolderService } from './folder.service';
import { Folder } from './schemas/folder.schema';

@Controller('folder')
export class FolderController {
	constructor(private readonly folderService: FolderService) {}

	@Post()
	async createFolder(
		@Body() createFolderDto: CreateFolderDto
	): Promise<Folder> {
		return this.folderService.createFolder(createFolderDto);
	}

	@Get(':folderId')
	async getFolderById(@Param('folderId') folderId: string): Promise<Folder> {
		return this.folderService.getFolderById(folderId);
	}

	@Put(':folderId')
	async updateFolderById(
		@Param('folderId') folderId: string,
		@Body() updateFolderDto: UpdateFolderDto
	): Promise<Folder> {
		return this.folderService.updateFolderById(folderId, updateFolderDto);
	}

	@Delete(':folderId')
	async deleteFolderById(@Param('folderId') folderId: string): Promise<string> {
		this.folderService.deleteFolderById(folderId);
		return `folder with id: ${folderId} has been deleted`;
	}
}
