"use client";

import { Check, Copy, Mail, Phone, X, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { FaLinkedin, FaGlobe, FaGithub, FaTwitter } from "react-icons/fa";

interface Person {
  fileName: string;
  data: {
    Details: {
      Name: string;
      Email: string;
      PortfolioLinks: string;
      Links: { platform: string; url: string }[];
      WorkExpirence: [
        {
          position: string;
          company: string;
          duration: string;
          description: string;
        }
      ];
      Expirence: string;
      Relevance: string;
      MatchScore?: string;
      Skills: string;
      Phone: string;
    };
  };
}

interface PDF {
  name: string;
  data: string;
}
const PersonDetails = ({
  person,
  isOpen,
  onClose,
}: {
  person: Person | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!person) return null;
  const [copied, setCopied] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // ✅ Copy function with feedback
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  useEffect(() => {
    if (person?.fileName) {
      const storedPdfs = sessionStorage.getItem("pdfFiles");
      if (storedPdfs) {
        const pdfFiles = JSON.parse(storedPdfs);
        const matchedPdf = pdfFiles.find(
          (pdf: PDF) => pdf.name === person.fileName
        );
        if (matchedPdf) {
          setPdfUrl(matchedPdf.base64);
        }
      }
    }
  }, [person]);

  // ✅ Function to determine social icons
  const getSocialIcon = (link: string) => {
    if (link.includes("github.com")) return <FaGithub className="w-5 h-5" />;
    if (link.includes("linkedin.com"))
      return <FaLinkedin className="w-5 h-5" />;
    if (link.includes("twitter.com")) return <FaTwitter className="w-5 h-5" />;
    return <FaGlobe className="w-5 h-5" />;
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-black bg-opacity-50  transition-opacity z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-[1000px] overflow-scroll bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b">
          <div>
            <h1 className="text-2xl font-bold">{person.data.Details.Name}</h1>
            <p className="text-gray-600">{person.data.Details.Expirence}</p>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        {/* Contact & Links */}
        <div className="flex justify-between p-6">
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex items-center gap-2">
              <Mail className="text-gray-500" />
              <a
                href={`mailto:${person.data.Details.Email}`}
                className="text-blue-500 hover:underline"
              >
                {person.data.Details.Email}
              </a>
              <button
                onClick={() => handleCopy(person.data.Details.Email)}
                className="relative"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500 transition-transform scale-105" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-500 hover:text-gray-700 transition" />
                )}
              </button>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2">
              <Phone className="text-gray-500" />
              <p className="text-gray-800">{person.data.Details.Phone}</p>
            </div>

            {/* Portfolio Link */}
            {person.data.Details.PortfolioLinks && (
              <div className="flex items-center gap-2">
                <FaGlobe className="text-gray-500" />
                <a
                  href={
                    person.data.Details.PortfolioLinks.startsWith("http")
                      ? person.data.Details.PortfolioLinks
                      : `https://${person.data.Details.PortfolioLinks}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {person.data.Details.PortfolioLinks}
                </a>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="flex gap-4 border-l-2 p-2 border-gray-300">
            {person.data.Details.Links.map((link, i) => (
              <a
                key={i}
                href={
                  link.url.startsWith("http") ? link.url : `https://${link.url}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                {getSocialIcon(link.url)}
              </a>
            ))}
          </div>
        </div>

        {/* Summary */}

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p className="text-gray-700">
            Skilled professional with expertise in {person.data.Details.Skills}.
          </p>
        </div>

        {/* Additional Details */}
        <div className="p-6 flex justify-between">
          {/* Relevance */}
          <div className="border p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Relevance</p>
            <p className="text-lg font-semibold">
              {person.data.Details.Relevance}
            </p>
          </div>

          {/* Match Score */}
          <div className="border p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Match Score</p>
            <div className="flex items-center gap-1">
              <Star className="text-yellow-500" />
              <p className="text-lg font-semibold">
                {person.data.Details.MatchScore || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
          <div className="space-y-4">
            {/* Example Experience Block */}

            {person.data.Details.WorkExpirence.map((work, i) => (
              <div className="border rounded-lg p-4" key={i}>
                <h3 className="font-semibold">{work.position}</h3>
                <p className="text-sm text-gray-500">
                  {work.company}· {work.duration}
                </p>
                <p className="text-gray-600 text-sm mt-1">{work.description}</p>
              </div>
            ))}
          </div>

          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">Resume PDF</h2>
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-[500px] border rounded-lg"
                title="Resume Preview"
              ></iframe>
            ) : (
              <p className="text-gray-500">No matching PDF found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonDetails;
