import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  designation: string;
  company: string;
  content: string;
  rating: number;
  avatarInitials: string;
  featured: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name:           { type: String, required: true, trim: true },
    designation:    { type: String, required: true },
    company:        { type: String, required: true },
    content:        { type: String, required: true },
    rating:         { type: Number, default: 5, min: 1, max: 5 },
    avatarInitials: { type: String, default: "" },
    featured:       { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ?? mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
