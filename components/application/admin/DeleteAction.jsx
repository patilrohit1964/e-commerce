import { ListItemIcon, MenuItem } from '@mui/material'
import { Trash } from 'lucide-react'

const DeleteAction = ({ handleDelete, row, deleteType }) => {
    return (
        <MenuItem key={'delete'} onClick={() => handleDelete([row?.original?._id], deleteType)}>
            <ListItemIcon>
                <Trash />
            </ListItemIcon>
            Delete
        </MenuItem>
    )
}

export default DeleteAction