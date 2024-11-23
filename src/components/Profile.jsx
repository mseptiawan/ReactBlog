import React from "react";

const Profile = () => {
 
  const profileData = {
    image: "/perpusCapture.PNG", 
    name: "M Septiawan",
    npm: "2226240097",
    email: "mseptiawan017@gmail.com",
    whatsapp: "+6289630909617", 
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-48 px-4 sm:px-8 md:px-16 lg:px-2 mb-20">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-4">
          <img
            src={profileData.image}
            alt="Profile"
            className="w-full xs:h-[400px] md:h-full object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="w-full md:w-2/3 p-4 flex flex-col ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {profileData.name}
          </h2>
          <p className="text-gray-600 mb-2">{"NPM: " + profileData.npm}</p>
          <p className="text-gray-600 mb-2">{"Email: " + profileData.email}</p>
          <p className="text-gray-600">
            <a
              href={`https://wa.me/${profileData.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              {"Nomor WhatsApp: " + profileData.whatsapp}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
