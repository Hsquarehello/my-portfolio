import mongoose, { Schema, type Model } from "mongoose";

const skillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Database & Cloud", "Tools & Others"],
    },
    proficiency: { type: Number, required: true, min: 0, max: 100 },
    iconName: { type: String, trim: true },
  },
  { timestamps: true },
);

const Skill: Model<unknown> =
  mongoose.models.Skill || mongoose.model("Skill", skillSchema);

export default Skill;
