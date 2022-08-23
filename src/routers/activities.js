const express = require('express');
const ActivityModel = require('../models/activity');

const router = express.Router();

router.get('/', async (req, res) => {
  const activities = await ActivityModel.find();
  if (!activities) {
    res.status(404).end();
  }
  res.send(activities.map((act) => act.toJSON()));
});

router.get('/:activityId', async (req, res) => {
  console.log(req.params);
  const activity = await ActivityModel.findById(req.params.activityId);
  if (!activity) {
    res.status(404).end();
  }
  res.json(activity.toJSON());
});

router.post('/', async (req, res) => {
  console.log('Body');
  console.log(req.body);
  const activity = new ActivityModel(req.body);
  const validateResult = activity.validateSync();
  if (validateResult) {
    return res.status(400).send(validateResult);
  }
  await activity.save();
  return res.send(req.body);
});

router.patch('/:activityId', async(req, res) => {
  console.log('Edit post')
  console.log(req.params)
  console.log(req.body)
  const editAct = await ActivityModel.findByIdAndUpdate(req.params.activityId, req.body);
  if(!editAct) {
    return res.status(400).send(validateResult);
  }
  await editAct.save();
  return res.send(req.body);

});

router.delete('/:activityId', async(req, res) => {
  console.log('delete post')
  console.log(req.params)
  console.log(req.body)
  const deleteAct = await ActivityModel.findByIdAndRemove(req.params.activityId, req.body);
  if(deleteAct == -1) {
    await deleteAct.save();
  }
  return res.send('delete success');  
});

module.exports = router;
