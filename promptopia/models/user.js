import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema);


// model("User") will return the User model if it exists, or create it if it doesn't
// models.User will return the User model if it exists, or undefined if it doesn't
// This is useful when you want to check if a model exists before creating it
// User will have the value of the User model, whether it was created or already existed

export default User;