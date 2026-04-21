import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPortfolio extends Document {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  tags: string[];
  kpis: string[];
  liveUrl?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category:    { type: String, required: true },
    imageUrl:    { type: String, default: "" },
    tags:        [{ type: String }],
    kpis:        [{ type: String }],
    liveUrl:     { type: String, default: "" },
    featured:    { type: Boolean, default: false },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Portfolio: Model<IPortfolio> =
  mongoose.models.Portfolio ?? mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);

export default Portfolio;
