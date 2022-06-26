import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FolderDocument = Folder & Document;

@Schema()
export class Folder {
	@Prop({ required: true })
	_id: string;

	@Prop({ required: true })
	folderName: string;

	@Prop({ required: true, type: [String] })
	nestedFolders: string[];

	@Prop({ required: true, type: [String] })
	items: string[];

	@Prop({ required: true })
	createdAt: string;

	@Prop({ required: true })
	updatedAt: string;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
