import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Home from './routes/Home/Home';
import ProfilePage from './routes/Profile/Profile';
import { useEffect, useState } from 'react';
import ViewTask from './routes/ViewTask/ViewTask';

function App() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <Router basename="/ITI/React/Lab-2/dist/">
            <div
                className="
                    min-h-screen
                    text-white
                    bg-slate-950
                ">
                <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="dark"
                    toastClassName="!bg-transparent !shadow-none !p-0"
                    bodyClassName="!p-0"
                />

                <Navbar />

                <Routes>
                    <Route
                        path="/"
                        element={<Home tasks={tasks} setTasks={setTasks} />}
                    />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route
                        path="/task/:id"
                        element={<ViewTask tasks={tasks} />}
                    />
                    <Route
                        path="*"
                        element={<Home tasks={tasks} setTasks={setTasks} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
