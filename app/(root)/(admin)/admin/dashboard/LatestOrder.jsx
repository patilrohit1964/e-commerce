import { Badge } from "../../../../../components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../../../../../components/ui/table"

export function LatestOrder() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order Id</TableHead>
                    <TableHead>Payment Id</TableHead>
                    <TableHead>Total Id</TableHead>
                    <TableHead>Status Id</TableHead>
                    <TableHead>Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 20 }).map((invoice, idx) => (
                    <TableRow key={idx}>
                        <TableCell>{`invoice${idx + 1}`}</TableCell>
                        <TableCell>{`payment${idx + 1}`}</TableCell>
                        <TableCell>{`total${idx + 1}`}</TableCell>
                        <TableCell><Badge>{`status${idx + 1}`}</Badge></TableCell>
                        <TableCell>{`amount${idx + 1}`}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
