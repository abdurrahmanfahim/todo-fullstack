const router = require("express").Router();
const { createTodoController, getAllTodoController, updateTodoController } = require("../controllers/todoController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/create",
  authMiddleware,
  upload.single("avatar"),
  createTodoController
);

router.get(
  "/getall",
  authMiddleware,
  getAllTodoController
);

router.put(
  "/update/:id",
  authMiddleware,
  upload.single("avatar"),
  updateTodoController
);

module.exports = router;
