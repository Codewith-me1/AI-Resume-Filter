

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Groq = require("groq-sdk");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// File Upload Middleware (Ensuring Buffer Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Groq API Setup
const groqApiKey = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: groqApiKey });






const resultScheme = {
  Details: {
    Name: { title: "Name", type: "string" },
    Email: { title: "Email", type: "string" },
    Expirence: { title: "Expirence", type: "string" },
    Phone: { 
      title: "PhoneNo", 
      anyOf: [{ type: "string" }, { type: "null" }] 
    },
    Links: {
      title: "Links",
      type: "array", // Links is now an array
      items: {
        type: "object", // Each item in the array is an object
        properties: {
          platform: { type: "string" }, // Platform name (e.g., "GitHub", "LinkedIn")
          url: { type: "string" }, // URL of the social link
        },
        required: ["platform", "url"], // Both fields are required
      },
    },
    Skills: { 
      title: "Skills", 
      anyOf: [{ type: "string" }, { type: "null" }] 
    },
    WorkExpirence:{
      title:"WorkExpirence",
      type:"array",
      items:{
        type:"object",
        properties:{
           position:{type:"string"},
           company:{type:"string"},
           duration:{type:"string"},
           description:{type:"string"},
        }
      }
    },
    PortfolioLinks: { 
      title: "PortfolioLinks", 
      anyOf: [{ type: "string" }, { type: "null" }] 
    },
    Relevance: { title: "string", type: "string" },
    MatchScore: { title: "string", type: "string" }
  }
};

app.post("/api/upload", upload.array("files", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const jobDescription = req.body.jobDescription?.trim().slice(0, 1000) || "No job description provided";
    const resumeTexts = [];

    // Extract text from all uploaded PDFs
    for (const file of req.files) {
      try {
        const pdfData = await pdfParse(file.buffer);
        const resumeText = pdfData.text.trim().slice(0, 3000); // Limit size
        resumeTexts.push({ fileName: file.originalname, text: resumeText });
        console.log(pdfData)

      } catch (err) {
        console.error(`Error parsing PDF ${file.originalname}:`, err);
      }
    }

    if (resumeTexts.length === 0) {
      return res.status(400).json({ error: "Could not extract text from any uploaded PDFs" });
    }

    // AI Processing with Groq (Analyze each resume separately)
    const matchResults = await Promise.all(
      resumeTexts.map(async ({ fileName, text }) => {
        try {

          const jsonSchema= JSON.stringify(resultScheme,null,4);
          const response = await groq.chat.completions.create({
            messages: [
              {
                role: "system",
                content: `You are a professional resume parser. Extract only the requested detail from resumes.  
                
               
                - If the resume does not contain the requested detail,  Return the Releveance As Low or Irrelevant .  
                - Based on the Job Description Provider By the User Give the Resume MatchScore , Relevance".
                
                - ALL OUTPUTS MUST BE IN JSON.Strictly following this JSON Schema ${jsonSchema}


                
          
                Strictly follow these rules and do not provide any additional text.`
              },
              { role: "user", content: `Match this resume:\n${text}\nwith this job description:\n${jobDescription}` }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
          });
          

          const data = JSON.parse(response.choices[0]?.message?.content)
          

          return { fileName, data };
        } catch (error) {
          console.error(`Error processing resume ${fileName}:`, error);
          return { fileName, data: "Error processing" };
        }
      })
    );

    res.json({ success: true, results: matchResults });
  } catch (error) {
    console.error("Error processing resumes:", error);
    res.status(500).json({ error: "Error processing resumes" });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
