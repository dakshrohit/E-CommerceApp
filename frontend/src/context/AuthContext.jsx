import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();
 const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const base_url=import.meta.env.VITE_BASE_URL || "http://localhost:4000";
        const res = await fetch(`${base_url}/api/auth/me`, {
          method: "GET",

          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setAuthUser(data.user);
        } else {
          setAuthUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

const logout=async()=>{
  try{
    await fetch(`${base_url}/api/auth/logout`,{
      method:"POST",
      credentials:"include",
    });
    setAuthUser(null);


  }
  catch(err){
    console.error("Error logging out:", err);
  }
}
 
  return (
    <AuthContext.Provider value={{ authUser, loading, setAuthUser ,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


export { useAuth,AuthProvider };
