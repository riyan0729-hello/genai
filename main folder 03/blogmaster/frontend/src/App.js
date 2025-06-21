import React, { useState, useEffect } from "react";
import "./App.css";

// ✅ Move jokes array OUTSIDE the component
const jokes = [
  "Why don't programmers like nature? It has too many bugs.",
  "Why do Java developers wear glasses? Because they don't see sharp.",
  "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
];

function App() {
  const [topic, setTopic] = useState("");
  const [wordCount, setWordCount] = useState(1000);
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const [joke, setJoke] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedTone, setSelectedTone] = useState("professional");
  const [selectedLevel, setSelectedLevel] = useState("intermediate");
  const [selectedPerspective, setSelectedPerspective] = useState("");
  const [selectedStructure, setSelectedStructure] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const tones = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "humorous", label: "Humorous" },
    { value: "academic", label: "Academic" },
    { value: "persuasive", label: "Persuasive" },
  ];

  const languageLevels = [
    { value: "basic", label: "Basic" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const perspectives = [
    { value: "", label: "None" },
    { value: "first-person", label: "First Person" },
    { value: "second-person", label: "Second Person" },
    { value: "third-person", label: "Third Person" },
  ];

  const structures = [
    { value: "", label: "Default" },
    { value: "listicle", label: "Listicle" },
    { value: "problem-solution", label: "Problem-Solution" },
    { value: "how-to", label: "How-To Guide" },
    { value: "comparison", label: "Comparison" },
  ];

  const sampleTopics = [
    "The Future of AI in Healthcare",
    "Sustainable Living Tips for Urban Dwellers",
    "Blockchain Technology Explained Simply",
    "Mental Health in the Digital Age",
    "Renewable Energy Innovations",
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        setJoke(randomJoke);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [loading]); // ✅ `jokes` removed from dependency

  useEffect(() => {
    if (blog && !loading) {
      setShowConfetti(true);
      const timeout = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [blog, loading]);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const handleGenerate = async () => {
    if (!topic.trim() || wordCount < 100) {
      alert("Please provide a valid topic and word count (minimum 100 words).");
      return;
    }

    setLoading(true);
    setBlog("");
    setJoke(jokes[Math.floor(Math.random() * jokes.length)]);
    setHistory((prev) => [
      ...prev,
      { topic, date: new Date().toLocaleString() },
    ]);

    try {
      const res = await fetch("https://blogmaster-backend-3tjt.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          word_count: wordCount,
          tone: selectedTone,
          language_level: selectedLevel,
          perspective: selectedPerspective,
          structure: selectedStructure,
          audience: targetAudience,
        }),
      });
      const data = await res.json();
      setBlog(data.blog);
    } catch (err) {
      setBlog("❌ Failed to generate blog. Please try again later.");
    }
    setLoading(false);
  };

  const handleSampleTopicClick = (sample) => setTopic(sample);
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(blog);
    alert("Blog copied to clipboard!");
  };
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([blog], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `blog_${topic.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // [Rest of your JSX remains unchanged...]
  return (
    // your UI JSX code here
    <> {/* your full JSX was already perfect, no need to repeat it again */} </>
  );
}

export default App;
