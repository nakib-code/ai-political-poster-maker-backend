# AI Political Poster Maker — Backend

Backend API for **AI Political Poster Maker**, a web application for creating customizable political and event posters using predefined templates, user-provided content, uploaded images, and AI-assisted visual layout suggestions.

The backend handles authentication, poster generation, image uploads, AI layout suggestions, template management, Cloudinary storage, and poster history.

---

## 🚀 Live Links

- **Production API:** [https://ai-political-poster-maker-backend.vercel.app/](https://ai-political-poster-maker-backend.vercel.app/)
- **Frontend App:** [https://ai-political-poster-maker-frontend.vercel.app/](https://ai-political-poster-maker-frontend.vercel.app/)

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
```

---

## 🔐 Authentication

The API uses JWT authentication.

After successful registration or login, the server returns an access token.

Protected routes require:

```http
Authorization: Bearer YOUR_TOKEN
```

### Supported Authentication Methods

Users can register and login using:

- Email
- Phone number

---

## 📌 API Endpoints

**Base URL:**
`https://ai-political-poster-maker-backend.vercel.app`

### Authentication

#### Register
- **POST** `/api/auth/register`
- **Example Request:**
  ```json
  {
    "name": "Ahmed Nakib",
    "email": "user@example.com",
    "password": "123456"
  }
  ```
  *(Phone registration is also supported)*

#### Login
- **POST** `/api/auth/login`
- **Example Request:**
  ```json
  {
    "email": "user@example.com",
    "password": "123456"
  }
  ```

#### Get Current User
- **GET** `/api/auth/me` *(Requires authentication)*

---

### 🎨 Templates

#### Get All Templates
- **GET** `/api/templates` — Returns all active poster templates.

#### Get Single Template
- **GET** `/api/templates/:id` — Returns a specific active template.

---

### 🖼️ Image Upload

Images are uploaded to Cloudinary before poster creation.

- **POST** `/api/upload/images` *(Requires authentication)*
- **Form-data:** `images: file`

#### Upload Rules
- Maximum 3 images
- Maximum 5MB per image
- Images are stored in Cloudinary
- Returned URLs are used during poster generation

- **Example Response:**
  ```json
  {
    "success": true,
    "data": {
      "urls": [
        "https://res.cloudinary.com/..."
      ]
    }
  }
  ```

---

### 🖼️ Poster API

#### Create Poster
- **POST** `/api/posters` *(Requires authentication)*
- **Example Request:**
  ```json
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
  ```

#### Poster Generation Flow
```text
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
Upload Generated PNG → Cloudinary
        ↓
Save Generated URL
        ↓
Return Poster
```

#### Get My Posters
- **GET** `/api/posters` — Returns posters created by the authenticated user.

#### Get Single Poster
- **GET** `/api/posters/:id` — Returns a specific poster belonging to the authenticated user.

#### Regenerate Poster
- **POST** `/api/posters/:id/regenerate` — Regenerates the poster using the existing poster information. *(A maximum of 3 generations is allowed)*.

#### Delete Poster
- **DELETE** `/api/posters/:id` — Deletes generated poster, source images from Cloudinary, and poster record from MongoDB.

---

## 🤖 AI Layout Generation

Google Gemini is used only for visual layout and design suggestions.

**The AI can suggest:**
- Background style
- Primary color
- Secondary color
- Text alignment
- Photo arrangement
- Decoration style
- Font style

> **Note:** The AI does not rewrite user-provided political text (Headline, Name, Designation, Organization, Location), and is not used to generate political slogans, politician names, or political party names.

---

## 🎨 Poster Renderer

- **Tools:** SVG and Sharp
- **Default poster size:** `1080 × 1350`

### Supported Photo Layouts:
- **Single Photo:** Photo on top, text details below.
- **Two Photos:** Side-by-side photos on top, text details below.
- **Three Photos:** Three photos side-by-side on top, text details below.

---

## ☁️ Cloudinary

Used for user-uploaded images and generated poster images.

- **Folders:**
  - Source images: `ai-political-poster/`
  - Generated posters: `ai-political-poster/generated/`

---

## 🗄️ Database

MongoDB is used as the primary database with three main collections: `users`, `templates`, and `posters`.

---

## 🔒 Security

- **JWT Authentication:** Protected routes require a valid JWT.
- **Password Hashing:** Passwords are hashed using bcrypt.
- **Rate Limiting:** API requests are rate-limited to reduce abuse.
- **Request Validation:** Incoming data is validated using Zod.
- **File Limits:** Max 3 files, max 5MB per file.
- **CORS:** Configured for frontend integration.
- **Global Error Handling:** Centralized handling for validation, database, multer, and application errors.

---

## ⚙️ Environment Variables

Create a `.env` file in the backend root:

```env
NODE_ENV=development
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://ai-political-poster-maker-frontend.vercel.app

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

GEMINI_API_KEY=your_gemini_api_key
```

*(For production, set `NODE_ENV=production`)*. **Never commit `.env` to GitHub.**

---

## 🚀 Getting Started

1. **Clone Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   ```
2. **Go to Backend**
   ```bash
   cd backend
   ```
3. **Install Dependencies**
   ```bash
   npm install
   ```
4. **Configure Environment Variables** (Create `.env` file)
5. **Seed Templates**
   ```bash
   npm run seed
   ```
6. **Start Development Server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5001`

---

## 📜 Available Scripts

- **Development:** `npm run dev` (Starts development server with tsx)
- **Build:** `npm run build` (Compiles TypeScript into JavaScript)
- **Production:** `npm start` (Starts compiled production server)
- **Seed:** `npm run seed` (Seeds initial templates into MongoDB)

---

## 📊 Poster Status

Posters can have the following statuses:
- `GENERATING`
- `COMPLETED`
- `FAILED`

---

## 🌐 Deployment

Deployed on Vercel. Ensure all environment variables are properly configured in your Vercel project dashboard.

---

## 👨‍💻 Author

**Nakibul Islam**  
Full Stack Developer  

- GitHub: [https://github.com/nakib-code](https://github.com/nakib-code)
- Portfolio: [https://ahmed-nakib-portfolio.vercel.app/](https://ahmed-nakib-portfolio.vercel.app/)

---

## 📄 License

This project was created for educational, portfolio, and assignment purposes.