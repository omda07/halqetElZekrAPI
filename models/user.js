const mongoose = require("mongoose");
const joi = require("joi");

const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

// *schema like model of user
const UserSchema = new mongoose.Schema({
  userName: { type: String, minlength: 3, maxlength: 44 },
  noId: { type: String, default: "" },
  email: { type: String, lowercase: true, required: true, maxlength: 1024 },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 },
  isAdmin: { type: Boolean, default: false   },

});

//*validation on user inputs register
function validateUser(user) {
  const JoiSchema = joi
    .object({
      userName: joi
        .string()
        .min(3)
        .max(44)
        .lowercase(),
      email: joi
        .string()
        .email()
        .max(1024)
        .required()
        .trim(),

      password: joiPassword
        .string()
        .minOfLowercase(7)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required()
        .messages({
          "password.minOfLowercase":
            "{#label} should contain at least {#min} lowercase character",
          "password.minOfNumeric":
            "{#label} should contain at least {#min} numeric character",
          "password.noWhiteSpaces": "{#label} should not contain white spaces",
        }),
    })
    .options({ abortEarly: false });

  return JoiSchema.validate(user);
}

//*validation on user inputs in login
function validateUserLogin(user) {
  const JoiSchema = joi
    .object({
      email: joi
        .string()
        .email()
        .min(3)
        .max(256)
        .required()
        .trim(),

      password: joiPassword
        .string()

        .noWhiteSpaces()
        .required(),
    })
    .options({ abortEarly: false });

  return JoiSchema.validate(user);
}

//*export to use this scehma or function in different files
module.exports = mongoose.model("User", UserSchema);

module.exports.validateUser = validateUser;
module.exports.validateUserLogin = validateUserLogin;
