import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute=(({children})=>{
    const { authUser, loading } = useAuth();
    // loading: A boolean to prevent rendering too early while we’re still checking the user (usually during the initial fetch from /api/auth/me)
    if(loading){
        return (
            <div className="text-white p-4">Loading..</div>
        )
      
    }
    if(!authUser){
        return <Navigate to="/auth" replace />

        //replace: This prop ensures that the current entry in the history stack is replaced with the new one, so that when the user clicks the back button, they won't return to the protected route.
    }
    return children; // If the user is authenticated, render the children components (the protected contents)

})

export {ProtectedRoute}