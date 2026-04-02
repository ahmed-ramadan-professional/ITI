export default function Home({ children }) {
 
    return (
        <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold md:text-4xl">Products</h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {children}
                </div>
            </div>
        </div>
    );
}
