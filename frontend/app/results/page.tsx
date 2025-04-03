// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { UploadCloud, Trash2 } from "lucide-react";
// import TableCom from "../components/resumeComp/tableComp";

// interface Data {
//   fileName: string;
//   matchScore: string;
// }

// interface Response {
//   success: boolean;
//   results: Data[];
// }

// const SidebarUploader = ({
//   setResponse,
// }: {
//   setResponse: (res: Response | null) => void;
// }) => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [jobDescription, setJobDescription] = useState<string>("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.length) {
//       setFiles([...files, ...Array.from(e.target.files)]);
//     }
//   };

//   const handleUpload = async () => {
//     if (files.length === 0 || !jobDescription) {
//       alert("Please select at least one file and enter a job description.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       files.forEach((file) => formData.append("files", file));
//       formData.append("jobDescription", jobDescription);

//       const res = await axios.post(
//         "http://localhost:5000/api/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Files uploaded successfully", res.data);
//       setResponse(res.data);

//       // 🔹 Store uploaded data in sessionStorage
//       sessionStorage.setItem("uploadedData", JSON.stringify(res.data.results));
//     } catch (error) {
//       console.error("Error uploading files", error);
//       alert("There was an error uploading the files. Please try again.");
//     }
//   };

//   const removeFile = (index: number) => {
//     setFiles(files.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="w-64 bg-white dark:bg-gray-800 h-screen p-6 shadow-lg fixed left-0 top-0 overflow-auto">
//       <h2 className="text-xl font-bold mb-4">Resume Uploader</h2>
//       <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
//         Upload Resumes
//       </Label>
//       <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
//         <UploadCloud className="w-6 h-6 text-gray-500 dark:text-gray-400" />
//         <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
//           {files.length > 0
//             ? `${files.length} files selected`
//             : "Click to upload"}
//         </span>
//         <input
//           type="file"
//           multiple
//           onChange={handleFileChange}
//           accept=".pdf,.doc,.docx"
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//         />
//       </div>
//       {files.length > 0 && (
//         <div className="mb-4 max-h-32 overflow-auto mt-2">
//           {files.map((file, index) => (
//             <div
//               key={index}
//               className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md mb-2"
//             >
//               <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
//                 {file.name}
//               </span>
//               <button onClick={() => removeFile(index)}>
//                 <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//       <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
//         Job Description
//       </Label>
//       <Input
//         type="text"
//         placeholder="Enter job description"
//         value={jobDescription}
//         onChange={(e) => setJobDescription(e.target.value)}
//         className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
//       />
//       <Button
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
//         onClick={handleUpload}
//       >
//         Upload
//       </Button>
//     </div>
//   );
// };

// const MainPage = () => {
//   const [response, setResponse] = useState<Response | null>(null);

//   // 🔹 Load stored data when component mounts
//   useEffect(() => {
//     const storedData = sessionStorage.getItem("uploadedData");
//     if (storedData) {
//       setResponse({ success: true, results: JSON.parse(storedData) });
//     }
//   }, []);

//   return (
//     <div className="flex">
//       <SidebarUploader setResponse={setResponse} />
//       <div className="ml-64 p-6 w-full">
//         <h1 className="text-2xl font-bold mb-4">Uploaded Data</h1>
//         {response ? (
//           <TableCom data={response.results} />
//         ) : (
//           <p>No data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MainPage;

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, Trash2 } from "lucide-react";
import TableCom from "../components/resumeComp/tableComp";

// Define Data Interface
interface Data {
  fileName: string;
  matchScore: string;
}

// Define Response Interface
interface Response {
  success: boolean;
  results: Data[];
}

const SidebarUploader = ({
  setResponse,
}: {
  setResponse: (res: Response | null) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState<string>("");

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  // Upload Function
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
      setResponse(res.data);

      // 🔹 Store uploaded data in sessionStorage
      sessionStorage.setItem("uploadedData", JSON.stringify(res.data.results));
    } catch (error) {
      console.error("Error uploading files", error);
      alert("There was an error uploading the files. Please try again.");
    }
  };

  // Remove Selected File
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-800 h-screen p-6 shadow-lg fixed left-0 top-0 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Resume Uploader</h2>

      {/* Upload Files */}
      <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
        Upload Resumes
      </Label>
      <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
        <UploadCloud className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
          {files.length > 0
            ? `${files.length} files selected`
            : "Click to upload"}
        </span>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Show Selected Files */}
      {files.length > 0 && (
        <div className="mb-4 max-h-32 overflow-auto mt-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md mb-2"
            >
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {file.name}
              </span>
              <button onClick={() => removeFile(index)}>
                <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Job Description Input */}
      <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
        Job Description
      </Label>
      <Input
        type="text"
        placeholder="Enter job description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
      />

      {/* Upload Button */}
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        onClick={handleUpload}
      >
        Upload
      </Button>
    </div>
  );
};

// ✅ Main Page - Fetch Data from sessionStorage and Pass to TableCom
const MainPage = () => {
  const [response, setResponse] = useState<Response | null>(null);

  // ✅ Load stored data when the component mounts
  useEffect(() => {
    const storedData = sessionStorage.getItem("uploadedData");
    if (storedData) {
      setResponse({ success: true, results: JSON.parse(storedData) });
    }
  }, []);

  return (
    <div className="flex bg-[#fafbf8] w-full h-full">
      <SidebarUploader setResponse={setResponse} />
      <div className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Uploaded Data</h1>

        {/* ✅ Pass Data to TableCom */}
        {response && response.results.length > 0 ? (
          <TableCom data={response.results} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
