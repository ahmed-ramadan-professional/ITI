import { useState } from 'react';
import { toast } from 'react-toastify';
import Card from '../../components/Card';
import { PartyPopper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home({ tasks, setTasks }) {
    const [filter, setFilter] = useState('all');

    const [taskToAdd, setTaskToAdd] = useState({
        name: '',
        description: '',
        completed: false,
        createdAt: null,
        completedAt: null,
    });

    const navigate = useNavigate();

    const filteredTasks =
        filter === 'completed' ? tasks.filter((t) => t.completed) : tasks;

    return (
        <div
            className="
                min-h-screen
                text-white
                bg-slate-950
            ">
            <div
                className="
                    flex flex-col
                    max-w-6xl
                    mx-auto
                    justify-center items-center
                ">
                <div
                    className="
                        mt-8 mb-6
                        text-center
                    ">
                    <h2
                        className="
                            text-3xl font-bold
                            md:text-4xl
                        ">
                        Tasks
                    </h2>
                </div>

                <div
                    className="
                        flex
                        mb-6
                        gap-2
                    ">
                    {['all', 'completed'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`
                                px-4 py-2
                                text-sm
                                rounded-xl border
                                transition-all
                                duration-300
                                ${
                                    filter === type
                                        ? 'bg-cyan-400 text-slate-900 border-cyan-400 shadow-lg shadow-cyan-400/20'
                                        : 'text-slate-300 border-white/10 hover:border-cyan-400/40 hover:text-white hover:bg-white/[0.05]'
                                }
                            `}>
                            {type === 'all' ? 'All Tasks' : 'Completed'}
                        </button>
                    ))}
                </div>

                <div
                    className="
                        grid
                        w-1/2
                        gap-4
                    ">
                    {filteredTasks.map((task, index) => (
                        <Card
                            key={index}
                            task={task}
                            handleToggleComplete={() => {
                                setTasks(
                                    tasks.map((t) =>
                                        t === task
                                            ? {
                                                  ...t,
                                                  completed: !t.completed,
                                                  completedAt: !t.completed
                                                      ? new Date().toLocaleDateString(
                                                            'en-CA',
                                                        )
                                                      : null,
                                              }
                                            : t,
                                    ),
                                );

                                if (!task.completed) {
                                    toast.info('Great job!', {
                                        icon: (
                                            <PartyPopper
                                                size={18}
                                                className="
                                                    text-cyan-400
                                                "
                                            />
                                        ),
                                    });
                                }
                            }}
                            handleDeleteTask={() =>
                                setTasks(tasks.filter((t) => t !== task))
                            }
                            handleNavigate={() =>
                                navigate(`/task/${tasks.indexOf(task)}`)
                            }
                        />
                    ))}

                    <div
                        className="
                            flex flex-col overflow-hidden
                            bg-white/5
                            rounded-2xl border border-white/10
                            shadow-lg shadow-black/20 transition-all
                            group relative backdrop-blur-md duration-300 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-cyan-400/40 hover:shadow-cyan-500/10
                        ">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                setTasks([
                                    ...tasks,
                                    {
                                        ...taskToAdd,
                                        createdAt:
                                            new Date().toLocaleDateString(
                                                'en-CA',
                                            ),
                                    },
                                ]);

                                setTaskToAdd({
                                    name: '',
                                    description: '',
                                    completed: false,
                                    createdAt: null,
                                    completedAt: null,
                                });

                                setFilter('all');
                            }}>
                            <div
                                className="
                                    flex flex-col
                                    p-5
                                    transition-colors
                                    items-center gap-3 duration-300 group-hover:bg-white/[0.04]
                                ">
                                <div
                                    className="
                                        w-full
                                        relative
                                    ">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        value={taskToAdd.name}
                                        onChange={(e) =>
                                            setTaskToAdd((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        required
                                        className="
                                            w-full
                                            px-4 pt-5 pb-2
                                            text-white
                                            bg-white/[0.03]
                                            rounded-xl border border-white/10
                                            peer outline-none focus:border-cyan-400
                                        "
                                    />
                                    <label
                                        className="
                                            text-xs text-slate-400
                                            transition-all
                                            absolute left-4 top-2 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400
                                        ">
                                        Task Name
                                    </label>
                                </div>

                                <div
                                    className="
                                        w-full
                                        relative
                                    ">
                                    <textarea
                                        placeholder=" "
                                        value={taskToAdd.description}
                                        rows={4}
                                        onChange={(e) =>
                                            setTaskToAdd((prev) => ({
                                                ...prev,
                                                description: e.target.value,
                                            }))
                                        }
                                        className="
                                            w-full
                                            px-4 pt-5 pb-2
                                            text-sm text-slate-200
                                            bg-white/[0.03]
                                            rounded-xl border border-white/10
                                            resize-none transition-all
                                            peer outline-none focus:border-cyan-400
                                        "
                                    />
                                    <label
                                        className="
                                            text-xs text-slate-400
                                            transition-all
                                            absolute left-4 top-2 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400
                                        ">
                                        Task Description
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="
                                        w-full
                                        mt-2 py-2
                                        text-sm font-semibold text-slate-900
                                        bg-cyan-400
                                        rounded-xl
                                        transition-all
                                        duration-200 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/30 active:scale-[0.98]
                                    ">
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
