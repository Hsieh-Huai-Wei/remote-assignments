const express = require("express");
const app = express();
const port = 3000;
const querystring = require("querystring");

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.send(`Hello, My Server!`);
});

app.get("/getData", (req, res) => {
  let result = "";

  if (req.query.number) {
    // console.log(req.query.number);
    let number = parseFloat(req.query.number);
    if (isNaN(number) || number <= 0) {
      result = "Wrong Parameters";
    } else {
      result = ((1 + number) * number) / 2;
    }
  } else {
    result = "Lack of Parameter";
  }
  res.send(`${result}`);
});

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});

// ----------------cookie---------------

var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
app.use(cookieParser());

app.get("/myName", (req, res) => {
  let userName = req.cookies.name;
  if (userName) {
    res.send(`You are ${userName}`);
  } else {
    return res.redirect("/trackName");
  }
});

app.get("/trackName", (req, res) => {
  if (req.query.name) {
    let getName = req.query.name;
    res.cookie("name", `${getName}`);
    res.send("Your name is registered!");
  } else {
    return res.redirect("login.html");
  }
});

//Route for destroying cookie
app.get("/logout", (req, res) => {
  //it will clear the userData cookie
  res.clearCookie("name");
  res.send("user logout successfully");
});
