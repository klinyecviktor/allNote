const mongoose = require('../mongoConnection'),
  Schema = mongoose.Schema;


function dateValidator(value) {
  // `this` is the mongoose document
  return this.beginningDate <= value;
}

const taskScheme = new Schema({
  name: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  // Minutes
  neededTime: {
    type: Number,
    required: true,
    default: 60 // One hour
  },
  beginningDate: {
    type: Date,
    default: Date.now(),
    required: true
  },
  endDate: {
    type: Date,
    default: Date.now(),
    required: true,
    validate: [dateValidator, 'End Date must be bigger or equal than Beginning Date']
  },
  // TODO: List of rewards
  rewards: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 3
  },
  hasSubtasks: {
    type: Boolean,
    required: true,
    default: false
  },
  subtasks: [Schema.Types.ObjectId]
})

module.exports = mongoose.model('Task', taskScheme)
