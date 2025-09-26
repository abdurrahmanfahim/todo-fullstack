const Todo = require("../models/todoModel");

const createTodoController = async (req, res) => {
  try {
    const { text } = req.body;
    let mediaUri = null;
    let mediaType = null;

    if (req.file) {
      mediaUri = req.file.path;
      if (req.file.mimetype.startsWith("image")) {
        mediaType = "image";
      }
      if (req.file.mimetype.startsWith("video")) {
        mediaType = "video";
      }
    }

    console.log(req.user);

    const todo = new Todo({
      userId: req.user.id,
      text,
      mediaUri,
      mediaType,
    });

    await todo.save();
    res.send({ message: "todo created" });
  } catch (error) {
    res.send({ error: error.message });
  }
};

const getAllTodoController = async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id }).populate("userId");
  res.send(todos);
};

const updateTodoController = async (req, res) => {
  try {
    const { text } = req.body;

    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!todo) {
      return res.send({ error: "Todo not Found" });
    }

    if (text) {
      todo.text = text;
    }

    if (req.file) {
      todo.mediaUri = req.file.path;

      if (req.file.mimetype.startsWith("image")) {
        todo.mediaType = "image";
      }

      if (req.file.mimetype.startsWith("video")) {
        todo.mediaType = "video";
      }
    }

    await todo.save();
    res.send({ Todo: todo });
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports = {
  createTodoController,
  getAllTodoController,
  updateTodoController,
};
