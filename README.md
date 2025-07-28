<div align="center">
  <h1>🛍️ UrbanWeave</h1>
  <p><strong>Modern Full-Stack Fashion E-Commerce Platform</strong></p>
  
  <p>A sophisticated fashion e-commerce web application built with the MERN stack, featuring seamless user experience, secure payments, and comprehensive admin management.</p>

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## ✨ Features

### 🛒 **Customer Experience**

- **User Authentication** - Secure registration, login, and profile management
- **Product Catalog** - Browse and search through fashion collections
- **Shopping Cart** - Add, remove, and manage items with real-time updates
- **Order Management** - Track orders from placement to delivery
- **Payment Integration** - Secure payments via Stripe and Razorpay
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### 🔧 **Admin Dashboard**

- **Product Management** - Add, edit, and remove products with image uploads
- **Order Processing** - View and manage customer orders
- **User Management** - Monitor and manage customer accounts
- **Analytics Dashboard** - Track sales, orders, and user metrics
- **Inventory Control** - Manage stock levels and product availability

### 🚀 **Technical Highlights**

- **Modern UI/UX** - Built with React 19, Material-UI, and Tailwind CSS
- **Secure Backend** - JWT authentication, bcrypt password hashing
- **Cloud Storage** - Cloudinary integration for image management
- **Email Services** - Automated notifications via Nodemailer
- **Performance Optimized** - Fast loading with Vite build system

---

## 🏗️ Architecture

```
UrbanWeave/
├── 📁 FrontEnd/          # Customer-facing React application
├── 📁 Admin/             # Admin dashboard React application
├── 📁 BackEnd/           # Node.js/Express API server
└── 📄 README.md          # Project documentation
```

### **Tech Stack**

| Layer          | Technology                                |
| -------------- | ----------------------------------------- |
| **Frontend**   | React 19, Vite, Tailwind CSS, Material-UI |
| **Backend**    | Node.js, Express.js, JWT Authentication   |
| **Database**   | MongoDB with Mongoose ODM                 |
| **Payment**    | Stripe, Razorpay                          |
| **Storage**    | Cloudinary (Images)                       |
| **Deployment** | Vercel                                    |

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account
- Stripe/Razorpay API keys

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/urbanweave-ecommerce.git
   cd urbanweave-ecommerce
   ```

2. **Backend Setup**

   ```bash
   cd BackEnd
   npm install

   # Create .env file with your configurations
   cp .env.example .env

   # Start the server
   npm start
   ```

3. **Frontend Setup**

   ```bash
   cd ../FrontEnd
   npm install

   # Create .env file
   cp .env.example .env

   # Start development server
   npm run dev
   ```

4. **Admin Dashboard Setup**

   ```bash
   cd ../Admin
   npm install

   # Create .env file
   cp .env.example .env

   # Start admin dashboard
   npm run dev
   ```

### Environment Variables

Create `.env` files in each directory with the following variables:

**BackEnd/.env**

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

**FrontEnd/.env & Admin/.env**

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## 📱 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Homepage+Preview" alt="Homepage" width="400"/>
  <img src="https://via.placeholder.com/800x400/059669/FFFFFF?text=Product+Page" alt="Product Page" width="400"/>
  <img src="https://via.placeholder.com/800x400/DC2626/FFFFFF?text=Admin+Dashboard" alt="Admin Dashboard" width="400"/>
  <img src="https://via.placeholder.com/800x400/7C3AED/FFFFFF?text=Shopping+Cart" alt="Shopping Cart" width="400"/>
</div>

---

## 🛠️ Development

### Available Scripts

**Frontend & Admin**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

**Backend**

```bash
npm start        # Start production server
npm run server   # Start with nodemon (development)
```

### Project Structure

```
BackEnd/
├── config/          # Database and service configurations
├── controllers/     # Route controllers
├── middleware/      # Custom middleware functions
├── model/          # MongoDB schemas
├── routes/         # API route definitions
└── index.js        # Server entry point

FrontEnd/
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/      # Page components
│   ├── context/    # React context providers
│   ├── assets/     # Static assets
│   └── App.jsx     # Main application component

Admin/
├── src/
│   ├── components/  # Admin UI components
│   ├── pages/      # Admin page components
│   └── App.jsx     # Admin application entry
```

---

## 🚀 Deployment

The application is configured for deployment on Vercel with the included `vercel.json` files.

1. **Deploy Backend**

   ```bash
   cd BackEnd
   vercel --prod
   ```

2. **Deploy Frontend**

   ```bash
   cd FrontEnd
   vercel --prod
   ```

3. **Deploy Admin**
   ```bash
   cd Admin
   vercel --prod
   ```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Athul Jose** - _Initial work_ - [YourGitHub](https://github.com/athul-jose00)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the flexible database solution
- Stripe & Razorpay for secure payment processing
- Cloudinary for image management services
- All open-source contributors who made this project possible

---

<div align="center">
  <p>Made with ❤️ for the fashion community</p>
  
  [![GitHub stars](https://img.shields.io/github/stars/yourusername/urbanweave-ecommerce?style=social)](https://github.com/yourusername/urbanweave-ecommerce/stargazers)
  [![GitHub forks](https://img.shields.io/github/forks/yourusername/urbanweave-ecommerce?style=social)](https://github.com/yourusername/urbanweave-ecommerce/network/members)
</div>
