import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("signup endpoint");
});
router.get("/signin", (req, res) => {
  res.send("signin endpoint");
});
router.get("/signout", (req, res) => {
  res.send("signout endpoint");
});

export default router;
