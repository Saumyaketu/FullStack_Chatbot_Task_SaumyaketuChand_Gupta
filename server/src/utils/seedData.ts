import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { Enquiry } from '../models/Enquiry';

const initialSeeds = [
  {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    phone: '+91 98765 43210',
    userType: 'Student',
    serviceOrCourse: 'DGCA Remote Pilot Certification (RPC)',
    message: 'I am a final year aerospace engineering student interested in getting certified for commercial drone operations.',
    status: 'New',
    source: 'Chatbot',
    adminNotes: 'Candidate expressed interest in weekend batch.',
  },
  {
    name: 'Pooja Iyer',
    email: 'pooja.iyer@agrofresh.in',
    phone: '+91 98112 34567',
    userType: 'Customer',
    serviceOrCourse: 'Precision Agriculture Spraying',
    message: 'We have 120 acres of orchards in Maharashtra and need drone spraying services for fertilizer and pest management.',
    status: 'Contacted',
    source: 'Contact Form',
    adminNotes: 'Introductory call completed; quotation sent for 120-acre pilot project.',
  },
  {
    name: 'Vikramaditya Construction Ltd (Rohan Mehta)',
    email: 'rohan.mehta@vbuilders.com',
    phone: '+91 99201 55432',
    userType: 'Customer',
    serviceOrCourse: 'Aerial Surveying & 3D Mapping',
    message: 'Need topographic mapping and contour survey for upcoming highway bypass expansion project (45 km corridor).',
    status: 'In Progress',
    source: 'Chatbot',
    adminNotes: 'Technical team reviewing GCP coordinates. Meeting scheduled on Friday.',
  },
  {
    name: 'Sneha Kulkarni',
    email: 'sneha.kulkarni@cinestudios.co',
    phone: '+91 97654 88712',
    userType: 'Customer',
    serviceOrCourse: 'High-Resolution Aerial Cinematography',
    message: 'Looking for dual-operator FPV and heavy-lifter cinema drone team for an upcoming tourism commercial shoot.',
    status: 'Closed',
    source: 'Contact Form',
    adminNotes: 'Contract signed and pilot dispatched for shoot in Goa.',
  },
  {
    name: 'Karan Patel',
    email: 'karan.patel@edu.in',
    phone: '+91 98220 11993',
    userType: 'Student',
    serviceOrCourse: 'Advanced Drone Mapping & Photogrammetry',
    message: 'Does DroneTV provide hands-on training with Pix4D and LiDAR processing software? What are the batch timings?',
    status: 'New',
    source: 'Chatbot',
    adminNotes: '',
  },
  {
    name: 'Meera Nambiar',
    email: 'meera.nambiar@solarinspect.com',
    phone: '+91 94471 22890',
    userType: 'Customer',
    serviceOrCourse: 'Industrial Infrastructure Inspection',
    message: 'Require thermal drone inspection for a 50 MW solar power farm in Rajasthan to detect defective photovoltaic cells.',
    status: 'In Progress',
    source: 'Contact Form',
    adminNotes: 'Flight plan approved. Awaiting site clearance from station director.',
  },
  {
    name: 'Devansh Verma',
    email: 'devansh.verma@techmail.com',
    phone: '+91 93350 44123',
    userType: 'Student',
    serviceOrCourse: 'Drone Assembly, Repair & Maintenance Course',
    message: 'Interested in learning drone avionics, ESC calibration, and PX4 autopilot tuning. Are weekend batches available?',
    status: 'Contacted',
    source: 'Chatbot',
    adminNotes: 'Brochure sent on WhatsApp and email.',
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dronetv';
  console.log(`[Seed Script] Connecting to ${uri}...`);

  try {
    await mongoose.connect(uri);
    console.log('[Seed Script] Connected. Clearing existing records...');
    await Enquiry.deleteMany({});

    console.log('[Seed Script] Inserting realistic DroneTV sample records...');
    await Enquiry.insertMany(initialSeeds);

    console.log(`[Seed Script] Successfully seeded ${initialSeeds.length} enquiries!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err: any) {
    console.error(`[Seed Script] Failed to seed MongoDB: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  seed();
}

export { initialSeeds };
