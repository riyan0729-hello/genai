import React, { useState } from "react";
import axios from "axios";

const BlogForm = () => {
  const [topic, setTopic] = useState("");
  const [wordCount, setWordCount] = useState(1000);
  const [blog, setBlog] = useState("");
  const [joke, setJoke] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBlog("Generating...");

    try {
      const res = await axios.post("/generate", {
        topic,
        word_count: wordCount,
      });
      setBlog(res.data.blog);
      setJoke(res.data.joke);
    } catch (err) {
      setBlog("Error generating blog.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter blog topic" />
        <input type="number" value={wordCount} onChange={(e) => setWordCount(e.target.value)} min="100" max="5000" />
        <button type="submit">Generate</button>
      </form>
      {joke && <p><strong>Joke:</strong> {joke}</p>}
      {blog && <div><h3>Your Blog:</h3><p>{blog}</p></div>}
    </div>
  );
};

export default BlogForm;