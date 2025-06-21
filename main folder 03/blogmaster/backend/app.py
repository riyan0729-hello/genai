from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import random
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

# Configure Gemini API
genai.configure(api_key=api_key)

# Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Joke list
jokes = [
    "Why don't programmers like nature? It has too many bugs.",
    "Why do Java developers wear glasses? Because they don't see sharp.",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "Why do Python programmers prefer using snake_case? Because it's easier to read!",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "Why did the developer go broke? Because he used up all his cache.",
    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25.",
    "Why did the programmer get kicked out of the beach? Because he kept using the 'C' language!",
    "Why was the computer cold? It left its Windows open."
]

def get_joke():
    return random.choice(jokes)

# Construct prompt
def construct_prompt(topic, word_count, language_level, tone=None, audience=None, perspective=None, structure=None):
    prompt = f"Write a high-quality blog post of approximately {word_count} words on the topic: \"{topic}\". "
    prompt += f"The language should be appropriate for a {language_level} reader.\n"

    if tone:
        prompt += f"Write it in a {tone} tone.\n"
    if audience:
        prompt += f"The content should be suitable and relevant for {audience}.\n"
    if perspective:
        prompt += f"Use a {perspective} point of view throughout the blog.\n"
    if structure:
        prompt += f"Organize the blog with a clear {structure}—including an introduction, body, and conclusion.\n"

    prompt += "Make it informative, engaging, and well-structured. Use clear examples, data, or relevant insights where appropriate."
    return prompt

@app.route("/", methods=["GET"])
def home():
    return "🚀 BlogMaster Backend is running!"

@app.route("/generate", methods=["POST"])
def generate_blog():
    try:
        data = request.json
        topic = data.get("topic")
        word_count = data.get("word_count", 500)
        language_level = data.get("language_level", "intermediate")
        tone = data.get("tone")
        audience = data.get("audience")
        perspective = data.get("perspective")
        structure = data.get("structure")

        prompt = construct_prompt(topic, word_count, language_level, tone, audience, perspective, structure)
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)

        return jsonify({
            "blog": response.text,
            "joke": get_joke()
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
