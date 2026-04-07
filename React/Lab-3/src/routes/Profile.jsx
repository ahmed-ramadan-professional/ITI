import { Mail, User, AtSign, MapPin, Briefcase } from 'lucide-react';

export default function Profile({ currentUser }) {
    const profile = {
        name: currentUser?.name || 'Guest User',
        username: currentUser?.email
            ? `@${currentUser.email.split('@')[0]}`
            : '@guest',
        email: currentUser?.email || 'guest@example.com',
        role: 'Full Stack Developer',
        location: 'Egypt',
        bio: 'I build clean, modern interfaces with a focus on smooth interactions, strong visual hierarchy, and polished user experience.',
        stats: [
            { label: 'Projects', value: '12' },
            { label: 'Tasks Done', value: '148' },
            { label: 'Teams', value: '4' },
        ],
    };

    return (
        <div className="min-h-screen px-6 py-10 text-white bg-slate-950">
            <div className="flex flex-col max-w-6xl mx-auto gap-6">
                <div className="overflow-hidden bg-white/[0.03] rounded-2xl border border-white/10 shadow-lg shadow-black/20 backdrop-blur-md">
                    <div className="h-44 bg-gradient-to-r from-cyan-500/20 via-slate-900 to-cyan-400/10 border-b border-white/10 relative">
                        <div className="bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_30%)] absolute inset-0" />
                    </div>

                    <div className="px-6 pb-6 relative">
                        <div className="flex flex-col -mt-16 gap-6 md:flex-row md:items-end md:justify-between">
                            <div className="flex items-end gap-4">
                                <div className="flex h-28 w-28 text-3xl font-bold text-cyan-300 bg-white/[0.05] rounded-2xl border border-cyan-400/30 shadow-lg shadow-cyan-500/10 items-center justify-center backdrop-blur-md">
                                    {profile.name
                                        .split(' ')
                                        .map((word) => word[0])
                                        .slice(0, 2)
                                        .join('')}
                                </div>

                                <div className="pb-2">
                                    <h1 className="text-3xl font-bold md:text-4xl">
                                        {profile.name}
                                    </h1>
                                    <p className="mt-1 text-sm text-cyan-400">
                                        {profile.username}
                                    </p>
                                    <p className="max-w-2xl mt-2 text-sm text-slate-300">
                                        {profile.bio}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                    <div className="overflow-hidden bg-white/[0.03] rounded-2xl border border-white/10 shadow-lg shadow-black/20 transition-all backdrop-blur-md duration-300 hover:-translate-y-1 hover:scale-[1.005] hover:border-cyan-400/40 hover:shadow-cyan-500/10">
                        <div className="p-5 border-b border-white/10">
                            <h2 className="text-xl font-semibold">
                                Profile Details
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Your account information and public details.
                            </p>
                        </div>

                        <div className="grid p-5 gap-4">
                            <InfoRow
                                icon={<User size={18} />}
                                label="Full Name"
                                value={profile.name}
                            />
                            <InfoRow
                                icon={<AtSign size={18} />}
                                label="Username"
                                value={profile.username}
                            />
                            <InfoRow
                                icon={<Mail size={18} />}
                                label="Email"
                                value={profile.email}
                            />
                            <InfoRow
                                icon={<Briefcase size={18} />}
                                label="Role"
                                value={profile.role}
                            />
                            <InfoRow
                                icon={<MapPin size={18} />}
                                label="Location"
                                value={profile.location}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-3 gap-4">
                            {profile.stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="p-5 text-center bg-white/[0.03] rounded-2xl border border-white/10 shadow-lg shadow-black/20 transition-all backdrop-blur-md duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan-400/40 hover:shadow-cyan-500/10">
                                    <p className="text-2xl font-bold text-cyan-400">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-400">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="overflow-hidden bg-white/[0.03] rounded-2xl border border-white/10 shadow-lg shadow-black/20 transition-all backdrop-blur-md duration-300 hover:-translate-y-1 hover:scale-[1.005] hover:border-cyan-400/40 hover:shadow-cyan-500/10">
                            <div className="p-5 border-b border-white/10">
                                <h2 className="text-xl font-semibold">
                                    About Me
                                </h2>
                            </div>

                            <div className="p-5">
                                <p className="leading-7 text-slate-300">
                                    Passionate about building visually polished
                                    web apps with modern UI patterns,
                                    glassmorphism, and smooth interactive
                                    states.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoRow({ icon, label, value }) {
    return (
        <div className="flex px-4 py-3 bg-white/[0.03] rounded-xl border border-white/10 transition-all items-center gap-4 duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]">
            <div className="flex h-10 w-10 text-cyan-400 bg-cyan-400/10 rounded-xl items-center justify-center">
                {icon}
            </div>
            <div>
                <p className="text-xs text-slate-400">{label}</p>
                <p className="text-sm font-medium text-white">{value}</p>
            </div>
        </div>
    );
}
