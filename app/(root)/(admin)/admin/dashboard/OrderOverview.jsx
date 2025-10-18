"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "../../../../../components/ui/chart"

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

const chartConfig = {
    amount: {
        label: "amount",
        color: "var(--chart-1)",
    },
}

export function OrderOverview() {
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
