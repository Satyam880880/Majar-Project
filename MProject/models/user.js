// const { types } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email :{
    type : String,
    require : true
  },
});

 // Username,password automatically created mongose
userSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model("User", userSchema);
const User = mongoose.model("User", userSchema);

module.exports = User;