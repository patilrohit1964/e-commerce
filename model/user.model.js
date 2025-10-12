import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
      trim: true,
      select: false, //using this we can avoid password when access data with query
    },
    avatar: {
      url: {
        type: String,
        trim: true,
        default:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbTqA2RGIWAc0eJeRLBsUtZUohNxNtgEW8bA&s",
      },
      public_id: {
        type: String,
        trim: true,
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  //this function call when save user data
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

userSchema.methods = {
  comparePassword: async function (password) {
    return await bcryptjs.compare(password, this.password);
  },
};

const User = mongoose.models.User || mongoose.model("User", userSchema); //here we can write collection name as passing 3 argument
export default User;
