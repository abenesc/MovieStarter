/*
 Authors:Cedrick Abenes
 Your name and student #:A01175380
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs").promises;
const { type } = require("os");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  let movieList = [ "😊👉🍿", "🤠👍","🤣👌🔥💯", "😎👉👉"]
  res.render("pages/index", {
  
  movieList: movieList
});
});

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  // Add your implementation here 
  let formData = req.body;
  //console.log(formData.movieList);
  let newList = formData.moviesList.split(", ");
  //console.log(newList)
  res.render('pages/index', {
    movieList: newList
  });
});

app.get("/myListQueryString", (req, res) => {
  let movie1 = req.query.movie1;
  let movie2 = req.query.movie2;
  let movies = [movie1, movie2]
  res.render("pages/index", {
    movieList: movies
  });
});

app.get("/search/:movieName", (req, res) => {
  let movieName = req.params.movieName
  let array1 = []
  let array2 = []
  let obj = {};
  fs.readFile('movieDescriptions.txt', { encoding: "utf-8" })
  .then((data) => {
    let newList = data.toString().split("\n")
    for (let i = 0; i < newList.length; i++) {
      let split = newList[i].split(":");  // just split once
      array1.push(split[0]); // before the dot [movie1, movie2, movie3]
      array2.push(split[1]); // after the dot [desc1, desc2, desc3]
    }

    for (let i = 0; i < array1.length; i++) {
      obj[array1[i]] = array2[i]; // return object {movie1:desc1, movie2,:desc2, movie3:desc3}
    }

    let description = ""
    if (Object.keys(obj).includes(movieName)) { //check obj keys if user_input in keys
      description += obj[movieName] // if true, add the value to variable description
      res.render("pages/searchResult", {
        movie: movieName,
        movieDescription: description
      });
    };
    res.render("pages/searchResult", { movie: "", movieDescription: "Movie could not be found." }) //movie not in list
  })
  .catch((err) => console.log(err))
});


app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});