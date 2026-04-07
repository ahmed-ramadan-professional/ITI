import { Navigate } from 'react-router-dom';

export default function GuestRoute({ currentUser, children }) {
    if (currentUser) {
        return <Navigate to="/" replace />;
    }

    return children;
}
