import { Router } from 'express';

const router = Router();

// Health Check Route
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Perfumeria Aero API is running correctly',
    timestamp: new Date().toISOString()
  });
});

// Example Product Routes (Mock)
router.get('/products', (req, res) => {
  // In a real app, this would query the database
  res.json({
    status: 'success',
    data: [
      { id: 1, name: 'Perfume A', price: 100 },
      { id: 2, name: 'Perfume B', price: 200 }
    ]
  });
});

// Example Auth Routes (Mock)
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Mock validation
  if (email === 'test@test.com' && password === 'password') {
    res.json({ status: 'success', token: 'mock-jwt-token' });
  } else {
    res.status(401).json({ status: 'error', message: 'Invalid credentials' });
  }
});

export default router;
