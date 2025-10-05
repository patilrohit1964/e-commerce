import { RestoreFromTrash } from '@mui/icons-material'
import { ListItemIcon, MenuItem } from '@mui/material'

const RestoreAction = ({ handleRestore, row, deleteType }) => {
    return (
        <MenuItem key={'restore'} onClick={() => handleRestore([row?.original?._id], deleteType)}>
            <ListItemIcon>
                <RestoreFromTrash />
            </ListItemIcon>
            Restore
        </MenuItem>
    )
}

export default RestoreAction