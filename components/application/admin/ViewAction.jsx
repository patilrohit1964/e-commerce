import { ListItemIcon, MenuItem } from '@mui/material'
import { Eye } from 'lucide-react'
import Link from 'next/link'

const ViewAction = ({ href }) => {
    return (
        <MenuItem key={'view'}>
            <Link href={href} className='flex items-center'>
                <ListItemIcon>
                    <Eye />
                </ListItemIcon>
                View
            </Link>
        </MenuItem>
    )
}

export default ViewAction