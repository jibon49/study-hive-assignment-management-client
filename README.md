# 📚 Study Hive - Assignment Management System

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen?style=for-the-badge&logo=vercel)](https://study-hive-assignment-management-cl.vercel.app/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.5.2-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.5-blueviolet?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

**Study Hive** is a comprehensive online assignment management system built with the MERN stack. It provides a collaborative platform where students and educators can create, submit, evaluate, and manage assignments seamlessly.

## 🌟 Live Demo
**🔗 [Visit Study Hive Live](https://study-hive-assignment-management-cl.vercel.app/)**

## ✨ Key Features

### 🔐 Authentication & Security
- **Firebase Authentication** with email/password and Google login
- **JWT Token Validation** for secure API requests
- **Private Routes** protection for authenticated users
- **Role-based Access Control** for different user permissions

### 📝 Assignment Management
- **Create Assignments** with detailed descriptions, difficulty levels, and due dates
- **Update/Edit Assignments** (only by the creator)
- **Delete Assignments** with confirmation dialogs
- **View All Assignments** with pagination and filtering
- **Difficulty Levels**: Easy, Medium, Hard

### 📤 Submission System
- **Submit Assignments** with text descriptions and document links
- **Track Submission Status** (Pending, Confirmed)
- **Prevent Duplicate Submissions** with validation
- **View Personal Submissions** in a dedicated dashboard

### 🎯 Evaluation Features
- **Grade Assignments** submitted by other users
- **Provide Feedback** with detailed comments
- **Assign Marks** based on performance
- **View Submitted Assignments** for evaluation

### 🎨 User Experience
- **Responsive Design** that works on all devices
- **Interactive UI** with smooth animations and transitions
- **Toast Notifications** for user feedback
- **Modal Dialogs** for confirmations and forms
- **Loading States** for better user experience

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern JavaScript library for building user interfaces
- **React Router DOM 6.18.0** - Declarative routing for React
- **Tailwind CSS 3.3.5** - Utility-first CSS framework
- **DaisyUI 3.9.4** - Tailwind CSS component library
- **Axios 1.6.0** - Promise-based HTTP client
- **React Icons 4.11.0** - Popular icon library
- **SweetAlert2 11.9.0** - Beautiful alert dialogs
- **React Toastify 9.1.3** - Toast notifications
- **React Date Picker 10.5.2** - Date selection component
- **Swiper 11.0.3** - Modern touch slider

### Backend Integration
- **Firebase 10.5.2** - Authentication and hosting
- **JWT Authentication** - Secure token-based authentication
- **MongoDB** - NoSQL database for data storage
- **Express.js** - Backend server framework

### Development Tools
- **Vite 4.5.14** - Fast build tool and dev server
- **ESLint 8.45.0** - Code linting and formatting
- **PostCSS 8.4.31** - CSS processing tool
- **Autoprefixer 10.4.16** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Firebase Account** for authentication setup
- **MongoDB Database** (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jibon49/study-hive-assignment-management-client.git
   cd study-hive-assignment-management-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Backend API Configuration
   VITE_API_BASE_URL=online-group-study-assignment-server-n2txtzlzh-jibon49.vercel.app
   
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📂 Project Structure

```
src/
├── components/
│   ├── Assignments/
│   │   ├── AllAssignment/
│   │   ├── CreateAssignment/
│   │   ├── MyAssignment/
│   │   ├── SubmittedAssignment/
│   │   ├── UpdateAssignment/
│   │   └── ViewAssignment/
│   ├── HomePage/
│   │   ├── Banner/
│   │   ├── Blogs/
│   │   ├── Faq/
│   │   ├── Feature/
│   │   ├── Footer/
│   │   ├── Home/
│   │   └── Navbar/
│   ├── Login/
│   ├── Register/
│   ├── Error/
│   └── PrivateRoute/
├── AuthProviders/
├── assets/
├── firebase_config.js
├── App.jsx
└── main.jsx
```

## 🎯 Core Features Explained

### Assignment Lifecycle
1. **Creation** → User creates assignment with details
2. **Publication** → Assignment becomes available to all users
3. **Submission** → Other users submit their work
4. **Evaluation** → Creator or evaluators grade submissions
5. **Completion** → Final marks and feedback provided

### User Journey
1. **Registration/Login** → Secure authentication
2. **Browse Assignments** → View available assignments
3. **Submit Work** → Complete and submit assignments
4. **Create Content** → Create new assignments for others
5. **Evaluate Others** → Grade and provide feedback
6. **Track Progress** → Monitor personal submissions and grades

## 🔒 Security Features

- **Environment Variables** for sensitive configuration
- **JWT Token Validation** for API security
- **Firebase Authentication** with multiple providers
- **Route Protection** for authenticated users only
- **Input Validation** and sanitization
- **CORS Configuration** for API security

## 🌐 API Integration

The frontend integrates with a RESTful API that provides:
- User authentication and authorization
- Assignment CRUD operations
- Submission management
- Evaluation and grading system
- File upload and management

## 📱 Responsive Design

- **Mobile-First Approach** with Tailwind CSS
- **Breakpoint Optimization** for all screen sizes
- **Touch-Friendly Interface** for mobile users
- **Progressive Web App** features

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Jibon49**
- GitHub: [@jibon49](https://github.com/jibon49)
- Project Repository: [Study Hive Client](https://github.com/jibon49/study-hive-assignment-management-client)

## 🔗 Related Links

- **🌐 [Live Application](https://study-hive-assignment-management-cl.vercel.app/)**
- **🔧 [Backend Repository](https://github.com/Porgramming-Hero-web-course/b8a11-server-side-jibon49)**
- **📚 [Documentation](https://github.com/jibon49/study-hive-assignment-management-client/wiki)**

## 📞 Support

If you have any questions or need support, please:
- Open an issue on GitHub
- Contact the developer through the repository
- Check the documentation for common solutions

---

⭐ **Star this repository if you found it helpful!** ⭐