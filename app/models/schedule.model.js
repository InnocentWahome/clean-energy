const { Schema, model } = require('mongoose');

const ScheduleSchema = new Schema({
  phoneNumber: {
    required: true,
    type: String,
  },
  date: {
    required: false,
    type: String,
  },
  time: {
    required: false,
    type: String,
  },
});

module.exports = model('Schedule', ScheduleSchema);
