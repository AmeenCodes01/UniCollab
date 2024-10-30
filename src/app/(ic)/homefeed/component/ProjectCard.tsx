"use client";

import {Users} from "lucide-react";
import {useState} from "react";

export default function ProjectCard({project}) {
  const [showInterest, setShowInterest] = useState(false);

  const handleInterest = () => {
    // In real app, this would open email client with template
    window.location.href = `mailto:${project.email}?subject=Interested in: ${project.title}`;
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
      {/* Top section with basic info */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-lg">{project.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <span>{project.author}</span>
            <span>•</span>
            <span>{project.course}</span>
          </div>
        </div>

        {project.type === "learning" && (
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
            Beginner Friendly
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-700 mt-3">{project.description}</p>

      {/* Looking for section */}
      <div className="mt-3 text-sm text-gray-600">
        <strong>Looking for:</strong> {project.lookingFor}
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleInterest}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Users size={18} />
          I'm Interested!
        </button>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          Save for later
        </button>
      </div>
    </div>
  );
}
