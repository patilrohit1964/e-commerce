"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "../../../../../components/ui/chart"
import { useEffect, useState } from "react"
import { useFetch } from "../../../../../hooks/useFetch"

export const description = "A bar chart"

const chartData = [
    { month: "January", amount: 186 },
    { month: "February", amount: 305 },
    { month: "March", amount: 237 },
    { month: "April", amount: 73 },
    { month: "May", amount: 209 },
    { month: "June", amount: 214 },
    { month: "July", amount: 214 },
    { month: "August", amount: 214 },
    { month: "September", amount: 214 },
    { month: "Octomber", amount: 214 },
    { month: "November", amount: 214 },
    { month: "December", amount: 214 },
]
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octomber",
    "November",
    "December",
]
const chartConfig = {
    amount: {
        label: "amount",
        color: "var(--chart-1)",
    },
}

export function OrderOverview() {
    const [chartData, setChartData] = useState([])

    const { data: monthlySales, loading } = useFetch(`/api/dashboard/admin/monthly-sales`)
    useEffect(() => {
        if (monthlySales && monthlySales?.success) {
            const getChartData = months.map((month, idx) => {
                const monthData = monthlySales.data.find(item => item?._id.month === idx + 1)
                return {
                    month: month,
                    amount: monthData ? monthData?.totalSales : 0
                }
            })
            setChartData(getChartData)
        }
    }, [monthlySales])
    return (
        <div>
            <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                        cursor={true}
                        content={<ChartTooltipContent />}
                    />
                    <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
