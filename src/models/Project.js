const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
