const express = require("express");
const fs = require("fs");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    let movieList = ["😊👉🍿", "🤠👍", "🤣👌🔥💯", "😎👉👉"]
    res.render("pages/index", {

        movieList: movieList
    });
});

app.get("/myList", (req, res) => {

    let item1 = req.query.computer;

    let item2 = req.query.phone;

    let item3 = req.query.watch;

    console.log(item1, item2, item3);

});


app.listen(3000, () => {
    console.log("Server is running on port 3000 🚀");
});