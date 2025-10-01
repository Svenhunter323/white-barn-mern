# The White Barn FL - MERN Stack Website

A complete migration of The White Barn FL wedding venue website from PHP to MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- **Modern React Frontend** with Vite and Tailwind CSS
- **Responsive Design** optimized for all devices
- **Interactive Gallery** with lightbox functionality
- **Contact Form** with email integration
- **Content Management** system for easy updates
- **SEO Optimized** structure
- **Fast Performance** with modern build tools

## Pages

- **Home** - Hero section, services, gallery preview
- **About** - Company information and team details
- **Videos** - Video gallery and testimonials
- **Contact** - Contact form and venue information
- **Licenses** - Certifications and compliance information
- **Associations** - Partner organizations and charitable work

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Swiper** - Modern slider component
- **React Hook Form** - Form handling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Nodemailer** - Email sending
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd white-barn-mern
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Setup**
   ```bash
   # In backend directory
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system

6. **Start the development servers**
   
   **Backend (from backend directory):**
   ```bash
   npm run dev
   ```
   
   **Frontend (from root directory):**
   ```bash
   npm run dev
   ```

## Email Configuration

The contact form uses SMTP for email delivery. Configure the following in your `.env` file:

```env
SMTP_HOST=smtpout.asia.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
FROM_EMAIL=info@thewhitebarnfl.com
TO_EMAIL=contact@thewhitebarnfl.com
```

## API Endpoints

### Contact Routes
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (admin)

### Content Routes
- `GET /api/content/contact-details` - Get contact information
- `GET /api/content/about-details` - Get about page content
- `GET /api/content/reviews` - Get approved reviews

### Gallery Routes
- `GET /api/gallery` - Get gallery images

## Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

**The White Barn FL** - Creating unforgettable moments in beautiful settings.
