'use client'
import BreadCrumb from "@/components/application/admin/BreadCrumb"
import Media from "@/components/application/admin/Media"
import UploadMedia from "@/components/application/admin/UploadMedia"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useDeleteMutation } from "@/hooks/useDeleteMutation"
import { showToast } from "@/lib/toast"
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
            const nextPage = pages?.length
            return lastPage.hasMore ? nextPage : undefined;
        }
    })

    const deleteMutation = useDeleteMutation('media-data', '/api/media/delete')
    const handleDelete = (ids, deleteType) => {
        if (deleteType === 'PD') {
            if (confirm("Are You Sure Permentely Delete Media This Action Can't Undone")) {
                deleteMutation.mutate({ ids, deleteType })
                setSelectedMedia([])
            }
        } else if (deleteType == 'SD') {
            deleteMutation.mutate({ ids, deleteType })
            setSelectedMedia([])
        }
        else {
            deleteMutation.mutate({ ids, deleteType })
            setSelectedMedia([])
        }
    }
    const allMediaCount = data?.pages[0].mediaData?.length === selectedMedia?.length
    const allMediaSelectHandler = (choice) => {
        const allMedia = data?.pages[0].mediaData.map((page, idx) => page?._id)
        choice === 'select all' ? setSelectedMedia(allMedia) : setSelectedMedia([])
    }
    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card className='border py-0 shadow-sm'>
                <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2'}>
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-xl uppercase">Media</h4>
                        <div className="flex items-center gap-5">
                            {deleteType === "SD" && <UploadMedia />}
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
                    {data?.pages?.[0]?.mediaData && data?.pages?.[0]?.mediaData.length > 0 ?
                        (
                            <>
                                {

                                    selectedMedia?.length > 0 &&
                                    <div className="mb-2 py-2 px-2 bg-gray-800 rounded-lg flex justify-between items-center">
                                        <Label
                                        >
                                            <Checkbox
                                                checked={allMediaCount}
                                                onCheckedChange={() => allMediaSelectHandler(allMediaCount ? 'delesect all' : 'select all')}
                                            />
                                            {
                                                allMediaCount
                                                    ?
                                                    'Deselect All'
                                                    :
                                                    "Select All"
                                            }
                                        </Label>
                                        <div className="flex gap-2">
                                            {
                                                deleteType === 'SD' ?
                                                    <Button
                                                        variant={'destructive'}
                                                        onClick={() => handleDelete(selectedMedia, deleteType)}
                                                    >
                                                        Move Into Trash
                                                    </Button> :
                                                    <>
                                                        <Button
                                                            className='bg-green-500 hover:bg-green-600'
                                                            onClick={() => handleDelete(selectedMedia, "RSD")}>
                                                            Restore
                                                        </Button>
                                                        <Button
                                                            className='bg-red-600 hover:bg-red-500'
                                                            onClick={() => handleDelete(selectedMedia, "PD")}>
                                                            Delete Permentely
                                                        </Button>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                }
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
                                            </div>
                                }
                            </>
                        )
                        :
                        <div className="text-center">
                            No Trash Media Found Here
                        </div>
                    }
                </CardContent>
            </Card>
        </div >
    )
}
export default MediaPage;