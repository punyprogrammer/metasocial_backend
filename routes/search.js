const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//a single API endpoint
router.get("/", async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const postResults = await Post.find({
      description: { $regex: searchQuery, $options: "i" },
    });
    const userResults = await User.find({
      userName: { $regex: searchQuery, $options: "i" },
    }).select("userName _id city profilePicture");
    res
      .status(200)
      .json({
        postResults,
        userResults,
        nbHits: postResults.length + userResults.length,
      });
  } catch (error) {
    res.status(500).json(error);
  }
});
// router.get("/", (req, res) => {
//   res.status(500).json("This is search");
// });
module.exports = router;
