<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Resume Filter - Documentation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1, h2, h3 {
            color: #333;
        }
        code {
            background-color: #e4e4e4;
            padding: 5px;
            border-radius: 4px;
            font-family: "Courier New", monospace;
        }
        pre {
            background-color: #222;
            color: #fff;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        .container {
            max-width: 800px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>

<div class="container">
    <h1>AI Resume Filter 🎯</h1>
    <p>AI-powered Resume Filtering system that helps recruiters efficiently screen and rank resumes using Machine Learning.</p>

    <h2>🚀 Features</h2>
    <ul>
        <li>📄 <b>Automated Resume Screening</b>: Uses AI to filter and rank resumes based on job descriptions.</li>
        <li>🎯 <b>Keyword Matching</b>: Matches resumes with job-specific keywords.</li>
        <li>🧠 <b>ML-based Scoring</b>: Assigns scores to resumes based on relevance.</li>
        <li>📊 <b>Dashboard</b>: Visual insights into shortlisted candidates.</li>
    </ul>

    <h2>🛠️ Tech Stack</h2>
    <ul>
        <li><b>Backend</b>: Node.js, Express.js</li>
        <li><b>Frontend</b>: React.js / Next.js</li>
        <li><b>Machine Learning</b>: GROQ LLAMA API</li>
        <li><b>Database</b>: MongoDB / PostgreSQL</li>
        <li><b>Cloud & Deployment</b>: AWS / Vercel / Heroku</li>
    </ul>

    <h2>📂 Project Structure</h2>
    <pre>
AI-Resume-Filter/
│── backend/          # Backend API for AI processing
│── frontend/         # Frontend UI for recruiters
│── models/           # ML models for resume filtering
│── dataset/          # Sample resumes for training/testing
│── README.md         # Project documentation
└── .env              # Environment variables
    </pre>

    <h2>🔧 Setup Instructions</h2>

    <h3>1️⃣ Clone the Repository</h3>
    <pre><code>git clone https://github.com/Codewith-me1/AI-Resume-Filter.git
cd AI-Resume-Filter</code></pre>

    <h3>2️⃣ Set Up Environment Variables</h3>
    <p>Create a <code>.env</code> file in the <b>backend</b> folder and add your GROQ LLAMA API key:</p>
    <pre><code>GROQ_API_KEY=your_api_key_here</code></pre>

    <h2>🚀 Running Commands</h2>

    <h3>Backend Commands</h3>
    <pre><code>cd backend
npm install
node server/server.cjs</code></pre>

    <h3>Frontend Commands</h3>
    <pre><code>cd frontend
npm install
npm run dev</code></pre>

    <h2>📈 Future Enhancements</h2>
    <ul>
        <li>🤖 AI-powered chatbot for job recommendations</li>
        <li>🔥 Resume parsing and skill extraction</li>
        <li>🌍 Multi-language support</li>
    </ul>

    <h2>🤝 Contribution</h2>
    <p>Contributions are welcome! Feel free to fork and submit PRs. 😊</p>

    <hr>
    <p>💡 <b>Made with ❤️ by [Your Name]</b></p>
</div>

</body>
</html>
