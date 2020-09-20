const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use("/css", express.static(__dirname + "/dist/css"));
app.use("/img", express.static(__dirname + "/dist/img"));
app.use("/js", express.static(__dirname + "/dist/js"));

app.set("views", __dirname + "/dist/views");

app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("home"));
app.get("/main", (req, res) => res.render("main"));

app.listen(port, () => console.log(`Listening on ${port}`));
