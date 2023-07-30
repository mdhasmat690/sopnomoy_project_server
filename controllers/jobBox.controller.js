const { getDb } = require("../utils/dbConnect");
const ObjectId = require("mongodb").ObjectId;

module.exports.jobPost = async (req, res, next) => {
  try {
    const db = getDb();
    const data = req.body;

    const result = await db.collection("jobs").insertOne(data);
    if (!result.insertedId) {
      return res
        .status(400)
        .send({ status: false, error: "something went to wrong" });
    }

    res.send({
      success: true,
      message: `Tool added with id: ${result.insertedId}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getjob = async (req, res, next) => {
  try {
    const db = getDb();
    const { email } = req.query;

    let result;

    if (email) {
      result = await db.collection("jobs").find({ email: email }).toArray();
    } else {
      result = await db.collection("jobs").find({}).toArray();
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteSingleJob = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.query;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not a valid collection id." });
    }

    // console.log(id);

    const result = await db.collection("jobs").deleteOne({
      _id: new ObjectId(id),
    });

    if (!result.deletedCount) {
      return res
        .status(400)
        .send({ status: false, error: "Something went wrong!" });
    }

    res.status(200).send({ success: true, id: id });
  } catch (error) {
    next(error);
  }
};

module.exports.getSingleData = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not a valid collection id." });
    }

    const result = await db.collection("jobs").findOne({
      _id: new ObjectId(id),
    });
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

/* module.exports.deleteJob = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not a valid collection id." });
    }

    console.log(id);

    const result = await db.collection("jobs").deleteOne({
      _id: new ObjectId(id),
    });

    if (!result.deletedCount) {
      return res
        .status(400)
        .send({ status: false, error: "Something went wrong!" });
    }

    res.status(200).send({ success: true, id: id });
  } catch (error) {
    next(error);
  }
}; */
