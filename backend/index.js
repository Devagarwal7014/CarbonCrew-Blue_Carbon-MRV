// CARBON_CREW/backend/index.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const db = require('./db');
const adapter = require('./services/blockchain-adapter');
const upload = multer({ dest: path.join(__dirname, 'uploads/') });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/users', (req, res) => {
  const { name, role, address } = req.body;
  const id = db.createUser(name, role, address);
  res.json({ id });
});

app.get('/api/projects', (req, res) => res.json(db.getProjects()));
app.get('/api/projects/:id', (req, res) => {
  const p = db.getProject(req.params.id);
  if (!p) return res.status(404).json({ error: 'not found' });
  res.json(p);
});

app.post('/api/projects', upload.array('images', 6), (req, res) => {
  const { name, location, hectares, ownerAddress, metadata } = req.body;
  const images = (req.files || []).map(f => `/uploads/${path.basename(f.path)}`);
  const id = db.createProject({ name, location, hectares: Number(hectares), ownerAddress, images, metadata });
  res.json({ id });
});

app.post('/api/uploads/drone', upload.single('file'), (req, res) => {
  const fileUrl = `/uploads/${path.basename(req.file.path)}`;
  const id = db.createUpload({ filename: req.file.originalname, path: fileUrl, meta: req.body || {} });
  res.json({ id, fileUrl });
});

app.post('/api/projects/:id/verify', async (req, res) => {
  const id = req.params.id;
  const admin = req.body.admin || 'admin';
  const project = db.getProject(id);
  if (!project) return res.status(404).json({ error: 'not found' });
  const result = await adapter.verifyProject(id, admin);
  db.verifyProject(id, result.txHash);
  res.json({ ok: true, txHash: result.txHash });
});

app.post('/api/projects/:id/mint', async (req, res) => {
  const id = req.params.id;
  const { amount, admin } = req.body;
  const project = db.getProject(id);
  if (!project) return res.status(404).json({ error: 'not found' });
  const recipient = project.ownerAddress;
  const result = await adapter.mintTokens(recipient, amount);
  db.addTokenRecord({ projectId: id, recipient, amount, txHash: result.txHash });
  res.json({ ok: true, txHash: result.txHash, newBalance: result.newBalance });
});

app.get('/api/balance/:address', (req, res) => {
  const b = db.getBalance(req.params.address);
  res.json({ address: req.params.address, balance: b });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('API listening on', PORT));
