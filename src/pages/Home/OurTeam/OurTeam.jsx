import React from "react";
import Profil1 from "../../../assets/home/ourteam/profil-1.jpg";
import Profil2 from "../../../assets/home/ourteam/profil-2.jpeg";


const OurTeam = () => {
  const TeamMember = ({ name, position, photo, collage }) => {
    return (
      <div className="team-member">
        <div className="member-info">
          <img src={photo} alt={name} className="profile-photo" />
          <h2 className="member-name">{name}</h2>
          <p className="member-position">{position}</p>
          <p className="member-collage">{collage}</p>
        </div>
      </div>
    );
  };

  const teamData = [
    {
      name: "Wiwin Windiana, S.Pd, M.A",
      position: "Founder",
      collage: "PhD candidate",
      photo: Profil1,
    },
    {
      name: "Muhammad Iqbal Nugraha",
      position: "Co-Founder",
      collage: "S.Kom candidate",
      photo: Profil2,
    },
  ];

  return (
    <div className="md:w-[80%] mx-auto my-32">
      <h1 className="text-5xl font-bold text-center dark:text-white mb-8">
        <span className="text-secondary">Our</span> Team
      </h1>
      <div className="w-[30%] mx-auto my-5 border-b-2 border-secondary"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {teamData.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            position={member.position}
            collage={member.collage}
            photo={member.photo}
          />
        ))}
      </div>
      <style jsx>{`
        .team-member {
          background-color: #f5f5f5;
          padding: 30px;
          border-radius: 1px;
          transition: transform 0.3s ease-in-out;
        }

        .team-member:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .profile-photo {
          width: 100%;
          margin-bottom: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .member-name {
          font-weight: bold;
          text-align: center;
          margin-bottom: 6px;
          font-size: 0.8em;
        }

        .member-position,
        .member-collage {
          text-align: center;
          font-size: 0.6em;
        }
      `}</style>
    </div>
  );
};

export default OurTeam;
