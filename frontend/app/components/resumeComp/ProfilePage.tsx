"use client";

import { useRouter, useSearchParams } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "Unknown";
  const email = searchParams.get("email") || "N/A";
  const experience = searchParams.get("experience") || "N/A";
  const skills = searchParams.get("skills") || "N/A";
  const resume = searchParams.get("resume") || "";
  const prevParams = searchParams.get("prevParams") || "";

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Experience:</strong> {experience}
      </p>
      <p>
        <strong>Skills:</strong> {skills}
      </p>

      {resume && (
        <div className="mt-4">
          <a href={resume} target="_blank" className="text-blue-500 underline">
            View Resume (PDF)
          </a>
        </div>
      )}

      <button
        onClick={() => router.push(`/`)}
        className="mt-6 bg-gray-700 text-white px-4 py-2 rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default ProfilePage;
