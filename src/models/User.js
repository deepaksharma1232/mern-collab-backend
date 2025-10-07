const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['ADMIN','MANAGER','MEMBER'], default: 'MEMBER' },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
