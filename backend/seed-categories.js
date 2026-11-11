require('dotenv').config();
const { initializeDatabase, pool } = require('./db');

const categories = [
  'Agriculture & Farming',
  'Automotive',
  'Bakery',
  'Banks & Finance',
  'Beauty & Personal Care',
  'Books & Stationery',
  'Building Materials & Hardware',
  'Business Services',
  'Car Rental & Taxi',
  'Clothing & Fashion',
  'Construction',
  'Courier & Delivery',
  'Education & Training',
  'Electronics & Appliances',
  'Event Planning & Management',
  'Fish & Seafood',
  'Florist & Gifts',
  'Food & Catering',
  'Furniture & Home Decor',
  'Grocery & Supermarkets',
  'Gym & Fitness',
  'Healthcare',
  'Home Services & Repairs',
  'Hotels & Accommodation',
  'Insurance',
  'Jewellery',
  'Laundry & Dry Cleaning',
  'Legal Services',
  'Medical & Pharmacy',
  'Mobile & Computer Services',
  'Optical Stores',
  'Pet Care & Veterinary',
  'Photography & Videography',
  'Plumbing & Electrical',
  'Printing',
  'Real Estate',
  'Restaurant',
  'Salon & Spa',
  'Security Services',
  'Sports & Recreation',
  'Telecommunications & Internet',
  'Tourism & Travel',
  'Transport & Logistics',
  'Water Supply & Purification',
  'Wedding Services & Venues',
];

async function seedCategories() {
  await initializeDatabase();
  let inserted = 0;
  for (const name of categories) {
    const result = await pool.query(
      `INSERT INTO categories (name, img)
       SELECT $1, ''
       WHERE NOT EXISTS (SELECT 1 FROM categories WHERE LOWER(BTRIM(name)) = LOWER(BTRIM($1)))
       RETURNING id`,
      [name],
    );
    inserted += result.rowCount;
  }
  console.log(`Category seed complete: added ${inserted} categories (${categories.length} checked).`);
}

seedCategories()
  .catch((error) => {
    console.error('Could not seed business categories:', error.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
