import { Star } from "lucide-react"
import Loading from "../../../../../components/application/Loading"
import { Avatar, AvatarImage } from "../../../../../components/ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../../../../../components/ui/table"
import { useFetch } from "../../../../../hooks/useFetch"
export function LatestReview() {
    const { data: latestReviewData, loading } = useFetch(`/api/dashboard/admin/latest-review`)
    if (loading) {
        return <Loading />
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Rating</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {latestReviewData && latestReviewData?.data?.length > 0 ? latestReviewData?.data.map((lReview, idx) => (
                    <TableRow key={lReview?._id}>
                        <TableCell className={'flex items-center gap-3'}>
                            <Avatar>
                                <AvatarImage src={lReview?.product?.medias?.[0]?.secure_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3uUwj3--swgBp631BC-haocNy4Pr-58kB0Q&s'} />
                            </Avatar>
                            <span className="truncate block w-40">
                                {lReview?.product?.name}
                            </span>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center">
                                {Array.from({ length: lReview?.rating }).map((e, i) => (
                                    <span key={i}><Star className="text-yellow-500 fill-yellow-500" size={18} /></span>
                                ))}
                            </div>
                        </TableCell>
                    </TableRow>
                )) : 'not any review found'}
            </TableBody>
        </Table>
    )
}
