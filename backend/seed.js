import mongoose from "mongoose";
import doctorModel from "./models/doctorModel.js";
import bcrypt from "bcrypt";
import "dotenv/config";

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    email: "sarah@doctor.com",
    password: "doctor123",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    speciality: "Cardiologist",
    degree: "MD, DM Cardiology",
    experience: "15 years",
    about: "Experienced cardiologist specializing in heart disease treatment and prevention.",
    fees: 1500,
    address: { line1: "Apollo Hospital", city: "Mumbai", state: "Maharashtra" },
    date: Date.now(),
    slots_booked: {}
  },
  {
    name: "Dr. Michael Chen",
    email: "michael@doctor.com",
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
    name: "Dr. Emily Watson",
    email: "emily@doctor.com",
    password: "doctor123",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
    speciality: "Pediatrician",
    degree: "MD, DCH",
    experience: "10 years",
    about: "Dedicated pediatrician with expertise in child healthcare.",
    fees: 1000,
    address: { line1: "Cloudnine Hospital", city: "Bangalore", state: "Karnataka" },
    date: Date.now(),
    slots_booked: {}
  },
  {
    name: "Dr. Raj Patel",
    email: "raj@doctor.com",
    password: "doctor123",
    image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=400&h=400&fit=crop&crop=face",
    speciality: "Orthopedic",
    degree: "MS, DNB Ortho",
    experience: "18 years",
    about: "Expert in orthopedic surgeries and joint replacements.",
    fees: 2000,
    address: { line1: "Saibaba Hospital", city: "Pune", state: "Maharashtra" },
    date: Date.now(),
    slots_booked: {}
  },
  {
    name: "Dr. Lisa Anderson",
    email: "lisa@doctor.com",
    password: "doctor123",
    image: "https://images.unsplash.com/photo-1643297654416-053af2a66c7c?w=400&h=400&fit=crop&crop=face",
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
    name: "Dr. James Wilson",
    email: "james@doctor.com",
    password: "doctor123",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face",
    speciality: "General Physician",
    degree: "MD, MBBS",
    experience: "20 years",
    about: "Experienced general physician for all common ailments.",
    fees: 800,
    address: { line1: "City Hospital", city: "Chennai", state: "Tamil Nadu" },
    date: Date.now(),
    slots_booked: {}
  },
  {
    name: "Dr. Priya Sharma",
    email: "priya@doctor.com",
    password: "doctor123",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop&crop=face",
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
    name: "Dr. Ankit Gupta",
    email: "ankit@doctor.com",
    password: "doctor123",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    speciality: "ENT Specialist",
    degree: "MS, DLO",
    experience: "11 years",
    about: "Expert in ear, nose, and throat disorders.",
    fees: 1100,
    address: { line1: "Aster Hospital", city: "Kochi", state: "Kerala" },
    date: Date.now(),
    slots_booked: {}
  },
  {
    name: "Dr. Maria Garcia",
    email: "maria@doctor.com",
    password: "doctor123",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop&crop=face",
    speciality: "Psychiatrist",
    degree: "MD, DPM",
    experience: "9 years",
    about: "Mental health specialist treating anxiety and depression.",
    fees: 1600,
    address: { line1: "Mind Care Hospital", city: "Mumbai", state: "Maharashtra" },
    date: Date.now(),
    slots_booked: {}
  },
  {
    name: "Dr. David Kumar",
    email: "david@doctor.com",
    password: "doctor123",
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=400&fit=crop&crop=face",
    speciality: "Ophthalmologist",
    degree: "MS, DOMS",
    experience: "16 years",
    about: "Eye specialist for all vision problems and surgeries.",
    fees: 1400,
    address: { line1: "Aravind Eye Hospital", city: "Coimbatore", state: "Tamil Nadu" },
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
    console.log("Seeded 10 doctors successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding doctors:", error);
    process.exit(1);
  }
};

seedDoctors();