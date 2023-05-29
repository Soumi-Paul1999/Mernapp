const express = require("express");
const colors = require("colors");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../Controllers/GoalControllers");

const {protect} = require("../middleware/authMiddleware")

router.route("/").get(protect,getGoals).post(protect,setGoals);
router.route("/:id").delete(protect,deleteGoals).put(protect,updateGoals);

module.exports = router;
