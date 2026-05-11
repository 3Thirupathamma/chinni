const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from current directory
app.use(express.static(__dirname));

// In-Memory Database for Workers
let workersDB = [
    { id: '100001', name: 'Raju P.', phone: '9876543210', skill: 'Carpentry', location: 'Hyderabad (within 10km)', exp: 5 },
    { id: '100002', name: 'Ram Singh', phone: '8765432109', skill: 'Construction Worker', location: 'Hyderabad (within 60km)', exp: 8 },
    { id: '100003', name: 'Lakshmi Devi', phone: '7654321098', skill: 'Maid', location: 'Hyderabad (within 30km)', exp: 12 },
    { id: '100004', name: 'Ali Khan', phone: '6543210987', skill: 'Tailor', location: 'Delhi (within 10km)', exp: 4 },
    { id: '100005', name: 'Subba Rao', phone: '9988776655', skill: 'Gardener', location: 'Hyderabad (within 60km)', exp: 3 },
    { id: '100006', name: 'Suresh K.', phone: '8877665544', skill: 'Welder', location: 'Mumbai (within 30km)', exp: 6 },
    { id: '100007', name: 'Ravi Teja', phone: '7766554433', skill: 'Helper', location: 'Hyderabad (within 60km)', exp: 2 },
];

/**
 * API: Get all workers
 */
app.get('/api/workers', (req, res) => {
    res.json(workersDB);
});

/**
 * API: Register a new worker
 */
app.post('/api/register', (req, res) => {
    const { name, phone, skill, location } = req.body;
    
    // Basic validation
    if (!name || !phone || !skill || !location) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Generate random 6-digit ID
    const workId = Math.floor(100000 + Math.random() * 900000).toString();
    
    const newWorker = {
        id: workId,
        name,
        phone,
        skill,
        location,
        exp: 0
    };

    workersDB.push(newWorker);

    res.status(201).json({ 
        message: 'Worker registered successfully', 
        worker: newWorker 
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
