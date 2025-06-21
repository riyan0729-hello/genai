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
  }, [loading]); // ✅ jokes removed from dependency

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

  return (
    <div className="container">
      {showConfetti && <div className="confetti"></div>}
      
      <header className="app-header">
        <div className="header-content">
          <h1>BlogMaster</h1>
          <p className="subtitle">AI-Powered Blog Generation</p>
        </div>
        <div className="theme-toggle">
          <button className="toggle-btn" onClick={toggleDarkMode}>
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      <section className="input-section">
        <div className="input-group">
          <label htmlFor="topic">Blog Topic</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your blog topic..."
          />
          <div className="sample-topics">
            <span>Try: </span>
            {sampleTopics.map((sample, index) => (
              <button
                key={index}
                className="sample-topic"
                onClick={() => handleSampleTopicClick(sample)}
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="wordCount">Word Count: {wordCount}</label>
            <input
              type="range"
              id="wordCount"
              min="100"
              max="2000"
              step="100"
              value={wordCount}
              onChange={(e) => setWordCount(parseInt(e.target.value))}
            />
          </div>
          <div className="input-group">
            <label htmlFor="tone">Tone</label>
            <select
              id="tone"
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
            >
              {tones.map((tone) => (
                <option key={tone.value} value={tone.value}>
                  {tone.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="level">Language Level</label>
            <select
              id="level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {languageLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="perspective">Perspective</label>
            <select
              id="perspective"
              value={selectedPerspective}
              onChange={(e) => setSelectedPerspective(e.target.value)}
            >
              {perspectives.map((perspective) => (
                <option key={perspective.value} value={perspective.value}>
                  {perspective.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="structure">Structure</label>
            <select
              id="structure"
              value={selectedStructure}
              onChange={(e) => setSelectedStructure(e.target.value)}
            >
              {structures.map((structure) => (
                <option key={structure.value} value={structure.value}>
                  {structure.label}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="audience">Target Audience</label>
            <input
              type="text"
              id="audience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., Beginners, Professionals..."
            />
          </div>
        </div>

        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              Generating Blog...
            </>
          ) : (
            "Generate Blog"
          )}
        </button>
      </section>

      {loading && (
        <section className="loading-section">
          <div className="loading-animation">
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="loading-text">Crafting your perfect blog post...</p>
            {joke && (
              <div className="joke-box">
                <p>💡 While you wait: {joke}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {blog && !loading && (
        <section className="blog-output">
          <div className="blog-header">
            <h2>Generated Blog</h2>
            <div className="blog-actions">
              <button className="action-btn" onClick={handleCopyToClipboard}>
                📋 Copy
              </button>
              <button className="action-btn" onClick={handleDownload}>
                💾 Download
              </button>
            </div>
          </div>
          <div className="blog-content">
            {blog.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {history.length > 0 && (
        <section className="history-section">
          <h3>Recent Generations</h3>
          <ul>
            {history.slice(-5).reverse().map((item, index) => (
              <li key={index}>
                <span className="history-topic">{item.topic}</span>
                <span className="history-date">{item.date}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="app-footer">
        <p>Powered by AI • Built with React</p>
      </footer>
    </div>
  );
}

export default App;
