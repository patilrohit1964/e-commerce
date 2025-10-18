"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../../../components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "../../../../../components/ui/chart"

export const description = "A donut chart"

const chartData = [
    { status: "pending", visitors: 275, fill: "var(--color-pending)" },
    { status: "processing", visitors: 200, fill: "var(--color-processing)" },
    { status: "shipped", visitors: 187, fill: "var(--color-shipped)" },
    { status: "delivered", visitors: 173, fill: "var(--color-delivered)" },
    { status: "cancelled", visitors: 90, fill: "var(--color-cancelled)" },
    { status: "unverified", visitors: 90, fill: "var(--color-unverified)" },
]

const chartConfig = {
    pending: {
        label: "Pending",
        color: "var(--chart-1)",
    },
    processing: {
        label: "Processing",
        color: "var(--chart-2)",
    },
    shipped: {
        label: "Shipped",
        color: "var(--chart-3)",
    },
    delivered: {
        label: "Delivered",
        color: "var(--chart-4)",
    },
    cancelled: {
        label: "Cancelled",
        color: "var(--chart-5)",
    },
    unverified: {
        label: "Unverified",
        color: "#00C3E4",
    },
}

export function OrderStatus() {
    return (
        <div>
             <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="status"
                            innerRadius={60}
                        />
                    </PieChart>
                </ChartContainer>
        </div>
    )
}
