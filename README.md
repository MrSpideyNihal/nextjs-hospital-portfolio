# Hospital Portfolio Website

https://nihalwork.netlify.app/

A complete, production-ready hospital portfolio website built with **Next.js 14**, **React**, **Tailwind CSS**, and **MongoDB**. Features a public-facing site with doctor profiles, blog posts, and services, plus a secure admin dashboard for content management. Fully deployable to **Netlify** with serverless functions.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## 🌟 Features

### Public Website
- **Modern Homepage** - Hero section, featured services, statistics, and call-to-action
- **Doctor Profiles** - Browse doctors with search and filter by specialty
- **Blog System** - Read health articles and medical insights
- **Services Showcase** - Comprehensive list of medical services
- **Contact Form** - Email integration for patient inquiries
- **Responsive Design** - Mobile-first approach, works on all devices
- **SEO Optimized** - Proper meta tags and semantic HTML

### Admin Dashboard
- **Secure Authentication** - JWT-based login system
- **Doctor Management** - Full CRUD operations for doctor profiles
- **Blog Management** - Create, edit, and publish blog posts with rich text editor
- **Hospital Info** - Update about, services, testimonials, and contact details
- **Image Uploads** - Cloudinary integration for profile and blog images
- **Protected Routes** - Middleware-based route protection

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Custom medical-themed design
- **Backend**: Next.js API Routes (Serverless Functions)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens), bcrypt password hashing
- **File Storage**: Cloudinary for image uploads
- **Email**: Nodemailer with Gmail SMTP
- **Form Handling**: React Hook Form with Zod validation
- **Rich Text**: TipTap editor for blog content

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (free tier available)
- **Cloudinary** account (free tier available)
- **Gmail** account with app-specific password

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd nextjs-hospital-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Update `.env.local` with your credentials:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital?retryWrites=true&w=majority

# Admin Credentials (Initial setup)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!

# JWT Secret (Generate a random 32+ character string)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (Gmail SMTP)
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. MongoDB Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add a database user (Database Access)
4. Whitelist your IP or allow access from anywhere (Network Access: `0.0.0.0/0`)
5. Get your connection string and update `MONGODB_URI`

### 5. Cloudinary Setup

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Update the Cloudinary variables in `.env.local`

### 6. Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password
3. Update `EMAIL_USER` and `EMAIL_PASSWORD` in `.env.local`

### 7. Create Initial Admin User

Run the development server and the admin user will be created automatically on first API call:

```bash
npm run dev
```

Navigate to `http://localhost:3000/login` and use the credentials from your `.env.local` file.

## 🎯 Development

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## 📦 Deployment to Netlify

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize and deploy:
```bash
netlify init
netlify deploy --prod
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Add environment variables in Netlify dashboard (Site settings → Environment variables)
7. Deploy!

### Environment Variables in Netlify

Add all variables from `.env.local` to Netlify:
- Go to Site settings → Environment variables
- Add each variable individually
- Redeploy after adding variables

## 📁 Project Structure

```
nextjs-hospital-portfolio/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (Serverless Functions)
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── doctors/              # Doctor CRUD
│   │   ├── blogs/                # Blog CRUD
│   │   ├── hospital-info/        # Hospital info management
│   │   ├── contact/              # Contact form
│   │   └── upload/               # Image upload
│   ├── (public)/                 # Public pages
│   │   ├── page.tsx              # Home page
│   │   ├── about/
│   │   ├── doctors/
│   │   ├── blogs/
│   │   ├── services/
│   │   └── contact/
│   ├── admin/                    # Admin dashboard
│   ├── login/                    # Admin login
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── src/
│   ├── components/               # React components
│   │   ├── layout/               # Header, Footer
│   │   ├── ui/                   # Reusable UI components
│   │   ├── home/                 # Home page components
│   │   ├── doctors/              # Doctor components
│   │   ├── blogs/                # Blog components
│   │   └── admin/                # Admin components
│   ├── lib/                      # Utilities
│   │   ├── mongodb.ts            # Database connection
│   │   ├── auth.ts               # JWT utilities
│   │   ├── cloudinary.ts         # Image upload
│   │   └── email.ts              # Email service
│   └── models/                   # Mongoose models
│       ├── Doctor.ts
│       ├── Blog.ts
│       ├── HospitalInfo.ts
│       └── Admin.ts
├── middleware.ts                 # Route protection
├── .env.example                  # Environment template
├── .env.local                    # Your environment variables (gitignored)
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
└── package.json                  # Dependencies
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/logout` - Logout

### Doctors
- `GET /api/doctors` - Get all doctors (public)
- `POST /api/doctors` - Create doctor (admin)
- `GET /api/doctors/:id` - Get single doctor (public)
- `PUT /api/doctors/:id` - Update doctor (admin)
- `DELETE /api/doctors/:id` - Delete doctor (admin)

### Blogs
- `GET /api/blogs` - Get all published blogs (public)
- `POST /api/blogs` - Create blog (admin)
- `GET /api/blogs/:id` - Get single blog (public if published)
- `PUT /api/blogs/:id` - Update blog (admin)
- `DELETE /api/blogs/:id` - Delete blog (admin)

### Hospital Info
- `GET /api/hospital-info` - Get hospital information (public)
- `PUT /api/hospital-info` - Update hospital info (admin)

### Contact
- `POST /api/contact` - Send contact form email

### Upload
- `POST /api/upload` - Upload image to Cloudinary (admin)

## 🎨 Customization

### Colors
Edit `app/globals.css` to change the color scheme:
```css
:root {
  --primary: #0066CC;        /* Primary blue */
  --primary-dark: #004C99;   /* Darker blue */
  --secondary: #00A86B;      /* Secondary green */
  --secondary-dark: #008556; /* Darker green */
}
```

### Fonts
Fonts are configured in `app/layout.tsx`:
- **Body**: Inter
- **Headings**: Poppins

### Logo
Replace the logo in `src/components/layout/Header.tsx`

## 🐛 Troubleshooting

### Build Errors

**MongoDB Connection Error during build:**
- This is normal if `MONGODB_URI` is not set during build
- The connection is only required at runtime
- Ensure environment variables are set in Netlify

**TypeScript Errors:**
```bash
npm run type-check
```

### Common Issues

**Images not uploading:**
- Check Cloudinary credentials
- Verify file size limits (Cloudinary free tier: 10MB)

**Emails not sending:**
- Verify Gmail app password is correct
- Check if 2FA is enabled on Gmail
- Ensure `EMAIL_USER` and `EMAIL_PASSWORD` are set

**Admin login not working:**
- Check if admin user exists in database
- Verify `JWT_SECRET` is set
- Clear browser cookies and try again

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for healthcare professionals**
