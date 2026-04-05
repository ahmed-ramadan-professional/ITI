function Card({
    task,
    handleToggleComplete,
    handleDeleteTask,
    handleNavigate,
}) {
    return (
        <div
            className={`
                overflow-hidden
                rounded-2xl border
                shadow-lg transition-all
                group relative backdrop-blur-md duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-cyan-500/10
                ${
                    task.completed
                        ? 'border-cyan-400/30 bg-cyan-500/[0.07] ring-1 ring-cyan-400/20'
                        : 'border-white/10 bg-white/5 hover:border-cyan-400/40 hover:ring-1 hover:ring-cyan-400/20'
                }
            `}>
            <div
                className="
                    flex
                    p-5
                    relative items-start gap-4
                ">
                <button
                    onClick={() => handleToggleComplete()}
                    className="
                        mt-0.5
                        hover:cursor-pointer
                    ">
                    <span
                        className={`
                            flex
                            h-6 w-6
                            rounded-full border
                            transition-all
                            items-center justify-center duration-300
                            ${
                                task.completed
                                    ? 'scale-110 border-cyan-400 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.35)]'
                                    : 'border-white/20 bg-white/[0.05] hover:border-cyan-400/60'
                            }
                        `}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className={`
                                h-3.5 w-3.5
                                text-slate-900
                                transition-all
                                duration-300
                                ${task.completed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                            `}>
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                </button>

                <div
                    className="
                        flex flex-1 flex-col
                        min-h-[120px]
                        relative
                    ">
                    <div
                        className="
                            flex
                            justify-between gap-3
                        ">
                        <div
                            className="
                                min-w-0
                            ">
                            <h3
                                className={`
                                    text-base font-semibold
                                    transition-all
                                    truncate duration-300
                                    ${
                                        task.completed
                                            ? 'text-slate-400 line-through'
                                            : 'text-white group-hover:text-cyan-300'
                                    }
                                `}>
                                {task.name}
                            </h3>

                            <p
                                className={`
                                    mt-1
                                    text-sm
                                    transition-all
                                    duration-300
                                    ${
                                        task.completed
                                            ? 'text-slate-500'
                                            : 'text-slate-300 group-hover:text-slate-200'
                                    }
                                `}>
                                {task.description || 'No description provided'}
                            </p>
                        </div>

                        <button
                            onClick={() => handleDeleteTask()}
                            className="
                                h-9 w-9
                                text-red-300
                                bg-red-500/10
                                rounded-xl border border-red-400/20
                                opacity-0 transition-all
                                hover:cursor-pointer duration-200 hover:border-red-400/40 hover:bg-red-500/20 group-hover:opacity-100
                            ">
                            ✕
                        </button>
                    </div>

                    <div
                        className="
                            flex
                            mt-auto pt-4
                            items-end justify-between
                        ">
                        <span
                            className={`
                                px-2.5 py-1
                                text-[11px]
                                rounded-full border
                                ${
                                    task.completed
                                        ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300'
                                        : 'border-white/10 bg-white/[0.03] text-slate-500'
                                }
                            `}>
                            {task.completed ? 'Completed' : 'Task'}
                        </span>

                        <button
                            onClick={() => handleNavigate()}
                            className="
                                text-xs font-semibold text-cyan-400
                                transition-all opacity-0
                                hover:cursor-pointer duration-200 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 hover:text-cyan-300 active:scale-95
                            ">
                            View →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
