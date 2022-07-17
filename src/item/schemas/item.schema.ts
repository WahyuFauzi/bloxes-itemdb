import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
	@Prop({ required: true })
	_id: string;

	@Prop({ required: true })
	item_name: string;

	@Prop({ required: true })
	item_total_size: number;

	@Prop({ required: true })
	created_at: string;

	@Prop({ required: true })
	updated_at: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
