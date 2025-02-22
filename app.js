require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const {
  validatePostMovie,
  validatePutMovie,
  validatePostUser,
  validatePutUser,
} = require("./validators");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
  checkIdInPayload,
} = require("./auth");

//Login Routes

// Movies Routes (CRUD)
//Public routes
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", validatePostUser, hashPassword, userHandlers.postUser);
app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

//Authentification route
app.use(verifyToken);

app.post("/api/movies", validatePostMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validatePutMovie, movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.put(
  "/api/users/:id",
  checkIdInPayload,
  validatePutUser,
  hashPassword,
  userHandlers.updateUser
);
app.delete("/api/users/:id", checkIdInPayload, userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
