const Joi = require("joi");
const { body, validationResult } = require("express-validator");

const validatePostMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const errors = [];
  if (title == null) {
    errors.push({ field: "title", message: "This field is required" });
  } else if (title.length >= 255) {
    errors.push({
      field: "title",
      message: "Should contain less than 255 characters",
    });
  }
  if (director == null) {
    errors.push({ field: "director", message: "This field is required" });
  }
  if (year == null) {
    errors.push({ field: "year", message: "This field is required" });
  }
  if (color == null) {
    errors.push({ field: "color", message: "This field is required" });
  }
  if (duration == null) {
    errors.push({ field: "duration", message: "This field is required" });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

const movieSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.string().max(255).required(),
  color: Joi.string().max(255).required(),
  duration: Joi.number().required(),
});

const validatePutMovie = (req, res, next) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;
  const { error } = movieSchema.validate(
    { title, director, year, color, duration, id },
    { abortEarly: false }
  );
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

// const validateUser = [
//   body("email").isEmail(),
//   body("firstname").isLength({ max: 255 }),
//   body("lastname").isLength({ max: 255 }),
//   body("city").isLength({ max: 255 }),
//   body("language").isLength({ max: 255 }),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(422).json({ validationErrors: errors.array() });
//     } else {
//       next();
//     }
//   },
// ];

const userPostSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  city: Joi.string().max(255).required(),
  language: Joi.string().max(255).required(),
});

const validatePostUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;
  const { error } = userPostSchema.validate(
    { email, firstname, lastname, city, language },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const userPutSchema = Joi.object({
  id: Joi.number().required(),
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  city: Joi.string().max(255).required(),
  language: Joi.string().max(255).required(),
});

const validatePutUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;
  const { error } = userPutSchema.validate(
    { email, firstname, lastname, city, language, id },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validatePostMovie,
  validatePutMovie,
  validatePostUser,
  validatePutUser,
};
