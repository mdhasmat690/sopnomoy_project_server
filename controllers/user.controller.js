const { getDb } = require("../utils/dbConnect");
const ObjectId = require("mongodb").ObjectId;

module.exports.saveUserInfo = async (req, res, next) => {
  try {
    const db = getDb();
    const tool = req.body;

    const result = await db.collection("users").insertOne(tool);

    if (!result.insertedId) {
      return res
        .status(400)
        .send({ status: false, error: "Something went wrong!" });
    }

    res.send({
      success: true,
      message: `Tool added with id: ${result.insertedId}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  try {
    const db = getDb();
    const user = req.body;
    console.log(user);

    const filter = { email: user.email };
    const options = { upsert: true };
    const updateDoc = { $set: user };

    const result = await db
      .collection("users")
      .updateOne(filter, updateDoc, options);

    if (!result.upsertedId) {
      return res
        .status(400)
        .send({ status: false, error: "Something went wrong!" });
    }

    res.send({
      success: true,
      message: `Tool added with id: ${result.upsertedId}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserDetail = async (req, res, next) => {
  try {
    const db = getDb();
    const email = req.params.id;

    const tool = await db.collection("users").findOne({ email: email });

    if (!tool) {
      return res
        .status(400)
        .json({ success: false, error: "Couldn't find a tool with this id" });
    }

    res.status(200).json({ success: true, data: tool });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserMore = async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params.id;
    console.log(req.body);
    const tool = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body });

    if (!tool.modifiedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Couldn't update the tool" });
    }

    res
      .status(200)
      .json({ success: true, message: "Successfully updated the tool" });
  } catch (error) {
    next(error);
  }
};
