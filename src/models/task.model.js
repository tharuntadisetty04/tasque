import mongoose, { Schema } from "mongoose";

const taksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
      trim: true,
    },
    description: {
      type: String,
      maxLength: 500,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taksSchema);
