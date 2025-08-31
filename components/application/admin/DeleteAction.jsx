import { ListItemIcon, MenuItem } from '@mui/material'
import { Delete } from 'lucide-react'
import Link from 'next/link'

const DeleteAction = ({ handleDelete, row, deleteType }) => {
    return (
        <MenuItem key={'delete'} onClick={() => handleDelete([row?.original?._id], deleteType)}>
            <Link href={href}>
                <ListItemIcon>
                    <Delete />
                </ListItemIcon>
                Edit
            </Link>
        </MenuItem>
    )
}

export default DeleteAction