import { toast } from 'react-toastify';

function Card({ product }) {
    const showToast = (productName) => {
        toast.success(`${productName} added successfully`);
    };

    return (
        <div
            key={product.id}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10">
            <div className="relative h-40 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <div className="p-4 transition-colors duration-300 group-hover:bg-white/[0.03]">
                <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-cyan-300">
                    {product.name}
                </h3>
                <p className="mt-2 text-sm text-slate-300 transition-colors duration-300 group-hover:text-slate-200">
                    {product.description}
                </p>

                <button
                    onClick={() => showToast(product.name)}
                    className="mt-4 w-full rounded-xl bg-cyan-400 py-2 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-cyan-300 group-hover:shadow-lg group-hover:shadow-cyan-400/30">
                    {product.buttonText}
                </button>
            </div>
        </div>
    );
}

export default Card;
