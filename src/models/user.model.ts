import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Please provide an username'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide an username'],
    },
    password: {
      type: String,
      required: [true, 'Please provide an username'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  { timestamps: true }
);

// In nextjs it is work on edge framework so sometimes it doesnot know about the model and connection with the database so we are going to check for model and if not exist we'll create it

export const User = models.users || model('users', userSchema);
