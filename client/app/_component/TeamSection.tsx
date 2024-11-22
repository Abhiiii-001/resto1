"use client";
import React, { useState } from "react";

// Type for team member data
interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Johnathan Demario",
      role: "Founder",
      description:
        "In velit auctor non auctor in. Id pellentesque facilisis at lectus sed in sit tellus mauris.",
      image: "/team1.png",
    },
    {
      name: "Bryan Machado",
      role: "Chef",
      description:
        "Duis sed dui dolor viverra porttitor semper at faucibus facilisis. Hac maecenas rhoncus.",
      image: "/team2.png",
    },
    {
      name: "Adam Joseph",
      role: "Chef",
      description:
        "Faubicus sed vulputate dui justo dui in. Egestas ipsum ut a elementum at laoreet at quam vitae.",
      image: "/team3.png",
    },
    {
      name: "Putin Desque",
      role: "Chef",
      description:
        "Molestie viverra mattis nisi vitae orci feugiat in. Aliquet quis orci turpis aliquet.",
      image: "/team4.png",
    },
    {
      name: "Sophia Laurent",
      role: "Sous Chef",
      description:
        "Aenean nunc accumsan id maecenas. Tortor tincidunt malesuada ornare at volutpat.",
      image: "/team1.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === teamMembers.length - 3 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? teamMembers.length - 3 : prevIndex - 1
    );
  };

  return (
    <div className="w-full h-screen bg-[#d6dcc0] flex flex-col">
      {/* Heading Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-6 md:py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
          Our team
        </h1>
        <p className="text-sm md:text-base text-gray-600 text-center md:text-right mt-4 md:mt-0 w-full md:w-1/2">
          In velit auctor non auctor in. Id pellentesque facilisis at lectus
          sed in sit tellus mauris.
        </p>
      </div>

      {/* Team Carousel */}
      <div className="flex items-center justify-center h-full px-6 md:px-10 relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 p-2 border rounded-full bg-white shadow-md hover:shadow-lg z-10"
        >
          ←
        </button>

        {/* Team Members */}
        <div className="flex gap-4 overflow-hidden w-[90%] max-w-[1200px]">
          {teamMembers.slice(currentIndex, currentIndex + 3).map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center w-full md:w-1/3 flex-shrink-0"
            >
              <div className="w-full h-56 md:h-80 lg:h-72 overflow-hidden rounded-md">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center" // Center the face
                />
              </div>
              <h2 className="text-lg font-bold mt-4">{member.name}</h2>
              <p className="text-sm text-gray-600">{member.role}</p>
              <p className="text-xs md:text-sm text-gray-500 mt-2">
                {member.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 p-2 border rounded-full bg-white shadow-md hover:shadow-lg z-10"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default TeamSection;
