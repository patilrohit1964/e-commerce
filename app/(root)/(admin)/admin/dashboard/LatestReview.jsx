import { Star } from "lucide-react"
import { Avatar, AvatarImage } from "../../../../../components/ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../../../../../components/ui/table"

export function LatestReview() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Rating</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 20 }).map((invoice, idx) => (
                    <TableRow key={idx}>
                        <TableCell className={'flex items-center gap-3'}>
                            <Avatar>
                                <AvatarImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3uUwj3--swgBp631BC-haocNy4Pr-58kB0Q&s' />
                            </Avatar>
                            <span className="truncate block w-40">
                                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                            </span>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center">
                                {Array.from({ length: 5 }).map((e, i) => (
                                    <span><Star className="text-yellow-500 fill-yellow-500" size={18} /></span>
                                ))}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
