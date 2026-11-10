import mongoose, { Schema, type Model } from "mongoose";

export interface IDoctor {
  _id: mongoose.Types.ObjectId;
  slug: string;
  nameBN: string;
  nameEN: string;
  qualification: string;
  specialityBN: string;
  specialityEN: string;
  designation: string;
  departmentBN: string;
  departmentEN: string;
  hospital: string;
  experience: string;
  image: string;
  chamberTime: string;
  phone: string;
  about: string;
  fees: number;
  createdAt: Date;
  updatedAt: Date;
}

const doctorSchema = new Schema<IDoctor, Model<IDoctor>>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    // Only the doctor names are mandatory — everything else is optional
    nameBN: { type: String, required: true, trim: true },
    nameEN: { type: String, required: true, trim: true },
    qualification: { type: String, default: "", trim: true },
    specialityBN: { type: String, default: "", trim: true },
    specialityEN: { type: String, default: "", trim: true },
    designation: { type: String, default: "", trim: true },
    departmentBN: { type: String, default: "", trim: true },
    departmentEN: { type: String, default: "", trim: true },
    hospital: { type: String, default: "", trim: true },
    experience: { type: String, default: "", trim: true },
    image: { type: String, default: "" },
    chamberTime: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
    about: { type: String, default: "", trim: true },
    fees: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

const Doctor: Model<IDoctor> =
  (mongoose.models.Doctor as Model<IDoctor>) ||
  mongoose.model<IDoctor, Model<IDoctor>>("Doctor", doctorSchema);

export default Doctor;
