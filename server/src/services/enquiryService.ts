import { Enquiry, IEnquiryDocument } from '../models/Enquiry';
import { isConnectedToMongo } from '../config/db';
import { EnquiryStatus, IEnquiryData, UserType } from '../types';

// In-memory fallback store initialized with realistic DroneTV enquiries
let memoryStore: Array<IEnquiryData & { _id: string; id: string; createdAt: Date; updatedAt: Date }> = [
  {
    _id: '6615b1c90000000000000001',
    id: '6615b1c90000000000000001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    phone: '+91 98765 43210',
    userType: 'Student',
    serviceOrCourse: 'DGCA Remote Pilot Certification (RPC)',
    message: 'I am a final year aerospace engineering student interested in getting certified for commercial drone operations.',
    status: 'New',
    source: 'Chatbot',
    adminNotes: 'Candidate expressed interest in weekend batch.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    _id: '6615b1c90000000000000002',
    id: '6615b1c90000000000000002',
    name: 'Pooja Iyer',
    email: 'pooja.iyer@agrofresh.in',
    phone: '+91 98112 34567',
    userType: 'Customer',
    serviceOrCourse: 'Precision Agriculture Spraying',
    message: 'We have 120 acres of orchards in Maharashtra and need drone spraying services for fertilizer and pest management.',
    status: 'Contacted',
    source: 'Contact Form',
    adminNotes: 'Introductory call completed; quotation sent for 120-acre pilot project.',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    _id: '6615b1c90000000000000003',
    id: '6615b1c90000000000000003',
    name: 'Vikramaditya Construction Ltd (Rohan Mehta)',
    email: 'rohan.mehta@vbuilders.com',
    phone: '+91 99201 55432',
    userType: 'Customer',
    serviceOrCourse: 'Aerial Surveying & 3D Mapping',
    message: 'Need topographic mapping and contour survey for upcoming highway bypass expansion project (45 km corridor).',
    status: 'In Progress',
    source: 'Chatbot',
    adminNotes: 'Technical team reviewing GCP coordinates. Meeting scheduled on Friday.',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    _id: '6615b1c90000000000000004',
    id: '6615b1c90000000000000004',
    name: 'Sneha Kulkarni',
    email: 'sneha.kulkarni@cinestudios.co',
    phone: '+91 97654 88712',
    userType: 'Customer',
    serviceOrCourse: 'High-Resolution Aerial Cinematography',
    message: 'Looking for dual-operator FPV and heavy-lifter cinema drone team for an upcoming tourism commercial shoot.',
    status: 'Closed',
    source: 'Contact Form',
    adminNotes: 'Contract signed and pilot dispatched for shoot in Goa.',
    createdAt: new Date(Date.now() - 120 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    _id: '6615b1c90000000000000005',
    id: '6615b1c90000000000000005',
    name: 'Karan Patel',
    email: 'karan.patel@edu.in',
    phone: '+91 98220 11993',
    userType: 'Student',
    serviceOrCourse: 'Advanced Drone Mapping & Photogrammetry',
    message: 'Does DroneTV provide hands-on training with Pix4D and LiDAR processing software? What are the batch timings?',
    status: 'New',
    source: 'Chatbot',
    adminNotes: '',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
];

export class EnquiryService {
  /**
   * Fetch enquiries with optional search, filtering, and pagination
   */
  static async getAll(options: {
    search?: string;
    userType?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const { search, userType, status, page = 1, limit = 50 } = options;

    if (isConnectedToMongo) {
      const query: any = {};

      if (userType && ['Student', 'Customer', 'Other'].includes(userType)) {
        query.userType = userType;
      }

      if (
        status &&
        ['New', 'Contacted', 'In Progress', 'Closed'].includes(status)
      ) {
        query.status = status;
      }

      if (search && search.trim() !== '') {
        const regex = new RegExp(search.trim(), 'i');
        query.$or = [
          { name: regex },
          { email: regex },
          { phone: regex },
          { serviceOrCourse: regex },
          { message: regex },
        ];
      }

      const total = await Enquiry.countDocuments(query);
      const data = await Enquiry.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      return {
        total,
        page,
        limit,
        data,
      };
    }

    // In-memory fallback
    let results = [...memoryStore];

    if (userType && ['Student', 'Customer', 'Other'].includes(userType)) {
      results = results.filter((item) => item.userType === userType);
    }

    if (
      status &&
      ['New', 'Contacted', 'In Progress', 'Closed'].includes(status)
    ) {
      results = results.filter((item) => item.status === status);
    }

    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.phone.toLowerCase().includes(q) ||
          item.serviceOrCourse.toLowerCase().includes(q) ||
          item.message.toLowerCase().includes(q)
      );
    }

    results.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const total = results.length;
    const paginated = results.slice((page - 1) * limit, page * limit);

    return {
      total,
      page,
      limit,
      data: paginated,
    };
  }

  /**
   * Fetch single enquiry by ID
   */
  static async getById(id: string) {
    if (isConnectedToMongo) {
      return await Enquiry.findById(id);
    }

    return memoryStore.find((item) => item._id === id || item.id === id) || null;
  }

  /**
   * Create a new enquiry
   */
  static async create(payload: IEnquiryData) {
    if (isConnectedToMongo) {
      const newEnquiry = new Enquiry(payload);
      return await newEnquiry.save();
    }

    const now = new Date();
    const fakeId = '66' + Math.random().toString(16).substring(2, 24).padStart(22, '0');
    const created = {
      ...payload,
      _id: fakeId,
      id: fakeId,
      status: payload.status || 'New',
      source: payload.source || 'Contact Form',
      adminNotes: payload.adminNotes || '',
      createdAt: now,
      updatedAt: now,
    };
    memoryStore.unshift(created);
    return created;
  }

  /**
   * Update enquiry by ID
   */
  static async update(
    id: string,
    updates: Partial<{
      status: EnquiryStatus;
      adminNotes: string;
      name: string;
      phone: string;
      email: string;
    }>
  ) {
    if (isConnectedToMongo) {
      return await Enquiry.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
    }

    const index = memoryStore.findIndex(
      (item) => item._id === id || item.id === id
    );
    if (index === -1) return null;

    memoryStore[index] = {
      ...memoryStore[index],
      ...updates,
      updatedAt: new Date(),
    };

    return memoryStore[index];
  }

  /**
   * Delete enquiry by ID
   */
  static async delete(id: string): Promise<boolean> {
    if (isConnectedToMongo) {
      const res = await Enquiry.findByIdAndDelete(id);
      return !!res;
    }

    const prevLen = memoryStore.length;
    memoryStore = memoryStore.filter(
      (item) => item._id !== id && item.id !== id
    );
    return memoryStore.length < prevLen;
  }

  /**
   * Aggregate statistics for Admin Dashboard metrics
   */
  static async getStats() {
    if (isConnectedToMongo) {
      const total = await Enquiry.countDocuments();
      const newCount = await Enquiry.countDocuments({ status: 'New' });
      const contacted = await Enquiry.countDocuments({ status: 'Contacted' });
      const inProgress = await Enquiry.countDocuments({ status: 'In Progress' });
      const closed = await Enquiry.countDocuments({ status: 'Closed' });
      const students = await Enquiry.countDocuments({ userType: 'Student' });
      const customers = await Enquiry.countDocuments({ userType: 'Customer' });
      const others = await Enquiry.countDocuments({ userType: 'Other' });

      return {
        total,
        new: newCount,
        contacted,
        inProgress,
        closed,
        students,
        customers,
        others,
      };
    }

    const total = memoryStore.length;
    const newCount = memoryStore.filter((i) => i.status === 'New').length;
    const contacted = memoryStore.filter((i) => i.status === 'Contacted').length;
    const inProgress = memoryStore.filter((i) => i.status === 'In Progress').length;
    const closed = memoryStore.filter((i) => i.status === 'Closed').length;
    const students = memoryStore.filter((i) => i.userType === 'Student').length;
    const customers = memoryStore.filter((i) => i.userType === 'Customer').length;
    const others = memoryStore.filter((i) => i.userType === 'Other').length;

    return {
      total,
      new: newCount,
      contacted,
      inProgress,
      closed,
      students,
      customers,
      others,
    };
  }

  /**
   * Pre-seed MongoDB if empty
   */
  static async seedIfEmpty() {
    if (isConnectedToMongo) {
      const count = await Enquiry.countDocuments();
      if (count === 0) {
        console.log('[Database] MongoDB collection empty, inserting sample DroneTV enquiries...');
        await Enquiry.insertMany(memoryStore.map(({ id, ...rest }) => rest));
        console.log('[Database] Seeded 5 initial enquiries into MongoDB.');
      }
    }
  }
}
