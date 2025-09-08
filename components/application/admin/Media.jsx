import { Copy, EllipsisVertical, EyeIcon, PencilIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "../../../components/ui/button"
import { showToast } from '../../../lib/toast'
import { ADMIN_MEDIA_EDIT } from '../../../routes/adminPaneRoute'
import { Checkbox } from '../../ui/checkbox'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from "../../ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu'

const Media = ({ media, handleDelete, deleteType, selectedMedia, setSelectedMedia }) => {
    const handleCheck = (e) => {
        let newSelectedMedia = []
        if (selectedMedia.includes(media?._id)) {
            newSelectedMedia = selectedMedia.filter(m => m !== media?._id)
        } else {
            newSelectedMedia = [...selectedMedia, media?._id]
        }
        setSelectedMedia(newSelectedMedia)
    }
    const handleCopyLink = async (url) => {
        await navigator.clipboard.writeText(url)
        showToast("success", "link copied")
    };
    return (
        <div className='border border-gray-200 dark:border-gray-800 relative group rounded overflow-hidden'>
            <div className='absolute top-2 left-2 z-20'>
                <Checkbox checked={selectedMedia.includes(media?._id)} onCheckedChange={handleCheck} className={'border-primary'} />
            </div>
            <div className='absolute top-2 right-2 z-20'>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className='w-7 h-7 flex items-center justify-center rounded-full bg-black/50 cursor-pointer'>
                            <EllipsisVertical className='text-white' />
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start'>
                        <DialogDemo media={media} />
                        {deleteType === "SD" &&
                            <>
                                <DropdownMenuItem asChild className={'cursor-pointer'}>
                                    <Link href={ADMIN_MEDIA_EDIT(media?._id)}>
                                        <PencilIcon /> Edit
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className={'cursor-pointer'} onClick={() => handleCopyLink(media?.secure_url)}>
                                    <Copy />
                                    Copy Link
                                </DropdownMenuItem>
                            </>
                        }
                        <DropdownMenuItem onClick={() => handleDelete([media?._id], deleteType)} className={'text-red-500'}>
                            <Trash2 color='red' />
                            {deleteType === "SD" ? 'Move Into Trash' : 'Delete Permanentaly'}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className='w-full h-full absolute z-10 transition-all duration-150 ease-in group-hover:bg-black/30'></div>
            <div>
                <Image src={media?.secure_url} alt={media?.alt || 'image'} height={300} width={300} className='object-cover w-full sm:h-[200px] h-[150px]' />
            </div>
        </div>
    )
}

export default Media


function DialogDemo({ media }) {
    return (
        <Dialog>
            <DialogTrigger >
                <Button variant="ghost">
                    <EyeIcon /> Preview
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-3">
                <DialogTitle>Preview</DialogTitle>
                <div className='h-full w-full'>
                    <Image src={media?.secure_url} alt={media?.alt || 'image'} height={300} width={300} className='object-cover w-full' />
                </div>
            </DialogContent>
        </Dialog>
    )
}
