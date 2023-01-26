const router = require("express").Router();
const User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/fetch").get((req, res) => {
  console.log(req.query);
  User.find({ email: req.query.email })
    .then((users) => res.json(users[0]))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  //   let userId;

  const name = req.body.name;
  const email = req.body.email;

  const newUser = new User({ name, email });

  newUser
    .save()
    .then((user) => {
      console.log("User: ", user);
      res.json({
        success: true,
        id: user.id,
        name: user.name,
        email: user.email,
        premium: user.premium,
        premiumUntil: user.premiumUntil,
        message: "User Created!",
      });
    })
    .catch((err) => {
      if (err.toString().includes("E11000 duplicate key error collection"))
        User.find({ email: email })
          .then((user) => {
            console.log("User: ", user[0]._id);
            res.json({
              success: true,
              id: user[0]._id,
              name: user[0].name,
              email: user[0].email,
              premium: user[0].premium,
              premiumUntil: user[0].premiumUntil,
              message: "Fetched duplicate key ID.",
            });
          })
          .catch((err) => res.status(400).json("Error: " + err));
      else
        res.status(400).json({
          success: false,
          duplicate: false,
          message: "Error: " + err,
        });
    });
});

router.route("/update-subscription").patch((req, res) => {
  const id = req.body.id;

  User.findById(id).then((user) => {
    console.log(user);
    user.premium = true;
    user.premiumUntil = new Date(Date.now());
    user.premiumUntil.setHours(user.premiumUntil.getHours() + 72);

    user
      .save()
      .then(() =>
        res.json({
          success: true,
          message: `Premium user until ${user.premiumUntil.toDateString()}`,
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error: " + err);
      });
  });
});

module.exports = router;
