import { Document, Model } from 'mongoose';

export interface UserAttrs {
  email: string;
  password: string;
}

export interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

export interface UserDoc extends Document {
  email: string;
  password: string;
}

export interface UserPayload {
  id: string;
  email: string;
}
