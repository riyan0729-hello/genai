# BlogMaster

An AI-powered blog content generation platform that creates high-quality, structured blog posts based on user-defined parameters.

## Overview

BlogMaster addresses the challenge of consistently creating high-quality blog content by providing an AI-powered platform that generates well-structured blog posts. Whether you're a content creator, marketer, or educator, BlogMaster enables faster, scalable, and more efficient content production.

## Features

- **AI-Powered Content Generation**: Leverages Google Gemini 1.5 Flash API for intelligent blog creation
- **Customizable Parameters**: Set topic, tone, and word count to match your needs
- **Responsive Design**: Works seamlessly across all devices and major browsers
- **Interactive Experience**: Displays programming jokes during content generation
- **Easy Copy Functionality**: One-click copying of generated content
- **Fast Generation**: Blog posts generated within 10 seconds
- **Input Validation**: Graceful handling of incorrect or empty inputs

## Tech Stack

- **Frontend**: ReactJS
- **Backend**: Flask (Python)
- **AI Model**: Google Gemini 1.5 Flash API
- **Deployment**: Docker
- **Styling**: Responsive CSS

## Prerequisites

Before you begin, ensure you have the following installed:

- **Operating System**: Windows, macOS, or Linux
- **Python**: Version 3.10 or higher
- **Node.js**: Version 18 or higher
- **Modern Web Browser**: Chrome, Firefox, or equivalent
- **Google Gemini API Key**: Required for AI content generation

## Installation

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blogmaster.git
   cd blogmaster
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your Gemini API key to the .env file
   ```

3. **Build and run with Docker**
   ```bash
   docker build -t blogmaster .
   docker run -p 3000:3000 -p 5000:5000 blogmaster
   ```

### Manual Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blogmaster.git
   cd blogmaster
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   # Set your Gemini API key as an environment variable
   export GEMINI_API_KEY=your_api_key_here
   python app.py
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**
   https://lambent-churros-43f42a.netlify.app/
   

## Usage

1. Open the application in your web browser
2. Enter your blog topic in the input field
3. Specify the desired word count
4. Click "Generate Blog" to create your content
5. Enjoy a programming joke while your blog is being generated
6. Copy the generated blog using the copy button
7. Use the content for your marketing, education, or publishing needs

## Project Structure

```
blogmaster/
├── backend/
│   ├── app.py              # Flask API logic
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/               # React components and logic
│   ├── public/            # Static assets
│   ├── package.json       # Project metadata and scripts
│   └── build/             # Production-ready frontend
├── Dockerfile             # Containerization configuration
├── .dockerignore         # Docker exclusions
├── .env.example          # Environment variables template
└── README.md            # Project documentation
```

## API Integration

BlogMaster integrates with the Google Gemini 1.5 Flash API for content generation. Ensure you have:

1. A valid Gemini API key
2. Proper environment variable configuration
3. Internet connectivity for API requests

## Testing

The project has been thoroughly tested for:

- Blog generation for various topics and lengths 
- Handling empty or invalid user input 
- UI rendering across major web browsers 
- Docker container functionality 

To run tests locally:
```bash
# Backend tests
cd backend
python -m pytest

# Frontend tests
cd frontend
npm test
```

## Team

- **Rahul Dutta 23BCE1250**: Backend development, Gemini API integration, prompt engineering
- **Riyan Mohammed 22BCE2319**: Frontend development using React, API integration and request handling
- **Suhani Srivastava 22BCE2215**: UI/UX design, bug resolution, Docker deployment and full-stack integration
- **Prisha 22BCE3262**: Project planning, requirement documentation, design feedback and user testing oversight


## License

This project is for academic and educational purposes only.

## Acknowledgments

- Google Gemini API for powering our content generation
- React and Flask communities for excellent documentation
- Docker for simplifying deployment

---
