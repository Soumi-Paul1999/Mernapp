const asyncHandler = require("express-async-handler");
const Goal = require("../Models/GoalModel");
const User = require('../Models/userModels')
// get goals
//route get/api/goals
//access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user:req.user.id});
  res.status(200).json(goals);
});

// set goals
//route get/api/goals
//access private
const setGoals = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (!req.body.text) {
    // res.send(400)
    // throw new Error("please add a text field");
    res.status(200).json({ message: "plese enter the text" });
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// update goals
//route get/api/goals
//access private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not Found");
  }
  
if(!req.user){
  res.status(401)
  throw new Error('User not found')

}
if(goal.user.toString()!==req.user.id){
  res.status(401)
  throw new Error("user not authorized")
}

  const updateGoals = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateGoals);
});

// delete goals
//route get/api/goals
//access private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not Found");
  }
  if(!req.user){
    req.status(401)
    throw new Error('User not found')

  }

  if(goal.user.toString()!==req.user.id){
    res.status(401)
    throw new Error('User not authorized')
  }
  await goal.remove();
  
  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
