import React, { useState, useEffect } from "react";
import "./App.css";

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

  const jokes = [
    "Why don't programmers like nature? It has too many bugs.",
    "Why do Java developers wear glasses? Because they don't see sharp.",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        setJoke(randomJoke);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [loading]);

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
      const res = await fetch("http://localhost:5000/generate", {
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

  const handleSampleTopicClick = (sample) => {
    setTopic(sample);
  };

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      {showConfetti && <div className="confetti"></div>}

      <header className="app-header">
        <div className="header-content">
          <h1>✨ BlogMaster Pro</h1>
          <p className="subtitle">
            Create high-quality blogs powered by Gemini 1.5 Flash
          </p>
        </div>
        <div className="theme-toggle">
          <button onClick={toggleDarkMode} className="toggle-btn">
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </header>

      <div className="input-section">
        <div className="input-group">
          <label htmlFor="topic">Blog Topic</label>
          <input
            id="topic"
            type="text"
            placeholder="Enter your blog topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={loading}
          />
          <div className="sample-topics">
            <span>Try: </span>
            {sampleTopics.map((sample, index) => (
              <button
                key={index}
                className="sample-topic"
                onClick={() => handleSampleTopicClick(sample)}
                disabled={loading}
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
              id="wordCount"
              type="range"
              min="100"
              max="5000"
              step="100"
              value={wordCount}
              onChange={(e) => setWordCount(parseInt(e.target.value))}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="tone">Writing Tone</label>
            <select
              id="tone"
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              disabled={loading}
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
              disabled={loading}
            >
              {languageLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="perspective">Point of View</label>
            <select
              id="perspective"
              value={selectedPerspective}
              onChange={(e) => setSelectedPerspective(e.target.value)}
              disabled={loading}
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
            <label htmlFor="structure">Structure Style</label>
            <select
              id="structure"
              value={selectedStructure}
              onChange={(e) => setSelectedStructure(e.target.value)}
              disabled={loading}
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
              id="audience"
              type="text"
              placeholder="e.g., college students, professionals"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="generate-btn"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Generating Magic...
            </>
          ) : (
            "Generate Blog Post"
          )}
        </button>
      </div>

      {loading && (
        <div className="loading-section">
          <div className="loading-animation">
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="loading-text">
              Crafting your "{topic}" blog with {wordCount} words in{" "}
              {selectedTone} tone...
            </p>
          </div>
          {joke && (
            <div className="joke-box">
              <p>💡 Did you know? {joke}</p>
            </div>
          )}
        </div>
      )}

      {blog && (
        <div className="blog-output">
          <div className="blog-header">
            <h2>{topic}</h2>
            <div className="blog-actions">
              <button onClick={handleCopyToClipboard} className="action-btn">
                📋 Copy
              </button>
              <button onClick={handleDownload} className="action-btn">
                ⬇️ Download
              </button>
            </div>
          </div>
          <div className="blog-content">
            {blog.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-section">
          <h3>Recent Generations</h3>
          <ul>
            {history.slice(0, 5).map((item, index) => (
              <li key={index}>
                <span className="history-topic">{item.topic}</span>
                <span className="history-date">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <footer className="app-footer">
        <p>Powered by Gemini 1.5 Flash • Made with ❤️ for content creators</p>
        <p>
          {" "}
          A Project by Riyan Mohammed • Suhani Srivastava • Rahul Dutta • Prisha
          Verma{" "}
        </p>
      </footer>
    </div>
  );
}

export default App;
