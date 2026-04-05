import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Profile', path: '/profile' },
    ];

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
                    mx-auto py-4
                    items-center justify-between
                ">
                <h1
                    onClick={() => navigate('/')}
                    className="
                        text-lg font-bold text-white tracking-wide
                        cursor-pointer
                    ">
                    ToDo App
                </h1>

                <div
                    className="
                        flex
                        items-center gap-2
                    ">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`
                                    px-4 py-2
                                    text-sm
                                    rounded-xl border
                                    transition-all
                                    duration-300
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
                </div>
            </div>
        </nav>
    );
}
