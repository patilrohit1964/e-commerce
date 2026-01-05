'use client'
import Link from "next/link"
import { Button } from "../../../../../components/ui/button"
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card"
import CountOverview from "./CountOverview"
import QuickAdd from "./QuickAdd"
import { OrderOverview } from "./OrderOverview"
import { OrderStatus } from "./OrderStatus"
import { LatestOrder } from "./LatestOrder"
import { LatestReview } from "./LatestReview"
import { ADMIN_ORDERS_SHOW, ADMIN_REVIEW_SHOW } from "../../../../../routes/adminPaneRoute"


const AdminDashboard = () => {
  return (
    <div>
      <CountOverview />
      <QuickAdd />
      {/* charts */}
      <div className="mt-10 flex lg:flex-nowrap flex-wrap gap-10">
        <Card className={'rounded-lg lg:w-[70%] w-full p-0 block'}>
          <CardHeader className={'py-3'}>
            <div className="flex justify-between items-center">
              <span>Order Overview</span>
              <Button type="button">
                <Link href={ADMIN_ORDERS_SHOW}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <OrderOverview />
          </CardContent>
        </Card>

        {/* second card */}
        <Card className={'rounded-lg lg:w-[30%] w-full p-0'}>
          <CardHeader className={'py-3 border [.border-b]:pb-3'}>
            <div className="flex justify-between items-center">
              <span>Order Status</span>
              <Button type="button">
                <Link href={ADMIN_ORDERS_SHOW}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <OrderStatus />
          </CardContent>
        </Card>
      </div>

      {/* charts information */}
      <div className="mt-10 flex lg:flex-nowrap flex-wrap gap-10">
        <Card className={'rounded-lg lg:w-[70%] w-full p-0 block'}>
          <CardHeader className={'py-3 border [.border-b]:pb-3'}>
            <div className="flex justify-between items-center">
              <span>Latest Order</span>
              <Button type="button">
                <Link href={ADMIN_ORDERS_SHOW}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className={'pt-3 lg:h-[350px] overflow-auto'}>
            <LatestOrder />
          </CardContent>
        </Card>

        {/* second card */}
        <Card className={'rounded-lg lg:w-[30%] w-full p-0 block'}>
          <CardHeader className={'py-3 border [.border-b]:pb-3'}>
            <div className="flex justify-between items-center">
              <span>Latest Review</span>
              <Button type="button">
                <Link href={ADMIN_REVIEW_SHOW}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className={'lg:h-[350px] overflow-auto px-1'}>
            <LatestReview />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard