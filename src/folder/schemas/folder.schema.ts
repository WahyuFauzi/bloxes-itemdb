import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FolderDocument = Folder & Document;

@Schema()
export class Folder {
	@Prop({ required: true })
	_id: string;

	@Prop({ required: true })
	folder_name: string;

	@Prop({
		required: true,
		type: [{ _id: { type: String }, folder_name: { type: String } }],
	})
	nested_folders: [
		{
			_id: string;
			folder_name: string;
		}
	];

	@Prop({
		required: true,
		type: [{ _id: { type: String }, item_name: { type: String } }],
	})
	items: [
		{
			_id: string;
			item_name: string;
		}
	];

	@Prop({ required: true })
	created_at: string;

	@Prop({ required: true })
	updated_at: string;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
