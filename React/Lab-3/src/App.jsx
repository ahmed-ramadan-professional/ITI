import { useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './routes/Home';
import Profile from './routes/Profile';
import ViewTask from './routes/ViewTask';
import Login from './routes/Login';
import Signup from './routes/Signup';
import NotFound from './routes/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';

function getTasksForUser(user) {
    if (!user) return [];

    const key = `tasks_${user.email}`;
    const savedTasks = localStorage.getItem(key);
    return savedTasks ? JSON.parse(savedTasks) : [];
}

export default function App() {
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [tasks, setTasks] = useState(() =>
        getTasksForUser(
            JSON.parse(localStorage.getItem('currentUser') || 'null'),
        ),
    );

    const tasksStorageKey = useMemo(() => {
        return currentUser ? `tasks_${currentUser.email}` : null;
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    useEffect(() => {
        setTasks(getTasksForUser(currentUser));
    }, [currentUser]);

    useEffect(() => {
        if (!tasksStorageKey) return;
        localStorage.setItem(tasksStorageKey, JSON.stringify(tasks));
    }, [tasks, tasksStorageKey]);

    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <Routes>
                <Route
                    path="/login"
                    element={
                        <GuestRoute currentUser={currentUser}>
                            <Login setCurrentUser={setCurrentUser} />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <GuestRoute currentUser={currentUser}>
                            <Signup setCurrentUser={setCurrentUser} />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute currentUser={currentUser}>
                            <Home tasks={tasks} setTasks={setTasks} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute currentUser={currentUser}>
                            <Profile currentUser={currentUser} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/task/:id"
                    element={
                        <ProtectedRoute currentUser={currentUser}>
                            <ViewTask tasks={tasks} />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}
