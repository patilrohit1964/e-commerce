import BreadCrumb from "@/components/application/admin/BreadCrumb"
import UploadMedia from "@/components/application/admin/UploadMedia"
import { Card, CardHeader } from "@/components/ui/card"
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from "@/routes/adminPaneRoute"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: "Home" },
    { href: ADMIN_MEDIA_SHOW, label: "Media" },
]
const MediaPage = () => {
    const [deleteType, setDeleteType] = useState('SD')
    const fetchMedia = async (page, deleteType) => {
        const { data: responce } = await axios.get(`/api/media?page=${page}&&limit=10&&deleteType=${deleteType}`)
        console.log('responce', responce);
        return responce()
    }
    const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['media-data', deleteType],
        queryFn: async ({ pageParam }) => await fetchMedia(pageParam, deleteType),
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            const nextPage = pages.length
            return lastPage.hasMore ? nextPage : undefined
        }
    })
    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card className='border py-0 shadow-sm'>
                <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2'}>
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-xl uppercase">Media</h4>
                        <div className="flex items-center gap-5">
                            <UploadMedia />
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}

export default MediaPage