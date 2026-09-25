# AI Political Poster Maker

An AI-assisted web application for creating ready-to-print poster designs from user-provided information and photos.

The system uses **Google Gemini for visual layout suggestions**, while the actual poster text and uploaded photos remain controlled by the user. Poster images are rendered using **SVG + Sharp** and stored on **Cloudinary**.

> **Important:** Gemini is used only for visual layout and styling suggestions. It does not generate, rewrite, or modify the user's provided political text.

---

## 📌 Project Status

### Backend

| Feature                    | Status     |
| -------------------------- | ---------- |
| Express + TypeScript setup | ✅ Complete |
| MongoDB connection         | ✅ Complete |
| Environment configuration  | ✅ Complete |
| Authentication             | ✅ Complete |
| JWT authorization          | ✅ Complete |
| User model                 | ✅ Complete |
| Template model             | ✅ Complete |
| Template API               | ✅ Complete |
| Template seed data         | ✅ Complete |
| Image upload               | ✅ Complete |
| Cloudinary integration     | ✅ Complete |
| Gemini integration         | ✅ Complete |
| AI layout generation       | ✅ Complete |
| SVG poster rendering       | ✅ Complete |
| Sharp image processing     | ✅ Complete |
| Poster creation            | ✅ Complete |
| Generated poster upload    | ✅ Complete |
| Poster history             | ✅ Complete |
| Single poster API          | ✅ Complete |
| Poster regeneration        | ✅ Complete |
| Generation limit           | ✅ Complete |

### Frontend

Currently starting development.

Planned:

* Login
* Register
* Dashboard
* Template selection
* Poster creation form
* Multiple image upload
* Poster generation
* Loading state
* Poster preview
* Regenerate
* Download PNG
* Poster history

---

# 🚀 Project Concept

The application allows users to create posters by providing:

* Name
* Designation
* Organization / Party
* Union
* Thana
* District
* Occasion
* Headline
* Up to 3 photos
* Selected template

The system then:

```text
User Input
    ↓
Template Selection
    ↓
Image Upload
    ↓
Cloudinary
    ↓
Gemini Layout Suggestion
    ↓
SVG Poster Generation
    ↓
Sharp
    ↓
PNG
    ↓
Cloudinary
    ↓
Poster Preview
```

---

# 🧠 AI Architecture

The project uses **Option B: AI-assisted layout + deterministic renderer**.

Gemini does not create the final poster image.

Instead:

```text
User Data
    ↓
Gemini
    ↓
Layout Suggestion
    ↓
Renderer
    ↓
Final Poster
```

This approach ensures that:

* User text remains exact
* User photos remain unchanged
* Layout can be AI-assisted
* Final image generation is predictable
* PNG output can be generated programmatically

---

# 🛠️ Technology Stack

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Zod
* Multer
* Cloudinary
* Google Gemini API
* Sharp
* CORS
* Express Rate Limit
* dotenv
* tsx

## Frontend

Planned:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Axios
* React Hook Form
* Zod
* React Icons / Lucide Icons

---

# 📦 Backend Packages

## express

Web server and REST API framework.

```bash
npm install express
```

Used for:

* API routes
* Middleware
* Controllers
* HTTP requests/responses

---

## mongoose

MongoDB ODM.

```bash
npm install mongoose
```

Used for:

* User model
* Template model
* Poster model
* MongoDB queries
* Schema validation

---

## dotenv

Environment variable management.

```bash
npm install dotenv
```

Used for:

```env
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GEMINI_API_KEY=
```

Secrets are not committed to GitHub.

---

## jsonwebtoken

JWT authentication.

```bash
npm install jsonwebtoken
```

Used for:

* Login token creation
* Token verification
* Protected routes

Current token lifetime:

```text
7 days
```

---

## bcryptjs

Password hashing.

```bash
npm install bcryptjs
```

Passwords are never stored directly.

Instead:

```text
Password
   ↓
bcrypt
   ↓
passwordHash
   ↓
MongoDB
```

---

## zod

Request validation.

```bash
npm install zod
```

Used for validating poster creation data.

Example:

```text
name → required
headline → required
templateId → required
photoUrls → maximum 3
```

---

## multer

File upload middleware.

```bash
npm install multer
```

Used for receiving images from frontend/Postman.

Current configuration:

```text
Maximum files: 3
Maximum file size: 5 MB per file
Storage: memory
```

Files are not permanently stored on the backend server.

---

## cloudinary

Image storage.

```bash
npm install cloudinary
```

Used for:

1. User uploaded photos
2. Generated poster PNG

Folders:

```text
ai-political-poster/
ai-political-poster/generated/
```

---

## @google/genai

Google Gemini SDK.

```bash
npm install @google/genai
```

Used for AI layout suggestions.

Gemini returns structured JSON such as:

