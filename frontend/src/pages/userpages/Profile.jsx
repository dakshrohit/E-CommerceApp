import React,{useEffect,useState} from "react";
import toast from "react-hot-toast";


const Profile = () => {
  const [user,setUser]=useState(null);
  const[loading,setLoading]=useState(true);
  useEffect(()=>{
    const fetchProfile=async()=>{
      try{
        const res=await fetch("http://localhost:4000/users/profile",{
          credentials:"include" // to ensure cookies are sent with the request for authentication

        });
        const data=await res.json();
        if(res.ok){
          setUser(data.user);
        } else{
          toast.error(`Error fetching profile:${data.message} `)
        }

      }catch(error){
        toast.error(`Error fetching profile:${error.message || "Something went wrong"}`); 
        //  A || B returns the first truthy value, or the last one if none are truthy.
        //if the first value is truthy, the second one is never even evaluated.

        

      } finally{
        setLoading(false); 
      }
    }
    fetchProfile();
  },[]);
  
  return (
    <div className="max-w-xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {loading ? (
        <p>Loading...</p>
      ) : !user ? (
        <p className="text-gray-400">Failed to load user profile.</p>
      ) : (
        <div className="bg-[#1A1A1A] p-6 rounded shadow space-y-4">
          <p>
            <span className="font-semibold text-gray-400">Name:</span>{" "}
            {user.fullName || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Email:</span>{" "}
            {user.email}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Role:</span>{" "}
            {user.role}
          </p>
        </div>
      )}
    </div>
  );
}

export default Profile
