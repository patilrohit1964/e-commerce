'use client'
import Link from "next/link"
import { Button } from "../../../../../components/ui/button"
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card"
import CountOverview from "./CountOverview"
import QuickAdd from "./QuickAdd"
import { OrderOverview } from "./OrderOverview"
import { OrderStatus } from "./OrderStatus"

const AdminDashboard = () => {
  return (
    <div>
      <CountOverview />
      <QuickAdd />
      <div className="mt-10 flex lg:flex-nowrap flex-wrap gap-10">
        <Card className={'rounded-lg lg:w-[70%] w-full p-0'}>
          <CardHeader className={'py-3'}>
            <div className="flex justify-between items-center">
              <span>Order Overview</span>
              <Button type="button">
                <Link href={''}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <OrderOverview />
          </CardContent>
        </Card>

        {/* second card */}
        <Card className={'rounded-lg lg:w-[30%] w-full p-0'}>
          <CardHeader className={'py-3'}>
            <div className="flex justify-between items-center">
              <span>Order Status</span>
              <Button type="button">
                <Link href={''}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <OrderStatus />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard