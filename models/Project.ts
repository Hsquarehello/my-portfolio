import mongoose, { Schema, type Model } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    category: {
      type: String,
      required: true,
      enum: ["Full-stack", "Frontend", "Backend"],
    },
    technologies: {
      type: [String],
      required: true,
      validate: {
        validator: (values: string[]) => values.length > 0,
        message: "At least one technology is required",
      },
    },
    githubUrl: { type: String, trim: true },
    liveUrl: { type: String, trim: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Project: Model<unknown> =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
