import { TestingModule, Test } from '@nestjs/testing';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Item } from './schemas/item.schema';

const mockItem: Item = {
	_id: 'A-01',
	itemName: 'Joseph',
	itemTotalSize: 9,
	createdAt: '26/06/2022',
	updatedAt: '26/06/2022',
};

const mockUpdatedItem: Item = {
	_id: 'A-01',
	itemName: 'Jotaro',
	itemTotalSize: 9,
	createdAt: '27/06/2022',
	updatedAt: '27/06/2022',
};

const mockCreateItemDto: CreateItemDto = {
	itemName: 'Joseph',
	itemTotalSize: 9,
};

const mockUpdateItemDto: UpdateItemDto = {
	itemName: 'Joseph',
	itemTotalSize: 9,
};

describe('Item Service', () => {
	let itemController: ItemController;
	let itemService: ItemService;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ItemController,
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

		itemController = module.get<ItemController>(ItemController);
		itemService = module.get<ItemService>(ItemService);
	});

	it('service should be defined', async () => {
		expect(ItemController).toBeDefined();
	});

	describe('Create Item', () => {
		it('it should be equal', async () => {
			jest.spyOn(itemService, 'createItem').mockResolvedValue(mockItem);
			const itemCreated = await itemController.createItem(mockCreateItemDto);
			expect(itemCreated).toEqual(mockItem);
		});
		it('it should be called with expected params', async () => {
			const mockFunction = jest.spyOn(itemController, 'createItem');
			await itemController.createItem(mockCreateItemDto);
			expect(mockFunction).toBeCalledWith(mockCreateItemDto);
		});
	});
	describe('Get Item', () => {
		it('it should be equal', async () => {
			jest.spyOn(itemService, 'getItemById').mockResolvedValue(mockItem);
			const itemFounded = await itemController.getItemById('A-01');
			expect(itemFounded).toEqual(mockItem);
		});
		it('it should be called with expected params', async () => {
			const mockFunction = jest.spyOn(itemController, 'getItemById');
			await itemController.getItemById('A-01');
			expect(mockFunction).toBeCalledWith('A-01');
		});
	});
	describe('Update Item', () => {
		it('it should be equal', async () => {
			jest
				.spyOn(itemService, 'updateItemById')
				.mockResolvedValue(mockUpdatedItem);
			const itemUpdated = await itemController.updateItemById(
				'A-01',
				mockUpdateItemDto
			);
			expect(itemUpdated).toEqual(mockUpdatedItem);
		});
		it('it should be called with expected params', async () => {
			const mockFunction = jest.spyOn(itemController, 'updateItemById');
			await itemController.updateItemById('A-01', mockUpdateItemDto);
			expect(mockFunction).toBeCalledWith('A-01', mockUpdateItemDto);
		});
	});
	describe('Delete Item', () => {
		it('it should be equal', async () => {
			const itemTextDeleted = await itemController.deleteItemById('A-01');
			expect(itemTextDeleted).toEqual('item with id: A-01 has been deleted');
		});
		it('it should be called with expected params', async () => {
			const mockFunction = jest.spyOn(itemController, 'deleteItemById');
			await itemController.deleteItemById('A-01');
			expect(mockFunction).toBeCalledWith('A-01');
		});
	});
});
