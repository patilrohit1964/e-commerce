import { ListItemIcon, MenuItem } from '@mui/material'
import { Edit2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const EditAction = ({ href }) => {
    return (
        <MenuItem key={'edit'}>
            <Link href={href}>
                <ListItemIcon>
                    <Edit2 />
                </ListItemIcon>
                Delete
            </Link>
        </MenuItem>
    )
}

export default EditAction