```json
{
  "backgroundStyle": "...",
  "primaryColor": "#006a4e",
  "secondaryColor": "#f42a41",
  "textAlignment": "center",
  "photoArrangement": "horizontal",
  "decoration": "...",
  "fontStyle": "bold"
}
```

---

## sharp

Image processing and poster rendering.

```bash
npm install sharp
```

Used for:

* SVG → PNG conversion
* Image resizing
* Image cropping
* Photo processing
* Final poster generation

Poster size:

```text
1080 × 1350
```

---

## cors

Cross-origin requests.

```bash
npm install cors
```

Allows frontend:

```text
http://localhost:3000
```

to communicate with backend:

```text
http://localhost:5001
```

---

## express-rate-limit

API rate limiting.

```bash
npm install express-rate-limit
```

Current API limiter:

```text
100 requests
per 15 minutes
```

Applied to:

```text
/api
```

---

## tsx

Run TypeScript directly during development.

```bash
npm install -D tsx
```

Used by:

```json
"dev": "tsx watch src/server.ts"
```

and:

```json
"seed": "tsx src/seed/seed.ts"
```

---

## TypeScript

Static typing.

```bash
npm install -D typescript
```

---

# 📄 package.json

Current backend scripts:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "seed": "tsx src/seed/seed.ts"
  }
}
```

Commands:

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

### Seed database

```bash
npm run seed
```

---

# 📁 Backend Folder Structure

```text
backend/
│
├── src/
│   │
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
│   │   └── rateLimit.middleware.ts
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
│   │   │
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
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

# 🔐 Authentication

Authentication uses:

```text
JWT + bcryptjs
```

Current roles:

```text
USER
ADMIN
```

JWT payload:

```json
{
  "userId": "...",
  "role": "USER"
}
```

Protected requests require:

```http
Authorization: Bearer TOKEN
```

---

# 👤 User Model

User fields:

```text
name
email
phone
passwordHash
role
createdAt
updatedAt
```

Email and phone are optional.

Role:

```text
USER
ADMIN
```

---

# 🎨 Template System

The application currently has 3 seeded templates.

## Victory Day

```text
Occasion: VICTORY_DAY
Photo slots: 2
Colors:
#006a4e
#f42a41
```

## Condolence

```text
Occasion: CONDOLENCE
Photo slots: 1
Colors:
#111111
#ffffff
```

## Campaign

```text
Occasion: CAMPAIGN
Photo slots: 3
Colors:
#1e3a8a
#ffffff
```

Template fields:

```text
title
occasionType
thumbnailUrl
backgroundUrl
layoutConfig
isActive
createdAt
updatedAt
```

---

# 🖼️ Image Upload System

Images are uploaded using:

```http
POST /api/upload/images
```

Request:

```text
multipart/form-data
```

Field name:

```text
images
```

Maximum:

```text
3 images
```

Maximum size:

```text
5 MB per image
```

Flow:

```text
Frontend
   ↓
Multer
   ↓
Memory Buffer
   ↓
Cloudinary
   ↓
Secure URL
```

MongoDB stores only the Cloudinary URLs.

Raw image files are not stored in MongoDB.

---

# 🤖 Gemini AI

Gemini endpoint:

```http
POST /api/ai/layout
```

Example request:

```json
{
  "occasion": "Victory Day",
  "headline": "বিজয় দিবসের শুভেচ্ছা",
  "templateTitle": "Victory Day",
  "colors": [
    "#006a4e",
    "#f42a41"
  ],
  "photoSlots": 2
}
```

Gemini provides visual suggestions such as:

```text
Background style
Primary color
Secondary color
Text alignment
Photo arrangement
Decoration
Font style
```

Gemini is instructed:

```text
Do not rewrite the headline.
Do not create political slogans.
Do not create politician names.
Do not create party names.
Only suggest visual layout and styling.
```

This keeps the user's exact supplied text separate from AI-generated design suggestions.

---

# 🖌️ Poster Renderer

The renderer is built using:

```text
SVG
+
Sharp
```

Current poster dimensions:

```text
1080 × 1350
```

The renderer supports:

```text
1 photo
2 photos
3 photos
```

Photos are:

```text
Downloaded from Cloudinary
        ↓
Sharp resize/crop
        ↓
Base64
        ↓
SVG
        ↓
Sharp
        ↓
PNG Buffer
```

User text is XML escaped before inserting it into SVG.

---

# 🧩 Poster Model

Poster fields:

```text
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
```

Poster status:

```text
GENERATING
COMPLETED
FAILED
```

---

# 🏗️ Poster Generation Flow

When the user creates a poster:

```text
POST /api/posters
        ↓
Validate request
        ↓
Find active template
        ↓
Check photo limit
        ↓
Create Poster
status = GENERATING
        ↓
Gemini layout generation
        ↓
Sharp renderer
        ↓
PNG Buffer
        ↓
Upload generated PNG
to Cloudinary
        ↓
Save generatedImageUrl
        ↓
status = COMPLETED
        ↓
generationCount = 1
```

