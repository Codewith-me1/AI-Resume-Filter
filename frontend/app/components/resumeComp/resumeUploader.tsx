"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SearchIcon, UploadCloud } from "lucide-react";

const ResumeI = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  // Convert file to Base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Store PDF files in sessionStorage
  const storeFilesInSessionStorage = async (files: File[]) => {
    const fileData = await Promise.all(
      files.map(async (file) => ({
        name: file.name, // ✅ Store file name
        base64: await convertFileToBase64(file), // ✅ Store Base64 data
      }))
    );

    sessionStorage.setItem("pdfFiles", JSON.stringify(fileData));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0 || !jobDescription) {
      alert("Please select at least one file and enter a job description.");
      return;
    }

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("jobDescription", jobDescription);

      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Files uploaded successfully", res.data);

      // Store uploaded data and PDF files in sessionStorage
      sessionStorage.setItem("uploadedData", JSON.stringify(res.data.results));
      await storeFilesInSessionStorage(files);

      router.push("/results");
    } catch (error) {
      console.error("Error uploading files", error);
      alert("There was an error uploading the files. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
        <h3>Upload Your Candidates' Resumes to Filter Out</h3>

        {/* File Upload Section */}
        <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
          <UploadCloud className="w-6 h-6 text-gray-500" />
          <span className="ml-2 text-sm text-gray-500">
            {files.length > 0
              ? `${files.length} files selected`
              : "Click to upload"}
          </span>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept=".pdf"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Job Description Input */}
        <div
          className={`search mt-10 shadow-md flex items-center h-[100px] p-[16px] gap-3 ${
            clicked ? "border-[1px] border-blue-500 rounded-md" : "outline-none"
          }`}
        >
          <SearchIcon />
          <input
            type="text"
            placeholder="Enter job description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            onFocus={() => setClicked(true)}
            onBlur={() => setClicked(false)}
            className="w-full outline-none"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={jobDescription.length === 0}
          className={`px-4 py-2 rounded-md mt-4 ${
            jobDescription.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Upload
        </button>

        {/* List of Uploaded Files */}
        <ul className="mt-4">
          {files.map((file, index) => (
            <li key={index} className="flex justify-between p-2 border-b">
              {file.name}
              <button
                onClick={() => setFiles(files.filter((_, i) => i !== index))}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumeI;
