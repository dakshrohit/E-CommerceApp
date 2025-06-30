import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();
 const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/me", {
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
  return (
    <AuthContext.Provider value={{ authUser, loading, setAuthUser }}>
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
