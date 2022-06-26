import { TestingModule, Test } from '@nestjs/testing';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { Folder } from './schemas/folder.schema';

const mockFolder: Folder = {
	_id: 'A-01',
	folderName: 'Cat House',
	nestedFolders: [],
	items: [],
	createdAt: '26/06/2022',
	updatedAt: '26/06/2022',
};

const mockUpdatedFolder: Folder = {
	_id: 'A-01',
	folderName: 'Cat House',
	nestedFolders: ['Cat House 7'],
	items: ['Jotaro', 'Joseph', 'Jonathan'],
	createdAt: '26/06/2022',
	updatedAt: '26/06/2022',
};

const mockCreateFolderDto: CreateFolderDto = {
	folderName: 'Cat House',
	nestedFolders: [],
	items: [],
};

const mockUpdateFolderDto: UpdateFolderDto = {
	folderName: 'Cat House',
	nestedFolders: ['Cat House 7'],
	items: ['Jotaro', 'Joseph', 'Jonathan'],
};

describe('Item Service', () => {
	let folderController: FolderController;
	let folderService: FolderService;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				FolderController,
				{
					provide: FolderService,
					useValue: {
						createFolder: jest.fn(),
						getFolderById: jest.fn(),
						updateFolderById: jest.fn(),
						deleteFolderById: jest.fn(),
					},
				},
			],
		}).compile();

		folderController = module.get<FolderController>(FolderController);
		folderService = module.get<FolderService>(FolderService);
	});

	it('service should be defined', async () => {
		expect(FolderController).toBeDefined();
	});

	describe('Create Folder', () => {
		it('it should be equal', async () => {
			jest.spyOn(folderService, 'createFolder').mockResolvedValue(mockFolder);
			const folderCreated = await folderController.createFolder(
				mockCreateFolderDto
			);
			expect(folderCreated).toEqual(mockFolder);
		});
		it('it should be called with expected params', async () => {
			const mockFunction = jest.spyOn(folderController, 'createFolder');
			await folderController.createFolder(mockCreateFolderDto);
			expect(mockFunction).toBeCalledWith(mockCreateFolderDto);
		});
	});
	describe('Get Folder', () => {
		it('it should be equal', async () => {
			jest.spyOn(folderService, 'getFolderById').mockResolvedValue(mockFolder);
			const folderFounded = await folderController.getFolderById('A-01');
			expect(folderFounded).toEqual(mockFolder);
		});
		it('it should be called with expected params', async () => {
			const mockFunction = jest.spyOn(folderController, 'getFolderById');
			await folderController.getFolderById('A-01');
			expect(mockFunction).toBeCalledWith('A-01');
		});
	});
	describe('Update Item', () => {
		it('it should be equal', async () => {
			jest
				.spyOn(folderService, 'updateFolderById')
				.mockResolvedValue(mockUpdatedFolder);
			const itemUpdated = await folderController.updateFolderById(
				'A-01',
				mockUpdateFolderDto
			);
			expect(itemUpdated).toEqual(mockUpdatedFolder);
		});
		it('it should be called with expected params', async () => {
			const mockFunction = jest.spyOn(folderController, 'updateFolderById');
			await folderController.updateFolderById('A-01', mockUpdateFolderDto);
			expect(mockFunction).toBeCalledWith('A-01', mockUpdateFolderDto);
		});
	});
	describe('Delete Item', () => {
		it('it should be equal', async () => {
			const itemTextDeleted = await folderController.deleteFolderById('A-01');
			expect(itemTextDeleted).toEqual('folder with id: A-01 has been deleted');
		});
		it('it should be called with expected params', async () => {
			const mockFunction = jest.spyOn(folderController, 'deleteFolderById');
			await folderController.deleteFolderById('A-01');
			expect(mockFunction).toBeCalledWith('A-01');
		});
	});
});
