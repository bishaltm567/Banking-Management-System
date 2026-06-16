-- Sample data for testing (optional)
-- Create admin user
INSERT INTO users (id, first_name, last_name, email, phone, password_hash, role)
VALUES (
  'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6',
  'Admin',
  'User',
  'admin@bank.com',
  '9801000000',
  '$2b$10$YJn6UYH5cjyPu4WxFzB0DeYkQfJ5j3j5j3j5j3j5j3j5j3j5j3j5j',
  'admin'
);

-- Create sample customer
INSERT INTO users (id, first_name, last_name, email, phone, password_hash, role)
VALUES (
  'b2c3d4e5-f6a7-48b9-c0d1-e2f3a4b5c6d7',
  'John',
  'Doe',
  'john@example.com',
  '9841234567',
  '$2b$10$YJn6UYH5cjyPu4WxFzB0DeYkQfJ5j3j5j3j5j3j5j3j5j3j5j3j5j',
  'customer'
);

-- Create sample accounts
INSERT INTO accounts (id, user_id, account_number, account_type, balance, status)
VALUES (
  'c3d4e5f6-a7b8-49c0-d1e2-f3a4b5c6d7e8',
  'b2c3d4e5-f6a7-48b9-c0d1-e2f3a4b5c6d7',
  '100001000001',
  'savings',
  5000.00,
  'active'
);

INSERT INTO accounts (id, user_id, account_number, account_type, balance, status)
VALUES (
  'd4e5f6a7-b8c9-40d1-e2f3-a4b5c6d7e8f9',
  'b2c3d4e5-f6a7-48b9-c0d1-e2f3a4b5c6d7',
  '100001000002',
  'checking',
  10000.00,
  'active'
);
