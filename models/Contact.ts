import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name:    { type: String, required: [true, "Name is required"], trim: true },
    email:   { type: String, required: [true, "Email is required"], trim: true, lowercase: true },
    phone:   { type: String, trim: true, default: "" },
    company: { type: String, trim: true, default: "" },
    message: { type: String, required: [true, "Message is required"] },
    status:  { type: String, enum: ["new", "read", "replied"], default: "new" },
  },
  { timestamps: true }
);

const Contact: Model<IContact> =
  mongoose.models.Contact ?? mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
