# BlogMaster

BlogMaster is a web-based platform that uses AI to generate structured blog posts based on user-defined topics and word counts.  
It helps content creators, marketers, and educators save time and maintain quality.

---

## 🚀 Project Design

### 📌 Overview
BlogMaster is designed with a clear separation of concerns:
- **Frontend:** Handles user interaction and display.
- **Backend:** Manages data processing and communication with AI.
- **AI Service:** Generates blog content based on inputs.

---

### 🎨 Frontend Design
- Built with **ReactJS** for a responsive, interactive UI.
- Features:
  - Input fields for topic and word count.
  - Loading indicator with programming jokes for better UX.
  - Display area for generated content.
  - One-click copy button.
- Ensures compatibility across modern browsers.

---

### ⚙️ Backend Design
- Developed using **Flask (Python)**.
- Handles:
  - Receiving and validating user inputs.
  - Communicating securely with the AI API.
  - Returning generated content to the frontend.
- Uses **environment variables** for safe API key management.

---

### 🤖 AI Integration
- Leverages **Google Gemini 1.5 Flash API** for fast, high-quality content generation.
- Receives topic and word count from the backend and returns a structured blog with:
  - Introduction
  - Key points
  - Conclusion

---

### 🔄 Data Flow
1. User enters topic & word count on the React frontend.
2. Frontend sends request to the Flask backend.
3. Backend calls Gemini API with input data.
4. AI returns the generated blog.
5. Frontend displays the blog and enables copy functionality.

---

### 🚢 Deployment & Performance
- Packaged with **Docker** for consistent deployment across environments.
- Optimized to deliver blog content in **under 10 seconds**, meeting performance requirements.

---

## 🛠 Tech Stack
- **Frontend:** ReactJS
- **Backend:** Flask (Python 3.10+)
- **AI Service:** Google Gemini 1.5 Flash API
- **Deployment:** Docker
- **Supported Browsers:** Chrome, Firefox, Edge

---

## ✍️ Team
- **Rahul:** Backend
