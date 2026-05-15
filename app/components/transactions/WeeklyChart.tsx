"use client"

import { useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

type WeekDay = {
    date: string
    count: number
    total: number
}

const DAY_LABELS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"]

export default function WeeklyChart({ data }: { data: WeekDay[] }) {
    const chartData = useMemo(() =>
        data.map((d) => {
            const [year, month, day] = d.date.split("-").map(Number)
            const label = DAY_LABELS[new Date(year, month - 1, day).getDay()]
            return { day: label, count: d.count }
        }),
        [data]
    )

    return (
        <div>
            <ResponsiveContainer width="100%" height={140}>
                <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0a0a0a" radius={[2, 2, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
