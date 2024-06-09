// import React, { useEffect, useState } from "react";
// import useUser from "../../../../hooks/useUser";
// import useAxiosFetch from "../../../../hooks/useAxiosFetch";
// import { FiUser, FiMail, FiBriefcase, FiSend } from "react-icons/fi";

// const AsTutor = () => {
//   const { currentUser } = useUser();
//   const [submittedData, setSubmittedData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const axiosFetch = useAxiosFetch();

//   const onSubmit = () => {

//   }

//   useEffect(() => {
//     axiosFetch
//       .get(`/applied-tutors/${currentUser?.email}`)
//       .then((res) => {
//         console.log(data);
//         setSubmittedData(res.data);
//         setLoading(false);
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   return (
//     <div>
//       <div>
//         {!submittedData?.name && (
//           <div className="md:w-1/2">
//             <form onSubmit={onSubmit}>
//               <div className="flex w-full">
//                 <div
                 
//                   className="mb-4 w-full"
//                 >
//                   <label className="text-gray-700" htmlFor="name">
//                     Nama
//                   </label>

//                   <div className="flex items-center mt-1">
//                     <FiUser className="text-gray-500" />
//                     <input
//                       defaultValue={currentUser?.name}
//                       disabled
//                       readOnly
//                       className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
//                       type="text"
//                       id="name"
//                       name="name"
//                     />
//                   </div>
//                 </div>

//                 <div
                  
//                   className="mb-4 w-full"
//                 >
//                   <label className="text-gray-700" htmlFor="experience">
//                     Pengalaman
//                   </label>

//                   <div className="flex items-center mt-1">
//                     <FiBriefcase className="text-gray-500" />
//                     <textarea
//                       placeholder="Ceritakan pengalaman anda..."
//                       className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
//                       id="experience"
//                       name="experience"
//                     ></textarea>
//                   </div>
//                 </div>

//                 <div className="text-center flex justify-center">
//                   <button
//                     variants={buttonVariants}
//                     initial="hidden"
//                     animate="visible"
//                     transition={{ duration: 0.5, delay: 0.4 }}
//                     whileHover={{ scale: 1.05 }}
//                     whileTop={{ scale: 0.95 }}
//                     type="submit"
//                     className="flex items-center px-4 py-2 bg-secondary text-white rounded-md focus:outline-none"
//                   >
//                     <FiSend className="mr-2" />
//                     Kirim
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AsTutor;

import React, { useEffect, useState } from "react";
import useUser from "../../../../hooks/useUser";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import { FiUser, FiMail, FiBriefcase, FiSend } from "react-icons/fi";

const AsTutor = () => {
  const { currentUser } = useUser();
  const [submittedData, setSubmittedData] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();

  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    console.log(name)
    const email = e.target.email.value;
    console.log(email)
    const experience = e.target.experience.value;
    console.log(experience)
    const data = {
      name, email, experience
    }

    axiosFetch.post(`/ass-tutor`, data).then(res => {
      console.log(res.data);
      alert("Berhasil daftar")
    })

  };

  useEffect(() => {
    if (currentUser?.email) {
      axiosFetch
        .get(`/applied-tutors/${currentUser.email}`)
        .then((res) => {
          console.log("Fetched applied tutor data:", res.data);
          setSubmittedData(res.data);
          setLoading(false);
        })
        .catch((err) => console.error("Error fetching applied tutor data:", err));
    }
  }, [currentUser, axiosFetch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {!submittedData?.name ? (
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="name">
                Nama
              </label>
              <div className="flex items-center mt-1">
                <FiUser className="text-gray-500" />
                <input
                  defaultValue={currentUser?.name}
                  disabled
                  readOnly
                  className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <div className="flex items-center mt-1">
                <FiMail className="text-gray-500" />
                <input
                  defaultValue={currentUser?.email}
                  disabled
                  readOnly
                  className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="experience">
                Pengalaman
              </label>
              <div className="flex items-center mt-1">
                <FiBriefcase className="text-gray-500" />
                <textarea
                  placeholder="Ceritakan pengalaman anda..."
                  className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
                  id="experience"
                  name="experience"
                ></textarea>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-secondary text-white rounded-md focus:outline-none"
              >
                <FiSend className="mr-2" />
                Kirim
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h2 className="text-xl font-bold">Data yang Dikirim</h2>
            <p>Nama: {submittedData.name}</p>
            <p>Email: {submittedData.email}</p>
            <p>Pengalaman: {submittedData.experience}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AsTutor;
