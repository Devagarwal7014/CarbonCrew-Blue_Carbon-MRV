# 🌊 Carbon Crew - Blue Carbon MRV System

A comprehensive blockchain-based platform for monitoring, reporting, and verifying (MRV) blue carbon projects. This system enables transparent tracking of carbon credit generation from coastal and marine ecosystems.

## 🌟 Features

- **Smart Contract Integration**: Ethereum-based carbon credit tokens and project registry
- **Project Management**: Register and verify blue carbon projects with geolocation data
- **Carbon Credit Trading**: ERC-20 token system for carbon credit transactions
- **File Upload System**: Support for project documentation and verification files
- **Admin Dashboard**: Comprehensive admin panel for project verification
- **Modern UI**: Built with Next.js and Tailwind CSS for optimal user experience

## 🏗️ Architecture

The project consists of three main components:

### 🔗 Blockchain Layer (`/blockchain`)
- **CarbonCreditToken**: ERC-20 token for carbon credits
- **BlueCarbonRegistry**: Smart contract for project registration and verification
- Built with Hardhat framework and OpenZeppelin contracts

### ⚙️ Backend API (`/backend`)
- Express.js REST API
- File upload handling with Multer
- Blockchain integration with Ethers.js
- CORS-enabled for frontend communication

### 🎨 Frontend (`/frontend`)
- Next.js 15 with React 19
- TypeScript for type safety
- Tailwind CSS for styling
- Web3 integration for blockchain interactions

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Devagarwal7014/CarbonCrew-Blue_Carbon-MRV.git
   cd CarbonCrew-Blue_Carbon-MRV
   ```

2. **Install dependencies for all components**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install blockchain dependencies
   cd ../blockchain
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

### Development Setup

#### 1. Blockchain Setup
```bash
cd blockchain

# Compile contracts
npx hardhat compile

# Run local network
npx hardhat node

# Deploy contracts (in another terminal)
npx hardhat run scripts/deploy.js --network localhost
```

#### 2. Backend Setup
```bash
cd backend

# Create environment file
cp .env.example .env

# Start the server
npm start
```

#### 3. Frontend Setup
```bash
cd frontend

# Start development server
npm run dev
```

## 📋 Smart Contracts

### CarbonCreditToken (CCT)
- **Symbol**: CCT
- **Standard**: ERC-20
- **Features**:
  - Mintable tokens (owner only)
  - Burnable tokens (owner only)
  - Standard ERC-20 functionality

### BlueCarbonRegistry
- **Purpose**: Register and verify blue carbon projects
- **Key Functions**:
  - `registerProject()`: Register new projects
  - `verifyProject()`: Admin verification of projects
  - `getProject()`: Retrieve project details

## 🛠️ API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Register new project
- `PUT /api/projects/:id/verify` - Verify project (admin only)

### File Upload
- `POST /api/upload` - Upload project documentation

## 🔧 Configuration

### Environment Variables

#### Backend (`/backend/.env`)
```env
PORT=5000
BLOCKCHAIN_RPC_URL=http://localhost:8545
CONTRACT_ADDRESS=0x...
PRIVATE_KEY=your_private_key
```

#### Frontend (`/frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_RPC_URL=http://localhost:8545
```

## 🎯 Usage

### For Project Owners
1. Connect your wallet to the platform
2. Register your blue carbon project with location and size details
3. Upload verification documents
4. Wait for admin verification

### For Admins
1. Access the admin dashboard
2. Review submitted projects
3. Verify legitimate projects
4. Monitor carbon credit generation

### For Carbon Credit Buyers
1. Browse verified projects
2. Purchase carbon credit tokens (CCT)
3. Track your carbon offset portfolio

## 🔒 Security Features

- **Access Control**: Owner-only functions for critical operations
- **Input Validation**: Comprehensive validation for all user inputs
- **File Upload Security**: Secure file handling with type validation
- **Smart Contract Security**: Built on OpenZeppelin's audited contracts

## 🌐 Network Support

- **Local Development**: Hardhat local network
- **Testnet**: Sepolia, Goerli (configurable)
- **Mainnet**: Ethereum mainnet (production ready)

## 📁 Project Structure

```
carbon_crew/
├── backend/                 # Express.js API server
│   ├── routes/             # API route handlers
│   ├── services/           # Blockchain integration services
│   └── server.js          # Main server file
├── blockchain/             # Smart contracts and deployment
│   ├── contracts/         # Solidity smart contracts
│   ├── scripts/           # Deployment scripts
│   └── test/              # Contract tests
├── frontend/              # Next.js web application
│   ├── pages/             # Application pages
│   ├── abis/              # Contract ABIs
│   └── public/            # Static assets
└── README.md              # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub Repository**: [https://github.com/Devagarwal7014/CarbonCrew-Blue_Carbon-MRV](https://github.com/Devagarwal7014/CarbonCrew-Blue_Carbon-MRV)
- **Live Demo**: [Coming Soon]

## 👨‍💻 Author

**Dev Agarwal**
- GitHub: [@Devagarwal7014](https://github.com/Devagarwal7014)

## 🙏 Acknowledgments

- OpenZeppelin for secure smart contract libraries
- Hardhat for blockchain development framework
- Next.js and React for the frontend framework
- The blue carbon community for environmental inspiration

---

**Built with ❤️ for a sustainable future** 🌱
