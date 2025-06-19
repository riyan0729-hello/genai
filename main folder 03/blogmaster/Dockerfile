# Install backend
FROM python:3.10-slim as backend
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend /app

# Install frontend
FROM node:18 as frontend
WORKDIR /frontend
COPY frontend /frontend
RUN npm install && npm run build

# Final container
FROM python:3.10-slim
WORKDIR /app
COPY --from=backend /app /app
COPY --from=frontend /frontend/build /app/static
ENV GOOGLE_API_KEY=your_api_key_here
EXPOSE 5000
CMD ["python", "app.py"]