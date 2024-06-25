import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => {
        const users = res.data;
        const applicantEmails = users
          .filter((user) => user.role === "user")
          .map((user) => user.email);
        const applicantDetailsPromises = applicantEmails.map((email) => {
          return axiosSecure
            .get(`/applied-tutors/${email}`)
            .then((res) => {
              return res.data ? { ...res.data, email } : null;
            })
            .catch((err) => {
              console.error("Error fetching applicant details:", err);
              return null;
            });
        });

        Promise.all(applicantDetailsPromises).then((details) => {
          const validApplicants = details.filter((detail) => detail !== null);
          setApplicants(validApplicants);
        });
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const renderTutorCard = (tutor, isApplicant = false) => (
    <div
      key={tutor._id}
      className="mt-5 bg-white shadow-lg p-6 rounded-lg flex flex-col items-center border"
    >
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">{tutor.name}</h2>
        <p className="text-gray-600">{tutor.email}</p>
      </div>
      <div className="mt-4 w-full">
        {isApplicant && (
          <div className="flex items-center mt-2">
            <p className="text-justify">{tutor.experience}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-20 md:mt-6">
      <h1 className="text-4xl font-bold text-center mt-3">
        Kelola <span className="text-secondary">Tutor</span>
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map((tutor) => renderTutorCard(tutor))}
        {applicants.map((applicant) => renderTutorCard(applicant, true))}
      </div>
    </div>
  );
};

export default ManageTutors;
