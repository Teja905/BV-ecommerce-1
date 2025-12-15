import User from '../models/User.js';

export const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@shop.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
  const adminName = process.env.ADMIN_NAME || 'Store Admin';

  const existing = await User.findOne({ email: adminEmail });
  if (existing) return;

  const admin = new User({
    name: adminName,
    email: adminEmail,
    password: adminPassword,
    role: 'admin'
  });

  await admin.save();
  console.log(`Seeded admin ${adminEmail}`);
};

