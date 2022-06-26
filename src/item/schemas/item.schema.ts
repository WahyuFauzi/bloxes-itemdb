import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
	@Prop({ required: true })
	_id: string;

	@Prop({ required: true })
	itemName: string;

	@Prop({ required: true })
	itemType: string;

	@Prop({ required: true })
	itemTotalSize: number;

	@Prop({ required: true })
	itemChunks: number;

	@Prop({ required: true })
	createdAt: string;

	@Prop({ required: true })
	updatedAt: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
