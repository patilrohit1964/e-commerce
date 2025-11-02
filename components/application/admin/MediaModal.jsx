import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import ModalMediaBlock from './ModalMediaBlock';
import ButtonLoading from '../ButtonLoading';

const MediaModal = ({ open, setOpen, selectedMedia, setSelectedMedia, isMulitple }) => {

    const fetchMedia = async (page) => {
        const { data: responce } = await axios.get(`/api/media?page=${page}&&limit=10&&deleteType=SD`)
        return responce
    }
    const { isPending, isError, error, data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["MediaModal"],
        queryFn: async ({ pageParam }) => await fetchMedia(pageParam),
        placeholderData: keepPreviousData,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length
            return lastPage?.hasMore ? nextPage : undefined
        }
    })
    const handleClick = () => {
        setSelectedMedia([])
    };
    const handleSelect = () => {
        setOpen(false)
    };
    const handleClose = () => {
        setOpen(false)
    };
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent onInteractOutside={(e) => e.preventDefault()} className={'sm:max-w-[80%] h-screen p-0 py-10 bg-transparent border-0 shadow-none'}>
                <DialogDescription className={'hidden'}></DialogDescription>
                <div className='h-[90vh] dark:bg-card bg-white p-3 rounded shadow'>
                    <DialogHeader className={'h-8 border-b'}>
                        <DialogTitle className={'dark:text-white'}>Media Selection</DialogTitle>
                    </DialogHeader>
                    <div className='h-[calc(100%-80px)] overflow-auto py-2'>
                        {
                            isPending ? (<div className='size-full flex justify-center items-center'>
                                Loading
                            </div>) : isError ? <div className='size-full flex justify-center items-center'>error something wrong</div> : <>
                                <div className='grid lg:grid-cols-6 grid-cols-3 gap-2'>
                                    {data?.pages?.map((page, idx) => (
                                        <React.Fragment key={idx}>
                                            {page?.mediaData?.map((media) => (
                                                <ModalMediaBlock
                                                    key={media?._id}
                                                    selectedMedia={selectedMedia}
                                                    setSelectedMedia={setSelectedMedia}
                                                    isMulitple={isMulitple}
                                                    media={media}
                                                />
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </>
                        }
                        {
                            hasNextPage ?
                                <div className='flex justify-center items-center'>
                                    <ButtonLoading type={'button'} text={'Load More'} loading={isFetching} onClick={fetchNextPage()} />
                                </div>
                                :
                                <div className='text-center text-gray-400 select-none py-4'>No more data for load</div>
                        }
                    </div>
                    <div className='h-10 pt-3 border-t flex justify-between'>
                        <div>
                            <Button type='button' variant={'destructive'} onClick={handleClick}>Clear All</Button>
                        </div>
                        <div className='flex gap-5'>
                            <Button type='button' variant={'secondary'} onClick={handleClose}>Close</Button>
                            <Button type='button' variant={'default'} disabled={selectedMedia?.length === 0} onClick={handleSelect}>Select</Button>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default MediaModal