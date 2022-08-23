const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    actType: { type: String, enum: ['Running', 'Swimming', 'Hiking', 'Biking'], required: true },
    hour: { type: Number, required: true },
    minute: { type: Number, required: true },
    date: { type: Date, required: true },
    descrition: { type: String, required: true }, 
  },
  {
    statics: {
      findByType: async function (type) {
        return this.find({ type });
      },
    },
  }
);

const ActivityModel = mongoose.model('activity', activitySchema);

module.exports = ActivityModel;
