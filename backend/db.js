// CARBON_CREW/backend/db.js
const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'data.sqlite3'));
const { v4: uuidv4 } = require('uuid');

function init() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT, role TEXT, address TEXT);
    CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, name TEXT, location TEXT, hectares INTEGER, ownerAddress TEXT, images TEXT, status TEXT DEFAULT 'submitted', verifyTx TEXT);
    CREATE TABLE IF NOT EXISTS uploads (id TEXT PRIMARY KEY, filename TEXT, path TEXT, meta TEXT);
    CREATE TABLE IF NOT EXISTS tokens (id TEXT PRIMARY KEY, projectId TEXT, recipient TEXT, amount TEXT, txHash TEXT);
    CREATE TABLE IF NOT EXISTS balances (address TEXT PRIMARY KEY, amount TEXT);
  `);
}
init();

module.exports = {
  createUser(name, role, address='') {
    const id = uuidv4();
    db.prepare('INSERT INTO users(id,name,role,address) VALUES(?,?,?,?)').run(id, name, role, address);
    return id;
  },

  createProject({ name, location, hectares, ownerAddress, images = [], metadata = {} }) {
    const id = uuidv4();
    db.prepare('INSERT INTO projects(id,name,location,hectares,ownerAddress,images,status) VALUES(?,?,?,?,?,?,?)')
      .run(id, name, location, hectares, ownerAddress, JSON.stringify(images), 'submitted');
    return id;
  },

  getProjects() {
    return db.prepare('SELECT * FROM projects ORDER BY rowid DESC').all().map(r => ({ ...r, images: r.images ? JSON.parse(r.images) : [] }));
  },

  getProject(id) {
    const r = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    if (!r) return null;
    r.images = r.images ? JSON.parse(r.images) : [];
    return r;
  },

  verifyProject(id, txHash) {
    db.prepare('UPDATE projects SET status = ?, verifyTx = ? WHERE id = ?').run('verified', txHash, id);
  },

  createUpload({ filename, path, meta = {} }) {
    const id = uuidv4();
    db.prepare('INSERT INTO uploads(id,filename,path,meta) VALUES(?,?,?,?)').run(id, filename, path, JSON.stringify(meta));
    return id;
  },

  addTokenRecord({ projectId, recipient, amount, txHash }) {
    const id = uuidv4();
    db.prepare('INSERT INTO tokens(id,projectId,recipient,amount,txHash) VALUES(?,?,?,?,?)').run(id, projectId, recipient, String(amount), txHash);
    const prev = this.getBalance(recipient) || "0";
    const newBal = BigInt(prev) + BigInt(amount);
    db.prepare('INSERT OR REPLACE INTO balances(address,amount) VALUES(?,?)').run(recipient, newBal.toString());
    return id;
  },

  getBalance(address) {
    const r = db.prepare('SELECT amount FROM balances WHERE address = ?').get(address);
    return r ? r.amount : "0";
  }
};
