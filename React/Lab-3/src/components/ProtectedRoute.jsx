import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ currentUser, children }) {
    const location = useLocation();

    console.log(currentUser);

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
