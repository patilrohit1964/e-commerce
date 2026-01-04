"use client"

import { Pie, PieChart } from "recharts"

import { useEffect, useState } from "react"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "../../../../../components/ui/chart"
import { Label } from "../../../../../components/ui/label"
import { useFetch } from "../../../../../hooks/useFetch"

export const description = "A donut chart"
const chartConfig = {
    pending: {
        label: "Pending",
        color: "var(--chart-1)",
    },
    processing: {
        label: "Processing",
        color: "var(--chart-3)",
    },
    shipped: {
        label: "Shipped",
        color: "#00C3E4",
    },
    delivered: {
        label: "Delivered",
        color: "var(--chart-2)",
    },
    cancelled: {
        label: "Cancelled",
        color: "var(--chart-5)",
    },
    unverified: {
        label: "Unverified",
        color: "var(--color-orange-600)",
    },
}

// const chartData = [
//     { status: "pending", visitors: 275, fill: "var(--color-pending)" },
//     { status: "processing", visitors: 200, fill: "var(--color-processing)" },
//     { status: "shipped", visitors: 187, fill: "var(--color-shipped)" },
//     { status: "delivered", visitors: 173, fill: "var(--color-delivered)" },
//     { status: "cancelled", visitors: 90, fill: "var(--color-cancelled)" },
//     { status: "unverified", visitors: 90, fill: "var(--color-unverified)" },
// ]
export function OrderStatus() {
    const [chartData, setChartData] = useState([])
    const [statusCount, setStatusCount] = useState()
    const [totalCount, setTotalCount] = useState(0)
    const { data: orderStatus, loading } = useFetch(`/api/dashboard/admin/order-status`)
    useEffect(() => {
        if (orderStatus && orderStatus?.success) {
            const newOrderStatus = orderStatus?.data?.map((order, idx) => (
                {
                    status: order?._id,
                    count: order?.count,
                    fill: `var(--color-${order?._id})`
                }
            ))
            setChartData(newOrderStatus)
            const getTotalCount = orderStatus?.data?.reduce((acc, curr) => acc + curr.count, 0)
            setTotalCount(getTotalCount)
            const statusObj = orderStatus?.data?.reduce((acc, item) => {
                acc[item?._id] = item?.count
                return acc;
            }, {})
            setStatusCount(statusObj);
        }
    }, [orderStatus])
    return (
        <div>
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                    />
                    <Pie
                        data={chartData}
                        dataKey="count"
                        nameKey="status"
                        innerRadius={60}
                    >
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-foreground text-3xl font-bold"
                                            >
                                                {totalCount}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-muted-foreground"
                                            >
                                                Orders
                                            </tspan>
                                        </text>
                                    )
                                }
                            }}
                        />
                    </Pie>
                </PieChart>
            </ChartContainer>
            {/* count order status ui */}
            <div>
                <ul>
                    <li className="flex justify-between items-center mb-3 text-sm">
                        <span>Pending</span>
                        <span className="rounded-full px-2 text-sm bg-blue-500">{statusCount?.pending || 0}</span>
                    </li>
                    <li className="flex justify-between items-center mb-3 text-sm">
                        <span>Processing</span>
                        <span className="rounded-full px-2 text-sm bg-yellow-500">{statusCount?.processing || 0}</span>
                    </li>
                    <li className="flex justify-between items-center mb-3 text-sm">
                        <span>Shipped</span>
                        <span className="rounded-full px-2 text-sm bg-cyan-500">{statusCount?.shipped || 0}</span>
                    </li>
                    <li className="flex justify-between items-center mb-3 text-sm">
                        <span>Delivered</span>
                        <span className="rounded-full px-2 text-sm bg-green-500">{statusCount?.delivered || 0}</span>
                    </li>
                    <li className="flex justify-between items-center mb-3 text-sm">
                        <span>Cancelled</span>
                        <span className="rounded-full px-2 text-sm bg-red-500">{statusCount?.cancelled || 0}</span>
                    </li>
                    <li className="flex justify-between items-center mb-3 text-sm">
                        <span>Unverified</span>
                        <span className="rounded-full px-2 text-sm bg-orange-600">{statusCount?.unverified || 0}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
