'use client';

import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#6956E5', '#ffa500'];

type Props = {
    data: { done: number; pending: number };
};

export default function TaskStatusChart({ data }: Props) {
    const theme = useSelector((state: RootState) => state.ui.theme);
    const isDark = theme === 'dark';

    const pieData = [
        { name: 'Done', value: data.done },
        { name: 'Pending', value: data.pending },
    ];

    const barData = [
        { name: 'Tasks', Done: data.done, Pending: data.pending },
    ];

    return (
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-8 w-full h-auto">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                className={`w-full h-72 sm:h-64 max-sm:h-[15rem] ${isDark ? "bg-zinc-700" : "bg-white"} rounded-lg shadow-lg p-4 sm:p-3 max-sm:p-2`}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={70}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                        >
                            {pieData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '0.75rem' }} />
                    </PieChart>
                </ResponsiveContainer>
            </motion.div>

            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                className={`w-full h-72 sm:h-64 max-sm:h-[15rem] ${isDark ? "bg-zinc-700" : "bg-white"} rounded-lg shadow-lg p-4 sm:p-3 max-sm:p-2`}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} barCategoryGap="40%">
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '0.75rem' }} />
                        <Bar dataKey="Done" fill="#7C3AED" barSize={20} radius={[8, 8, 0, 0]} />
                        <Bar dataKey="Pending" fill="#ffa500" barSize={20} radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </div>

    );
}
