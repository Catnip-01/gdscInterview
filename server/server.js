const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const MONGODB_URI =
  "mongodb+srv://shantanupandey03:shantanupandey03@cluster0.yfg5y.mongodb.net/dsc?retryWrites=true&w=majority&appName=Cluster0";

const nameArray = ["Shantanu", "Yash", "Davin"];
const emailArray = ["shantanu@gmail.com", "yash@gmail.com", "davin@gmail.com"];
const scoreArray = [7, 8, 9];

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo connected");
  });

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  score: Number,
});

const candidateModel = mongoose.model("candidate", candidateSchema);

app.post("/insertCandidate", (req, res) => {
  console.log(req.body);
  try {
    candidateModel.insertMany([req.body]);
    console.log("successful insertion");
  } catch (err) {
    console.log("error : " + err);
  }

  res.status(200).json("successful insertion");
});

app.get("/", (req, res) => {
  res.redirect("https://www.youtube.com/watch?v=BT9h5ifR1tY");
});

app.get("/getCandidates", async (req, res) => {
  try {
    const candidates = await candidateModel.find();
    res.json(
      candidates.sort(function (a, b) {
        return b.score - a.score;
      })
    );
  } catch (err) {
    console.log("error while fetching : " + err);
  }
});

app.get("/getRanking", (req, res) => {
  res.send(
    candidates.sort(function (a, b) {
      return b.score - a.score;
    })
  );
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
