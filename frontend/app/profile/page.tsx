// "use client";

// import { useSearchParams, useRouter } from "next/navigation";

// const ProfilePage = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const name = searchParams.get("name") || "Unknown";
//   const email = searchParams.get("email") || "N/A";
//   const experience = searchParams.get("experience") || "N/A";
//   const skills = searchParams.get("skills") || "N/A";
//   const prevParams = searchParams.get("prevParams") || ""; // Preserve previous filters

//   const handleGoBack = () => {
//     router.back(); // Go back without refreshing, restoring previous session data
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//       <h1 className="text-3xl font-bold mb-4">{name}</h1>
//       <p className="text-lg">
//         <strong>Email:</strong> {email}
//       </p>
//       <p className="text-lg">
//         <strong>Experience:</strong> {experience}
//       </p>
//       <p className="text-lg">
//         <strong>Skills:</strong> {skills}
//       </p>

//       <button
//         onClick={handleGoBack}
//         className="mt-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
//       >
//         Go Back
//       </button>
//     </div>
//   );
// };

// export default ProfilePage;

"use client";

import React, { useEffect, useState } from "react";

const Results = () => {
  const [uploadedData, setUploadedData] = useState<any>(null);
  const [pdfFiles, setPdfFiles] = useState<string[]>([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("uploadedData");
    const storedPdfs = sessionStorage.getItem("pdfFiles");

    if (storedData) {
      setUploadedData(JSON.parse(storedData));
    }

    if (storedPdfs) {
      setPdfFiles(JSON.parse(storedPdfs));
    }
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Uploaded Results</h2>

        {/* Display Uploaded Data */}
        {uploadedData ? (
          <pre className="p-4 bg-gray-200 rounded">
            {JSON.stringify(uploadedData, null, 2)}
          </pre>
        ) : (
          <p>No uploaded data found.</p>
        )}

        {/* Display PDF Previews */}
        <h3 className="mt-6 font-semibold">Uploaded PDFs</h3>
        {pdfFiles.length > 0 ? (
          pdfFiles.map((pdf, index) => (
            <iframe
              key={index}
              src={pdf}
              className="w-full h-[400px] my-2 border"
              title={`PDF Preview ${index + 1}`}
            ></iframe>
          ))
        ) : (
          <p>No PDFs found.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
