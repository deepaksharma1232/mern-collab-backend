const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeamSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);
