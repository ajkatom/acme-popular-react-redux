const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const db = require("./db");
const { User } = db.model;
app.use(require("body-parser").json());
app.use(express.static(path.join(__dirname, "./dist")));

app.listen(port, () => {
  console.log(`listing on port ${port}`);
});

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.get("/api/users", (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});
app.delete("/api/users/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(res.sendStatus(204))
    .catch(next);
});
db
  .syncSeed()
  .then(() => {
    console.log("synced and seeded");
  })
  .catch(console.error);
