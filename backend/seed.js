import mongoose from "mongoose";
import doctorModel from "./models/doctorModel.js";
import bcrypt from "bcrypt";
import "dotenv/config";

const doctors = [
  {
    name: "Dr. Aditi Deshmukh",
    email: "aditi@doctor.com",
    password: "doctor123",
    image: "https://thumbs.dreamstime.com/b/young-indian-female-doctor-showing-thumbs-up-white-background-62407006.jpg",
    speciality: "Cardiologist",
    degree: "MD, DM Cardiology",
    experience: "15 years",
    about: "Experienced cardiologist specializing in preventive heart care and long-term cardiac management.",
    fees: 1500,
    address: { line1: "Apollo Hospital", city: "Mumbai", state: "Maharashtra" },
    date: Date.now(),
    slots_booked: {}
  },
  {
    name: "Dr. Rohan Kulkarni",
    email: "rohan@doctor.com",
    password: "doctor123",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    speciality: "Neurologist",
    degree: "MD, DM Neurology",
    experience: "12 years",
    about: "Specializing in neurological disorders and brain health.",
    fees: 1800,
    address: { line1: "Fortis Hospital", city: "Delhi", state: "Delhi" },
    date: Date.now(),
    slots_booked: {}
  },
  {
    name: "Dr. Priya Sharma",
    email: "priya@doctor.com",
    password: "doctor123",
    image: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    speciality: "Gynecologist",
    degree: "MD, DGO",
    experience: "14 years",
    about: "Specialist in women's health and reproductive issues.",
    fees: 1300,
    address: { line1: "Apollo Cradle", city: "Bangalore", state: "Karnataka" },
    date: Date.now(),
    slots_booked: {}
  },
  {
    name: "Dr. Neha Joshi",
    email: "neha@doctor.com",
    password: "doctor123",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop&crop=face",
    speciality: "Dermatologist",
    degree: "MD, DDVL",
    experience: "8 years",
    about: "Skin specialist treating various dermatological conditions.",
    fees: 1200,
    address: { line1: "Manipal Hospital", city: "Hyderabad", state: "Telangana" },
    date: Date.now(),
    slots_booked: {}
  },
  {
    name: "Dr. Suresh Naik",
    email: "suresh@doctor.com",
    password: "doctor123",
    image: "https://plus.unsplash.com/premium_photo-1661699704375-847063f963c6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    speciality: "General Physician",
    degree: "MD, MBBS",
    experience: "20 years",
    about: "Experienced general physician for all common ailments.",
    fees: 800,
    address: { line1: "City Hospital", city: "Chennai", state: "Tamil Nadu" },
    date: Date.now(),
    slots_booked: {}
  }
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const salt = await bcrypt.genSalt(10);
    const hashedDoctors = await Promise.all(
      doctors.map(async (doctor) => ({
        ...doctor,
        password: await bcrypt.hash(doctor.password, salt),
      }))
    );

    await doctorModel.deleteMany({});
    console.log("Cleared existing doctors");

    await doctorModel.insertMany(hashedDoctors);
    console.log("Seeded 5 doctors successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding doctors:", error);
    process.exit(1);
  }
};

seedDoctors();