If generation fails:

```text
status = FAILED
```

---

# 🔄 Regenerate System

Endpoint:

```http
POST /api/posters/:id/regenerate
```

The system loads the existing poster and generates a new version.

Flow:

```text
Existing Poster
      ↓
Gemini
      ↓
New Layout
      ↓
Renderer
      ↓
New PNG
      ↓
Cloudinary
      ↓
New generatedImageUrl
```

Generation count increases:

```text
1 → 2 → 3
```

Maximum:

```text
3 generations
```

After reaching 3:

```text
Maximum generation limit reached
```

---

# 📡 API Routes

Base URL:

```text
http://localhost:5001/api
```

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

---

## Templates

```http
GET /api/templates
GET /api/templates/:id
```

---

## Upload

```http
POST /api/upload/images
```

Protected route.

---

## AI

```http
POST /api/ai/layout
```

Protected route.

---

## Posters

```http
POST /api/posters
GET  /api/posters
GET  /api/posters/:id
POST /api/posters/:id/regenerate
```

All poster routes are protected by JWT authentication.

---

# ❤️ Tested Features

The following features have already been tested successfully.

### Health Check

```http
GET /health
```

Response:

```json
{
  "success": true,
  "message": "AI Political Poster API is running"
}
```

### Authentication

Successfully tested:

* Registration
* Login
* JWT authentication
* Protected routes

### Templates

Successfully tested:

* Template listing
* Single template retrieval
* Seed data

### Upload

Successfully tested:

* Cloudinary upload
* Multiple image upload
* Maximum 3 images
* Multer field handling

### Gemini

Successfully tested:

* Gemini API connection
* Structured JSON response
* AI layout suggestion

### Renderer

Successfully tested:

* SVG poster creation
* Sharp conversion
* Actual Cloudinary photos
* 3-photo rendering

### Poster Generation

Successfully tested:

```text
Create
→ Gemini
→ Renderer
→ Cloudinary
→ COMPLETED
```

### Regeneration

Successfully tested:

```text
generationCount: 1
        ↓
Regenerate
        ↓
generationCount: 2
```

A new generated image URL was successfully created.

---

# 🔒 Environment Variables

Create:

```text
.env
```

Example:

```env
PORT=5001
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GEMINI_API_KEY=your_gemini_api_key

FRONTEND_URL=http://localhost:3000
```

Never commit `.env`.

---

# 🚫 Git Ignore

The project ignores:

```text
node_modules/
.next/
dist/

.env
.env.local
.env.*.local

.DS_Store
*.log
```

---

# 🧪 Development Commands

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start production build:

```bash
npm start
```

Seed templates:

```bash
npm run seed
```

---

# 🌐 Local Development

Backend:

```text
http://localhost:5001
```

Health:

```text
http://localhost:5001/health
```

API:

```text
http://localhost:5001/api
```

Frontend:

```text
http://localhost:3000
```

---

# 🗺️ Development Roadmap

## Phase 1 — Backend

* [x] Project setup
* [x] MongoDB
* [x] Authentication
* [x] Templates
* [x] Image upload
* [x] Cloudinary
* [x] Gemini
* [x] Renderer
* [x] Poster generation
* [x] Regeneration
* [x] Poster history
* [x] Single poster API

## Phase 2 — Frontend

* [ ] Next.js setup
* [ ] Landing page
* [ ] Login
* [ ] Register
* [ ] Dashboard
* [ ] Template selection
* [ ] Poster creation form
* [ ] Image upload UI
* [ ] Generate poster
* [ ] Loading state
* [ ] Poster preview
* [ ] Regenerate
* [ ] Download PNG
* [ ] Poster history

## Phase 3 — Polish

* [ ] Responsive design
* [ ] Error handling
* [ ] Toast notifications
* [ ] Loading skeletons
* [ ] Better poster templates
* [ ] Better typography
* [ ] Production environment
* [ ] Deployment

## Phase 4 — Optional Post-MVP

* [ ] Admin dashboard
* [ ] Template management
* [ ] Moderation
* [ ] Analytics
* [ ] PDF export
* [ ] Bulk CSV generation
* [ ] Payment system

---

# 🎯 MVP Goal

The final MVP should allow a user to:

```text
Register
   ↓
Login
   ↓
Choose Template
   ↓
Enter Poster Information
   ↓
Upload Photos
   ↓
Generate
   ↓
Preview Poster
   ↓
Regenerate if needed
   ↓
Download PNG
   ↓
View Poster History
```

---

# 📌 Design Principle

The application separates:

### User-controlled content

```text
Name
Designation
Organization
Location
Occasion
Headline
Photos
```

from:

### AI-controlled design suggestions

```text
Colors
Layout
Photo arrangement
Decoration
Typography style
Background style
```

This makes the generation process more predictable and keeps exact user-provided content unchanged.

---

# 📄 License

This project is currently being developed as an assignment/project for educational and portfolio purposes.
