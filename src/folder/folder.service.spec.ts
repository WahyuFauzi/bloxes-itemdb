import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FolderService } from './folder.service';
import { Folder } from './schemas/folder.schema';
import { ItemService } from '../item/item.service';

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
	let folderService: FolderService;
	let model: Model<Folder>;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				FolderService,
				{
					provide: getModelToken('Folder'),
					useValue: {
						create: jest.fn(),
						findById: jest.fn(),
						findByIdAndUpdate: jest.fn(),
						findByIdAndDelete: jest.fn(),
					},
				},
				{
					provide: ItemService,
					useValue: {
						createItem: jest.fn(),
						getItemById: jest.fn(),
						updateItemById: jest.fn(),
						deleteItemById: jest.fn(),
					},
				},
			],
		}).compile();

		folderService = module.get<FolderService>(FolderService);
		model = module.get<Model<Folder>>(getModelToken('Folder'));
	});

	it('service should be defined', async () => {
		expect(folderService).toBeDefined();
	});

	describe('Create Item', () => {
		it('it should be equal', async () => {
			jest
				.spyOn(model, 'create')
				.mockImplementationOnce(() => Promise.resolve(mockFolder));
			const folderCreated = await folderService.createFolder(
				mockCreateFolderDto
			);
			expect(folderCreated).toEqual(mockFolder);
		});
		it('it should be called with expected params', async () => {
			const mockFunction = jest.spyOn(folderService, 'createFolder');
			folderService.createFolder(mockCreateFolderDto);
			expect(mockFunction).toBeCalledWith(mockCreateFolderDto);
		});
	});
	describe('Get Item', () => {
		it('it should be equal', async () => {
			jest.spyOn(model, 'findById').mockReturnValue({
				exec: jest.fn().mockResolvedValueOnce(mockFolder),
			} as any);
			const folderFounded = await folderService.getFolderById('A-01');
			expect(folderFounded).toEqual(mockFolder);
		});
		it('it should be called with expected params', async () => {
			const mockFunction = jest.spyOn(folderService, 'getFolderById');
			folderService.getFolderById('A-01');
			expect(mockFunction).toBeCalledWith('A-01');
		});
	});
	describe('Update Item', () => {
		//FIXME somehow this doesnt work
		it('it should be equal', async () => {
			jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
				exec: jest.fn().mockResolvedValueOnce(mockUpdatedFolder),
			} as any);
			const folderUpdated = await folderService.updateFolderById(
				'A-01',
				mockUpdateFolderDto
			);
			expect(folderUpdated).toEqual(mockUpdatedFolder);
		});
		it('it should be called with expected params', async () => {
			const mockFunction = jest.spyOn(folderService, 'updateFolderById');
			folderService.updateFolderById('A-01', mockUpdateFolderDto);
			expect(mockFunction).toBeCalledWith('A-01', mockUpdateFolderDto);
		});
	});
	//describe('Delete Item', () => {
	//	it('it should be called with expected params', async () => {
	//		jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
	//			exec: jest.fn().mockResolvedValueOnce(mockFolder),
	//		} as any);
	//		const mockFunction = jest.spyOn(folderService, 'deleteFolderById');
	//		folderService.deleteFolderById('A-01');
	//		expect(mockFunction).toBeCalledWith('A-01');
	//	});
	//});
});
