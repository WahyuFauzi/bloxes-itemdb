import { ItemService } from './item.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

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
	itemType: 'Anggora',
	itemTotalSize: 9,
	itemChunks: 9,
};

const mockUpdateItemDto: UpdateItemDto = {
	itemName: 'Joseph',
	itemTotalSize: 9,
	itemChunks: 9,
};

describe('Item Service', () => {
	let itemService: ItemService;
	let model: Model<Item>;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ItemService,
				{
					provide: getModelToken('Item'),
					useValue: {
						create: jest.fn(),
						findById: jest.fn(),
						findByIdAndUpdate: jest.fn(),
						findByIdAndDelete: jest.fn(),
					},
				},
			],
		}).compile();

		itemService = module.get<ItemService>(ItemService);
		model = module.get<Model<Item>>(getModelToken('Item'));
	});

	it('service should be defined', async () => {
		expect(itemService).toBeDefined();
	});

	describe('Create Item', () => {
		it('it should be equal', async () => {
			jest
				.spyOn(model, 'create')
				.mockImplementationOnce(() => Promise.resolve(mockItem));
			const itemCreated = await itemService.createItem(mockCreateItemDto);
			expect(itemCreated).toEqual(mockItem);
		});
		it('it should be called with expected params', async () => {
			const mockFunction = jest.spyOn(itemService, 'createItem');
			itemService.createItem(mockCreateItemDto);
			expect(mockFunction).toBeCalledWith(mockCreateItemDto);
		});
	});
	describe('Get Item', () => {
		it('it should be equal', async () => {
			jest.spyOn(model, 'findById').mockReturnValue({
				exec: jest.fn().mockResolvedValueOnce(mockItem),
			} as any);
			const itemFounded = await itemService.getItemById('A-01');
			expect(itemFounded).toEqual(mockItem);
		});
		it('it should be called with expected params', async () => {
			const mockFunction = jest.spyOn(itemService, 'getItemById');
			itemService.getItemById('A-01');
			expect(mockFunction).toBeCalledWith('A-01');
		});
	});
	describe('Update Item', () => {
		it('it should be equal', async () => {
			jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
				exec: jest.fn().mockResolvedValueOnce(mockUpdatedItem),
			} as any);
			const itemUpdated = await itemService.updateItemById(
				'A-01',
				mockUpdateItemDto
			);
			expect(itemUpdated).toEqual(mockUpdatedItem);
		});
		it('it should be called with expected params', async () => {
			const mockFunction = jest.spyOn(itemService, 'updateItemById');
			itemService.updateItemById('A-01', mockUpdateItemDto);
			expect(mockFunction).toBeCalledWith('A-01', mockUpdateItemDto);
		});
	});
	describe('Delete Item', () => {
		it('it should be called with expected params', async () => {
			jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
				exec: jest.fn().mockResolvedValueOnce(mockItem),
			} as any);
			const mockFunction = jest.spyOn(itemService, 'deleteItemById');
			itemService.deleteItemById('A-01');
			expect(mockFunction).toBeCalledWith('A-01');
		});
	});
});
