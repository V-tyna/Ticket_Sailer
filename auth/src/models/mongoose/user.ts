import { model, Schema } from 'mongoose';

import { PasswordManager } from '../../services/password-manager';
import { UserAttrs, UserDoc, UserModel } from '../interfaces/user';

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
},
  {
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      }
    }
  });

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordManager.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

const User = model<UserDoc, UserModel>('User', userSchema);

export { User };
