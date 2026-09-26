# AI Political Poster Maker — Backend

Backend API for **AI Political Poster Maker**, a web application for creating customizable political and event posters using predefined templates, user-provided content, uploaded images, and AI-assisted visual layout suggestions.

The backend handles authentication, poster generation, image uploads, AI layout suggestions, template management, Cloudinary storage, and poster history.

---

## 🚀 Live API

**Production API:**

[https://ai-political-poster-maker-backend-64aub7iqk.vercel.app/](https://ai-political-poster-maker-backend.vercel.app/)

---

## ✨ Features

- User registration and login
- JWT-based authentication
- Protected API routes
- User profile endpoint
- Poster template management
- AI-assisted poster layout suggestions
- Exact preservation of user-provided text
- Image upload with Cloudinary
- Maximum 3 images per poster
- Maximum 5MB per image
- Poster generation using SVG and Sharp
- Generated poster upload to Cloudinary
- Poster history
- Poster regeneration
- Poster deletion
- Automatic Cloudinary image cleanup
- MongoDB database with Mongoose
- Request validation with Zod
- Global error handling
- API rate limiting
- CORS configuration
- Async error handling
- 404 route handling
- Production-ready environment configuration

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- MongoDB
- Mongoose

### Authentication

- JSON Web Token (JWT)
- bcrypt

### AI

- Google Gemini API
- `@google/genai`

### Image Processing

- Sharp
- SVG

### Image Storage

- Cloudinary
- Multer

### Validation & Security

- Zod
- express-rate-limit
- CORS

### Deployment

- Vercel

---

## 📁 Project Structure

```text
backend/
│
├── src/
│   ├── app.ts
│   ├── server.ts
│   │
│   ├── config/
│   │   ├── env.ts
│   │   ├── db.ts
│   │   ├── cloudinary.ts
│   │   └── gemini.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── validate.middleware.ts
│   │   ├── rateLimit.middleware.ts
│   │   └── notFound.middleware.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── bcrypt.ts
│   │   ├── catchAsync.ts
│   │   ├── sendResponse.ts
│   │   └── AppError.ts
│   │
│   ├── types/
│   │   └── express.d.ts
│   │
│   ├── routes/
│   │   └── index.ts
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── template/
│   │   ├── poster/
│   │   ├── upload/
│   │   ├── ai/
│   │   ├── renderer/
│   │   └── admin/
│   │
│   └── seed/
│       └── seed.ts
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
🔐 Authentication

The API uses JWT authentication.

After successful registration or login, the server returns an access token.

Protected routes require:

Authorization: Bearer YOUR_TOKEN
Supported authentication methods

Users can register/login using:

Email
Phone number
📌 API Endpoints

Base URL:

https://ai-political-poster-maker-backend-64aub7iqk.vercel.app
Authentication
Register
POST /api/auth/register

Example request:

{
  "name": "Ahmed Nakib",
  "email": "user@example.com",
  "password": "123456"
}

Phone registration is also supported.

Login
POST /api/auth/login

Example:

{
  "email": "user@example.com",
  "password": "123456"
}
Get Current User
GET /api/auth/me

Requires authentication.

🎨 Templates
Get All Templates
GET /api/templates

Returns all active poster templates.

Get Single Template
GET /api/templates/:id

Returns a specific active template.

🖼️ Image Upload

Images are uploaded to Cloudinary before poster creation.

Upload Images
POST /api/upload/images

Requires authentication.

Form-data:

images: file
Upload Rules
Maximum 3 images
Maximum 5MB per image
Images are stored in Cloudinary
Returned URLs are used during poster generation

Example response:

{
  "success": true,
  "data": {
    "urls": [
      "https://res.cloudinary.com/..."
    ]
  }
}
🖼️ Poster API
Create Poster
POST /api/posters

Requires authentication.

Example:

{
  "templateId": "TEMPLATE_ID",
  "name": "Ahmed Nakib",
  "designation": "Member",
  "organization": "Organization Name",
  "union": "Union Name",
  "thana": "Thana Name",
  "district": "District Name",
  "occasion": "Victory Day",
  "headline": "Victory Day Celebration",
  "photoUrls": [
    "https://res.cloudinary.com/..."
  ]
}
Poster Generation Flow
Create Poster Request
        ↓
Validate Request
        ↓
Create Poster
        ↓
Gemini Layout Suggestion
        ↓
SVG Poster Rendering
        ↓
Sharp Image Processing
        ↓
Upload Generated PNG
        ↓
Cloudinary
        ↓
Save Generated URL
        ↓
Return Poster
Get My Posters
GET /api/posters

Returns posters created by the authenticated user.

Get Single Poster
GET /api/posters/:id

Returns a specific poster belonging to the authenticated user.

Regenerate Poster
POST /api/posters/:id/regenerate

Regenerates the poster using the existing poster information.

A maximum of 3 generations is allowed.

Delete Poster
DELETE /api/posters/:id

Deletes:

Generated poster from Cloudinary
Uploaded source images from Cloudinary
Poster record from MongoDB
🤖 AI Layout Generation

Google Gemini is used only for visual layout and design suggestions.

The AI can suggest:

Background style
Primary color
Secondary color
Text alignment
Photo arrangement
Decoration style
Font style

The AI does not rewrite user-provided political text.

User-provided:

Headline
Name
Designation
Organization
Location

are preserved as provided.

The AI is not used to generate political slogans, politician names, or political party names.

🎨 Poster Renderer

Poster images are generated using:

SVG
Sharp

Default poster size:

1080 × 1350

Supported photo layouts:

Single Photo
┌─────────────────────┐
│                     │
│       PHOTO         │
│                     │
├─────────────────────┤
│      HEADLINE       │
│        NAME         │
│    DESIGNATION      │
└─────────────────────┘
Two Photos
┌─────────────────────┐
│                     │
│  PHOTO  │  PHOTO    │
│                     │
├─────────────────────┤
│      HEADLINE       │
│        NAME         │
└─────────────────────┘
Three Photos
┌─────────────────────┐
│                     │
│ P1 │ P2 │ P3        │
│                     │
├─────────────────────┤
│      HEADLINE       │
│        NAME         │
└─────────────────────┘
☁️ Cloudinary

Cloudinary is used for:

User-uploaded images
Generated poster images

Folders:

ai-political-poster/

Generated posters:

ai-political-poster/generated/
🗄️ Database

MongoDB is used as the primary database.

Main collections:

users
templates
posters
User
name
email
phone
passwordHash
role
createdAt
updatedAt
Template
title
occasionType
thumbnailUrl
backgroundUrl
layoutConfig
isActive
createdAt
updatedAt
Poster
userId
templateId
name
designation
organization
union
thana
district
occasion
headline
photoUrls
status
generatedImageUrl
generationCount
createdAt
updatedAt
🔒 Security

The backend includes several security and reliability measures.

JWT Authentication

Protected routes require a valid JWT.

Password Hashing

Passwords are hashed using bcrypt before being stored.

Rate Limiting

API requests are rate-limited to reduce abuse.

Authentication and AI-related endpoints use stricter limits.

Request Validation

Incoming data is validated using Zod.

File Limits

Uploaded images are limited to:

Maximum files: 3
Maximum size: 5MB per file
CORS

Frontend access is controlled using the configured frontend URL.

Global Error Handling

The API provides centralized handling for:

Validation errors
MongoDB errors
Multer errors
Duplicate records
Invalid IDs
Application errors
Unknown routes
⚙️ Environment Variables

Create a .env file in the backend root.

NODE_ENV=development

PORT=5001

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

GEMINI_API_KEY=your_gemini_api_key

For production:

NODE_ENV=production

Never commit .env to GitHub.

🚀 Getting Started
1. Clone Repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
2. Go to Backend
cd backend
3. Install Dependencies
npm install
4. Configure Environment Variables

Create:

.env

and add the required environment variables.

5. Seed Templates
npm run seed
6. Start Development Server
npm run dev

The server will run on:

http://localhost:5001
📜 Available Scripts
Development
npm run dev

Starts the development server with tsx.

Build
npm run build

Compiles TypeScript into JavaScript.

Production
npm start

Starts the compiled production server.

Seed
npm run seed

Seeds initial poster templates into MongoDB.

🧪 API Testing

You can test the API using:

Postman
Insomnia
Thunder Client
Frontend application

Basic server test:

GET /

Expected response:

{
  "success": true,
  "message": "AI Political Poster API is running"
}
📊 Poster Status

Posters can have the following statuses:

GENERATING
COMPLETED
FAILED

Generation count is also stored for regeneration control.

🏗️ Architecture

The backend follows a modular architecture.

Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Database / External Services
   ↓
Response

External services:

MongoDB
   │
   ├── Users
   ├── Templates
   └── Posters
       
Cloudinary
   │
   ├── Source Images
   └── Generated Posters

Gemini
   │
   └── Layout Suggestions
🌐 Deployment

The backend is deployed on Vercel.

Production environment variables must be configured in the deployment platform.

Required services:

MongoDB
Cloudinary
Google Gemini API
Vercel

Production environment:

NODE_ENV=production
🔮 Future Improvements

Potential future improvements include:

Admin dashboard
Template management
User management
Poster moderation
Usage analytics
PDF export
Bulk poster generation
CSV-based generation
Improved Bangla font rendering
Cloudinary public ID based asset cleanup
More poster templates
Advanced layout generation
Background removal
Image optimization
👨‍💻 Author

Nakibul Islam

Full Stack Developer

GitHub:
https://github.com/nakib-code

Portfolio:
https://ahmed-nakib-portfolio.vercel.app/

📄 License

This project was created for educational, portfolio, and assignment purposes.


এটা তোমার **শুধু backend repository-এর `README.md`** হিসেবে ব্যবহার করতে পারো। Frontend-এর কোনো unnecessary detail এখানে রাখিনি।
amaek amon bavae dew jate pura on clik cpoy korte pai

অবশ্যই। নিচের একটা মাত্র code block-এর পুরোটা একবারে copy করতে পারবে। README.md ফাইলে paste করলেই হবে।

# AI Political Poster Maker — Backend

Backend API for **AI Political Poster Maker**, a web application for creating customizable political and event posters using predefined templates, user-provided content, uploaded images, and AI-assisted visual layout suggestions.

The backend handles authentication, poster generation, image uploads, AI layout suggestions, template management, Cloudinary storage, and poster history.

---

## 🚀 Live API

Production API:

https://ai-political-poster-maker-backend-64aub7iqk.vercel.app/

---

## ✨ Features

- User registration and login
- JWT-based authentication
- Protected API routes
- User profile endpoint
- Poster template management
- AI-assisted poster layout suggestions
- Exact preservation of user-provided text
- Image upload with Cloudinary
- Maximum 3 images per poster
- Maximum 5MB per image
- Poster generation using SVG and Sharp
- Generated poster upload to Cloudinary
- Poster history
- Poster regeneration
- Poster deletion
- Automatic Cloudinary image cleanup
- MongoDB database with Mongoose
- Request validation with Zod
- Global error handling
- API rate limiting
- CORS configuration
- Async error handling
- 404 route handling
- Production environment configuration

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- MongoDB
- Mongoose

### Authentication

- JSON Web Token (JWT)
- bcrypt

### AI

- Google Gemini API
- @google/genai

### Image Processing

- Sharp
- SVG

### Image Storage

- Cloudinary
- Multer

### Validation & Security

- Zod
- express-rate-limit
- CORS

### Deployment

- Vercel

---

## 📁 Project Structure

```text
backend/
│
├── src/
│   ├── app.ts
│   ├── server.ts
│   │
│   ├── config/
│   │   ├── env.ts
│   │   ├── db.ts
│   │   ├── cloudinary.ts
│   │   └── gemini.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── validate.middleware.ts
│   │   ├── rateLimit.middleware.ts
│   │   └── notFound.middleware.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── bcrypt.ts
│   │   ├── catchAsync.ts
│   │   ├── sendResponse.ts
│   │   └── AppError.ts
│   │
│   ├── types/
│   │   └── express.d.ts
│   │
│   ├── routes/
│   │   └── index.ts
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── template/
│   │   ├── poster/
│   │   ├── upload/
│   │   ├── ai/
│   │   ├── renderer/
│   │   └── admin/
│   │
│   └── seed/
│       └── seed.ts
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
🔐 Authentication

The API uses JWT authentication.

After successful registration or login, the server returns an access token.

Protected routes require:

Authorization: Bearer YOUR_TOKEN
Supported Authentication Methods

Users can register and login using:

Email
Phone number
📌 API Endpoints

Base URL:

https://ai-political-poster-maker-backend-64aub7iqk.vercel.app
Authentication
Register
POST /api/auth/register

Example request:

{
  "name": "Ahmed Nakib",
  "email": "user@example.com",
  "password": "123456"
}

Phone registration is also supported.

Login
POST /api/auth/login

Example:

{
  "email": "user@example.com",
  "password": "123456"
}
Get Current User
GET /api/auth/me

Requires authentication.

🎨 Templates
Get All Templates
GET /api/templates

Returns all active poster templates.

Get Single Template
GET /api/templates/:id

Returns a specific active template.

🖼️ Image Upload

Images are uploaded to Cloudinary before poster creation.

Upload Images
POST /api/upload/images

Requires authentication.

Form-data:

images: file
Upload Rules
Maximum 3 images
Maximum 5MB per image
Images are stored in Cloudinary
Returned URLs are used during poster generation

Example response:

{
  "success": true,
  "data": {
    "urls": [
      "https://res.cloudinary.com/..."
    ]
  }
}
🖼️ Poster API
Create Poster
POST /api/posters

Requires authentication.

Example:

{
  "templateId": "TEMPLATE_ID",
  "name": "Ahmed Nakib",
  "designation": "Member",
  "organization": "Organization Name",
  "union": "Union Name",
  "thana": "Thana Name",
  "district": "District Name",
  "occasion": "Victory Day",
  "headline": "Victory Day Celebration",
  "photoUrls": [
    "https://res.cloudinary.com/..."
  ]
}
Poster Generation Flow
Create Poster Request
        ↓
Validate Request
        ↓
Create Poster
        ↓
Gemini Layout Suggestion
        ↓
SVG Poster Rendering
        ↓
Sharp Image Processing
        ↓
Upload Generated PNG
        ↓
Cloudinary
        ↓
Save Generated URL
        ↓
Return Poster
Get My Posters
GET /api/posters

Returns posters created by the authenticated user.

Get Single Poster
GET /api/posters/:id

Returns a specific poster belonging to the authenticated user.

Regenerate Poster
POST /api/posters/:id/regenerate

Regenerates the poster using the existing poster information.

A maximum of 3 generations is allowed.

Delete Poster
DELETE /api/posters/:id

Deletes:

Generated poster from Cloudinary
Uploaded source images from Cloudinary
Poster record from MongoDB
🤖 AI Layout Generation

Google Gemini is used only for visual layout and design suggestions.

The AI can suggest:

Background style
Primary color
Secondary color
Text alignment
Photo arrangement
Decoration style
Font style

The AI does not rewrite user-provided political text.

User-provided:

Headline
Name
Designation
Organization
Location

are preserved as provided.

The AI is not used to generate political slogans, politician names, or political party names.

🎨 Poster Renderer

Poster images are generated using:

SVG
Sharp

Default poster size:

1080 × 1350

Supported photo layouts:

Single Photo
┌─────────────────────┐
│                     │
│       PHOTO         │
│                     │
├─────────────────────┤
│      HEADLINE       │
│        NAME         │
│    DESIGNATION      │
└─────────────────────┘
Two Photos
┌─────────────────────┐
│                     │
│  PHOTO  │  PHOTO    │
│                     │
├─────────────────────┤
│      HEADLINE       │
│        NAME         │
└─────────────────────┘
Three Photos
┌─────────────────────┐
│                     │
│ P1 │ P2 │ P3        │
│                     │
├─────────────────────┤
│      HEADLINE       │
│        NAME         │
└─────────────────────┘
☁️ Cloudinary

Cloudinary is used for:

User-uploaded images
Generated poster images

Folders:

ai-political-poster/

Generated posters:

ai-political-poster/generated/
🗄️ Database

MongoDB is used as the primary database.

Main collections:

users
templates
posters
User
name
email
phone
passwordHash
role
createdAt
updatedAt
Template
title
occasionType
thumbnailUrl
backgroundUrl
layoutConfig
isActive
createdAt
updatedAt
Poster
userId
templateId
name
designation
organization
union
thana
district
occasion
headline
photoUrls
status
generatedImageUrl
generationCount
createdAt
updatedAt
🔒 Security

The backend includes several security and reliability measures.

JWT Authentication

Protected routes require a valid JWT.

Password Hashing

Passwords are hashed using bcrypt before being stored.

Rate Limiting

API requests are rate-limited to reduce abuse.

Authentication and AI-related endpoints use stricter limits.

Request Validation

Incoming data is validated using Zod.

File Limits

Uploaded images are limited to:

Maximum files: 3
Maximum size: 5MB per file
CORS

Frontend access is controlled using the configured frontend URL.

Global Error Handling

The API provides centralized handling for:

Validation errors
MongoDB errors
Multer errors
Duplicate records
Invalid IDs
Application errors
Unknown routes
⚙️ Environment Variables

Create a .env file in the backend root.

NODE_ENV=development

PORT=5001

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

GEMINI_API_KEY=your_gemini_api_key

For production:

NODE_ENV=production

Never commit .env to GitHub.

🚀 Getting Started
1. Clone Repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
2. Go to Backend
cd backend
3. Install Dependencies
npm install
4. Configure Environment Variables

Create:

.env

and add the required environment variables.

5. Seed Templates
npm run seed
6. Start Development Server
npm run dev

The server will run on:

http://localhost:5001
📜 Available Scripts
Development
npm run dev

Starts the development server with tsx.

Build
npm run build

Compiles TypeScript into JavaScript.

Production
npm start

Starts the compiled production server.

Seed
npm run seed

Seeds initial poster templates into MongoDB.

🧪 API Testing

You can test the API using:

Postman
Insomnia
Thunder Client
Frontend application

Basic server test:

GET /

Expected response:

{
  "success": true,
  "message": "AI Political Poster API is running"
}
📊 Poster Status

Posters can have the following statuses:

GENERATING
COMPLETED
FAILED

Generation count is also stored for regeneration control.

🏗️ Architecture

The backend follows a modular architecture.

Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Database / External Services
   ↓
Response

External services:

MongoDB
   │
   ├── Users
   ├── Templates
   └── Posters

Cloudinary
   │
   ├── Source Images
   └── Generated Posters

Gemini
   │
   └── Layout Suggestions
🌐 Deployment

The backend is deployed on Vercel.

Production environment variables must be configured in the deployment platform.

Required services:

MongoDB
Cloudinary
Google Gemini API
Vercel

Production environment:

NODE_ENV=production
🔮 Future Improvements

Potential future improvements include:

Admin dashboard
Template management
User management
Poster moderation
Usage analytics
PDF export
Bulk poster generation
CSV-based generation
Improved Bangla font rendering
Cloudinary public ID based asset cleanup
More poster templates
Advanced layout generation
Background removal
Image optimization
👨‍💻 Author

Nakibul Islam

Full Stack Developer

GitHub:

https://github.com/nakib-code

Portfolio:

https://ahmed-nakib-portfolio.vercel.app/

