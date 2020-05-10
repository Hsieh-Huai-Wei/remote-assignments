const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const dbConnection = require("./database");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.urlencoded({ extended: false }));

// Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set cookie session middlewares
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 60 * 60 * 1000, // 1hr
  })
);

const ifNotSignin = (req, res, next) => {
  if (!req.session.isSignIn) {
    return res.render("home_page");
  }
  next();
};

const ifSignin = (req, res, next) => {
  if (req.session.isSignIn) {
    return res.redirect("/member_page");
  }
  next();
};

app.get("/", ifNotSignin, (req, res, next) => {
  dbConnection
    .execute("SELECT `email` FROM `user` WHERE `id`=?", [req.session.userID])
    .then(([rows]) => {
      res.render("member_page", {
        name: rows[0].name,
      });
    });
});

// Sign-up page
app.post(
  "/signup",
  ifSignin,
  // set express-validator
  [
    body("user_email", "Invalid email address!")
      .isEmail()
      .custom((value) => {
        return dbConnection
          .execute("SELECT `email` FROM `user` WHERE `email`=?", [value])
          .then(([rows]) => {
            if (rows.length > 0) {
              return Promise.reject("This E-mail already in use!");
            }
            return true;
          });
      }),
    body("user_pass", "The password must be of minimum length 6 characters")
      .trim()
      .isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const validation_result = validationResult(req);
    const { user_pass, user_email } = req.body;
    if (validation_result.isEmpty()) {
      // set bcrypt hash code
      bcrypt
        .hash(user_pass, 12)
        .then((hash_pass) => {
          dbConnection
            .execute("INSERT INTO `user`(`email`,`password`) VALUES(?,?)", [
              user_email,
              hash_pass,
            ])
            .then((result) => {
              res.send(
                `your account has been created successfully, Now you can <a href="/">Signin</a>`
              );
            })
            .catch((err) => {
              if (err) throw err;
            });
        })
        .catch((err) => {
          if (err) throw err;
        });
    } else {
      let allErrors = validation_result.errors.map((error) => {
        return error.msg;
      });
      res.render("home_page", {
        signup_error: allErrors,
        old_data: req.body,
      });
    }
  }
);

// Sign-in page
app.post(
  "/",
  ifSignin,
  [
    body("user_email").custom((value) => {
      return dbConnection
        .execute("SELECT `email` FROM `user` WHERE `email`=?", [value])
        .then(([rows]) => {
          if (rows.length == 1) {
            return true;
          }
          return Promise.reject("Invalid Email Address!");
        });
    }),
    body("user_pass", "Password is empty!").trim().not().isEmpty(),
  ],
  (req, res) => {
    const validation_result = validationResult(req);
    const { user_pass, user_email } = req.body;
    if (validation_result.isEmpty()) {
      dbConnection
        .execute("SELECT * FROM `user` WHERE `email`=?", [user_email])
        .then(([rows]) => {
          // console.log(rows[0].password);
          bcrypt
            .compare(user_pass, rows[0].password)
            .then((compare_result) => {
              if (compare_result === true) {
                req.session.isSignIn = true;
                req.session.userID = rows[0].id;

                res.redirect("/");
              } else {
                res.render("home_page", {
                  signin_errors: ["Invalid Password!"],
                });
              }
            })
            .catch((err) => {
              if (err) throw err;
            });
        })
        .catch((err) => {
          if (err) throw err;
        });
    } else {
      let allErrors = validation_result.errors.map((error) => {
        return error.msg;
      });
      res.render("home_page", {
        signin_errors: allErrors,
      });
    }
  }
);

// Sign out page
app.get("/signout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.use("/", (req, res) => {
  res.status(404).send("<h1>404 Page Not Found!</h1>");
});

app.listen(3000, () => console.log("Server is running..."));
