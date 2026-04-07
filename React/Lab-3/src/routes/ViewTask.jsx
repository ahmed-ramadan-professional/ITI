import React, { useEffect } from 'react';
import {
    ArrowLeft,
    CalendarCheck2,
    CalendarDays,
    CheckCircle2,
    Circle,
    FileText,
    Pencil,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ViewTask({ tasks }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const task = tasks.at(parseInt(id));

    useEffect(() => {
        if (!task) {
            navigate('/');
        }
    }, [task, navigate]);

    if (!task) {
        return null;
    }

    return (
        <div
            className="
                min-h-screen
                px-6 py-10
                text-white
                bg-slate-950
            ">
            <div
                className="
                    flex flex-col
                    max-w-4xl
                    mx-auto
                    gap-6
                ">
                <button
                    onClick={() => navigate('/')}
                    className="
                        flex
                        w-fit
                        px-4 py-2
                        text-sm text-slate-300
                        bg-white/[0.03]
                        rounded-xl border border-white/10
                        transition-all
                        items-center gap-2 backdrop-blur-md duration-300 hover:border-cyan-400/40 hover:bg-white/[0.05] hover:text-white
                    ">
                    <ArrowLeft size={16} />
                    Back to Tasks
                </button>

                <div
                    className="
                        overflow-hidden
                        bg-white/[0.03]
                        rounded-2xl border border-white/10
                        shadow-lg shadow-black/20 transition-all
                        backdrop-blur-md duration-300 hover:border-cyan-400/30 hover:shadow-cyan-500/10
                    ">
                    <div
                        className="
                            p-6
                            border-b border-white/10
                        ">
                        <div
                            className="
                                flex flex-col
                                gap-4
                                md:flex-row md:items-start md:justify-between
                            ">
                            <div>
                                <div
                                    className="
                                        flex
                                        mb-3
                                        items-center gap-3
                                    ">
                                    <div
                                        className="
                                            flex
                                            h-12 w-12
                                            text-cyan-400
                                            bg-cyan-400/10
                                            rounded-2xl
                                            items-center justify-center
                                        ">
                                        <FileText size={22} />
                                    </div>

                                    <span
                                        className={`
                                            px-3 py-1
                                            text-xs font-medium
                                            rounded-full border
                                            ${
                                                task.completed
                                                    ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                                                    : 'border-amber-400/30 bg-amber-400/10 text-amber-300'
                                            }
                                        `}>
                                        {task.completed
                                            ? 'Completed'
                                            : 'In Progress'}
                                    </span>
                                </div>

                                <h1
                                    className="
                                        text-3xl font-bold
                                        md:text-4xl
                                    ">
                                    {task.name}
                                </h1>
                            </div>

                            {/* <button
                                className="
                                    flex
                                    px-4 py-2
                                    text-sm font-semibold text-slate-900
                                    bg-cyan-400
                                    rounded-xl
                                    transition-all
                                    items-center justify-center gap-2 duration-200 hover:scale-[1.01] hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/30 active:scale-[0.98]
                                ">
                                <Pencil size={16} />
                                Edit Task
                            </button> */}
                        </div>
                    </div>

                    <div
                        className="
                            grid
                            p-6
                            gap-4
                            md:grid-cols-3
                        ">
                        <InfoCard
                            icon={
                                task.completed ? (
                                    <CheckCircle2 size={18} />
                                ) : (
                                    <Circle size={18} />
                                )
                            }
                            label="Status"
                            value={task.completed ? 'Completed' : 'Pending'}
                        />
                        <InfoCard
                            icon={<CalendarDays size={18} />}
                            label="Created At"
                            value={task.createdAt}
                        />
                        <InfoCard
                            icon={<CalendarCheck2 size={18} />}
                            label="Completed At"
                            value={task.completedAt || 'Not completed yet'}
                        />
                    </div>
                </div>

                <div
                    className="
                        overflow-hidden
                        bg-white/[0.03]
                        rounded-2xl border border-white/10
                        shadow-lg shadow-black/20 transition-all
                        backdrop-blur-md duration-300 hover:-translate-y-1 hover:scale-[1.005] hover:border-cyan-400/40 hover:shadow-cyan-500/10
                    ">
                    <div
                        className="
                            p-5
                            border-b border-white/10
                        ">
                        <h2
                            className="
                                text-xl font-semibold
                            ">
                            Task Details
                        </h2>
                        <p
                            className="
                                mt-1
                                text-sm text-slate-400
                            ">
                            Full overview for this selected task.
                        </p>
                    </div>

                    <div
                        className="
                            p-5
                        ">
                        <div
                            className="
                                p-5
                                bg-white/[0.03]
                                rounded-2xl border border-white/10
                                transition-all
                                duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]
                            ">
                            <p
                                className="
                                    text-sm leading-7 text-slate-300
                                ">
                                {task.description || 'No description provided'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoCard({ icon, label, value }) {
    return (
        <div
            className="
                p-4
                bg-white/[0.03]
                rounded-2xl border border-white/10
                shadow-lg shadow-black/20 transition-all
                duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan-400/40 hover:shadow-cyan-500/10
            ">
            <div
                className="
                    flex
                    h-10 w-10
                    mb-3
                    text-cyan-400
                    bg-cyan-400/10
                    rounded-xl
                    items-center justify-center
                ">
                {icon}
            </div>
            <p
                className="
                    text-xs text-slate-400
                ">
                {label}
            </p>
            <p
                className="
                    mt-1
                    text-sm font-medium text-white
                ">
                {value}
            </p>
        </div>
    );
}
