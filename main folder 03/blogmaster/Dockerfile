# 🐍 Install backend dependencies
FROM python:3.10-slim AS backend
WORKDIR /app

# Install Python requirements and verify Flask is installed
COPY backend/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    pip show Flask

# Copy backend source code
COPY backend /app

# 🌐 Install frontend dependencies and build
FROM node:18 AS frontend
WORKDIR /frontend
COPY frontend /frontend
RUN npm install && npm run build

# 📦 Final container combining backend + frontend
FROM python:3.10-slim
WORKDIR /app

# Copy backend with installed dependencies
COPY --from=backend /app /app

# Copy built frontend into Flask's static folder
COPY --from=frontend /frontend/build /app/static

# Load Gemini API key (replace this with a .env method in production)
ENV GOOGLE_API_KEY=your_api_key_here

EXPOSE 5000

# Run Flask app
CMD ["python", "app.py"]
