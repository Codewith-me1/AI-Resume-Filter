"use client";

import React, { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Copy } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
import PersonDetails from "../personDetails";

interface Data {
  fileName: string;
  data: {
    Details: {
      Name: string;
      Email: string;
      PortfolioLinks: string;
      Links: { platform: string; url: string }[];
      Expirence: string;
      Relevance: string;
      MatchScore?: string;
      Skills: string;
      WorkExpirence: [
        {
          position: string;
          company: string;
          duration: string;
          description: string;
        }
      ];

      Phone: string;
    };
  };
}

interface TableComProps {
  data?: Data[];
}

const TableCom: React.FC<TableComProps> = ({ data }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [savedData, setSavedData] = useState<Data[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Data | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectAll, setSelectAll] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const storedData = sessionStorage.getItem("uploadedData");
    if (storedData) setSavedData(JSON.parse(storedData));
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      sessionStorage.setItem("uploadedData", JSON.stringify(data));
      setSavedData(data);
    }
  }, [data]);

  const finalData = data?.length ? data : savedData;
  const filteredData = finalData.filter(
    (item) => item.data.Details.Relevance !== "Not Relevant"
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const scoreA = parseFloat(a.data.Details.MatchScore || "0");
    const scoreB = parseFloat(b.data.Details.MatchScore || "0");
    return sortOrder === "asc" ? scoreA - scoreB : scoreB - scoreA;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNameClick = (item: Data) => {
    setSelectedPerson(item);
    setIsPanelOpen(true);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCheckboxChange = (fileName: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [fileName]: !prev[fileName],
    }));
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newSelectedItems = { ...selectedItems };
    paginatedData.forEach((item) => {
      newSelectedItems[item.fileName] = newSelectAll;
    });

    setSelectedItems(newSelectedItems);
  };

  const handleDownloadCSV = () => {
    const selectedData = finalData.filter(
      (item) => selectedItems[item.fileName]
    );
    if (selectedData.length === 0) {
      alert("No data selected for download.");
      return;
    }

    const headers = [
      "File Name",
      "Name",
      "Email",
      "Phone",
      "Experience",
      "Relevance",
      "Skills",
      "Match Score",
    ];
    const rows = selectedData.map((item) => [
      item.fileName,
      item.data.Details.Name,
      item.data.Details.Email,
      item.data.Details.Phone,
      item.data.Details.Expirence,
      item.data.Details.Relevance,
      item.data.Details.Skills,
      item.data.Details.MatchScore || "N/A",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "selected_candidates.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <div className=" shadwo-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">All Candidates</h2>
        <button
          onClick={handleDownloadCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Download
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <tr className="text-left">
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  className="h-4 w-4"
                />
              </th>
              <th className="p-4">File Name</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Experience</th>
              <th className="p-4">Relevance</th>
              <th
                className="p-4 cursor-pointer flex items-center gap-1"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                Match Score{" "}
                {sortOrder === "asc" ? <ChevronUp /> : <ChevronDown />}
              </th>
              <th className="p-4">Social Links</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={!!selectedItems[item.fileName]}
                    onChange={() => handleCheckboxChange(item.fileName)}
                    className="h-4 w-4"
                  />
                </td>
                <td className="p-4">{item.fileName}</td>
                <td
                  className="p-4 text-blue-500 cursor-pointer hover:underline"
                  onClick={() => handleNameClick(item)}
                >
                  {item.data.Details.Name}
                </td>
                <td className="p-4">{item.data.Details.Email}</td>
                <td className="p-4">{item.data.Details.Phone}</td>
                <td className="p-4">{item.data.Details.Expirence}</td>
                <td className="p-4">{item.data.Details.Relevance}</td>
                <td className="p-4">{item.data.Details.MatchScore || "N/A"}</td>
                <td className="p-4 flex gap-3">
                  {item.data.Details.Links.map((link, i) => (
                    <a
                      key={i}
                      href={
                        link.url.startsWith("http")
                          ? link.url
                          : `https://${link.url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {getSocialIcon(link.url)}
                    </a>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {[...Array(Math.ceil(sortedData.length / itemsPerPage))].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-md ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Slide-in Panel */}
      <PersonDetails
        person={selectedPerson}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
};

// Function to get the appropriate social icon
const getSocialIcon = (link: string) => {
  if (link.includes("github.com")) return <FaGithub className="w-5 h-5" />;
  if (link.includes("linkedin.com")) return <FaLinkedin className="w-5 h-5" />;
  if (link.includes("twitter.com")) return <FaTwitter className="w-5 h-5" />;
  return <FaGlobe className="w-5 h-5" />;
};

export default TableCom;
