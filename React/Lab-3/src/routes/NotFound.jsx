import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-cyan-400">404</h1>

                <p className="mt-4 text-lg text-slate-300">Page not found</p>

                <p className="mt-2 text-sm text-slate-500">
                    The page you are looking for doesn’t exist.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="
                        mt-6 px-6 py-3
                        text-sm font-semibold text-slate-900
                        bg-cyan-400 rounded-xl
                        transition-all duration-200
                        hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/30
                    ">
                    Go Home
                </button>
            </div>
        </div>
    );
}
