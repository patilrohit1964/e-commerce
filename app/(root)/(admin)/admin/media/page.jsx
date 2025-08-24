'use client'
import BreadCrumb from "@/components/application/admin/BreadCrumb"
import Media from "@/components/application/admin/Media"
import UploadMedia from "@/components/application/admin/UploadMedia"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from "@/routes/adminPaneRoute"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: "Home" },
    { href: ADMIN_MEDIA_SHOW, label: "Media" },
]
const MediaPage = () => {
    const [deleteType, setDeleteType] = useState('SD')
    const [selectedMedia, setSelectedMedia] = useState([])
    const searchParams = useSearchParams()
    useEffect(() => {
        if (searchParams) {
            const trashof = searchParams.get('trashof')
            setSelectedMedia([])
            if (trashof) {
                setDeleteType("PD")
            } else {
                setDeleteType("SD")
            }
        }
    }, [searchParams])
    const fetchMedia = async (page, deleteType) => {
        try {
            const { data: mediaGetResponce } = await axios.get(`/api/media?page=${page}&limit=10&deleteType=${deleteType}`);
            return mediaGetResponce;
        } catch (err) {
            console.error('Media fetch failed', err?.response?.data || err.message);
            throw new Error(err?.response?.data?.message || 'Failed to fetch media');
        }
    };

    const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: ['media-data', deleteType],
        queryFn: async ({ pageParam }) => await fetchMedia(pageParam, deleteType),
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            const nextPage = pages.length
            return lastPage.hasMore ? nextPage : undefined;
        }
    })

    const handleDelete = () => {

    }
    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card className='border py-0 shadow-sm'>
                <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2'}>
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-xl uppercase">Media</h4>
                        <div className="flex items-center gap-5">
                            <UploadMedia />
                            <div className="flex gap-3">
                                {deleteType === 'SD' ?
                                    <Button type="button" variant={'destructive'}>
                                        <Link href={`${ADMIN_MEDIA_SHOW}?trashof=media`}>
                                            Trash
                                        </Link>
                                    </Button> :
                                    <Button>
                                        <Link href={`${ADMIN_MEDIA_SHOW}`}>Back To Media</Link>
                                    </Button>}
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {
                        status === 'pending'
                            ?
                            <div>loading</div>
                            :
                            status === 'error'
                                ?
                                <div className="text-red-500 text-sm">
                                    {error.message}
                                </div>
                                :
                                <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 mb-5">
                                    {data?.pages?.map((page, idx) => (
                                        <React.Fragment key={idx}>
                                            {page?.mediaData?.map((media) => (
                                                <Media
                                                    key={media?._id}
                                                    media={media}
                                                    handleDelete={handleDelete}
                                                    deleteType={deleteType}
                                                    selectedMedia={selectedMedia}
                                                    setSelectedMedia={setSelectedMedia} />
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>}
                </CardContent>
            </Card>
        </div >
    )
}

export default MediaPage