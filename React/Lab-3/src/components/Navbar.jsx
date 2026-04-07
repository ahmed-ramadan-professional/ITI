import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ currentUser, setCurrentUser }) {
    const navigate = useNavigate();
    const location = useLocation();

    const authNavItems = currentUser
        ? [
              { name: 'Home', path: '/' },
              { name: 'Profile', path: '/profile' },
          ]
        : [
              { name: 'Login', path: '/login' },
              { name: 'Signup', path: '/signup' },
          ];

    const handleLogout = () => {
        setCurrentUser(null);
        navigate('/login');
    };

    return (
        <nav
            className="
                z-50
                bg-white/[0.03]
                border-b border-white/10
                shadow-lg shadow-black/20
                backdrop-blur-md
            ">
            <div
                className="
                    flex
                    max-w-6xl
                    mx-auto
                    px-6 py-4
                    items-center justify-between
                ">
                <h1
                    onClick={() => navigate(currentUser ? '/' : '/login')}
                    className="
                        text-lg font-bold text-white tracking-wide
                        cursor-pointer
                    ">
                    ToDo App
                </h1>

                <div className="flex items-center gap-2">
                    {authNavItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`
                                    px-4 py-2
                                    text-sm
                                    rounded-xl border
                                    transition-all duration-300
                                    ${
                                        isActive
                                            ? 'bg-cyan-400 text-slate-900 border-cyan-400 shadow-lg shadow-cyan-400/20'
                                            : 'text-slate-300 border-white/10 hover:border-cyan-400/40 hover:text-white hover:bg-white/[0.05]'
                                    }
                                `}>
                                {item.name}
                            </button>
                        );
                    })}

                    {currentUser && (
                        <button
                            onClick={handleLogout}
                            className="
                                px-4 py-2
                                text-sm
                                rounded-xl border border-red-400/20
                                text-red-300
                                transition-all duration-300
                                hover:bg-red-500/10 hover:border-red-400/40
                            ">
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
