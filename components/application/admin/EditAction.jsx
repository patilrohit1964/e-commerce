import { ListItemIcon, MenuItem } from '@mui/material'
import { Edit2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const EditAction = ({ href }) => {
    return (
        <MenuItem key={'edit'}>
            <Link href={href} className='flex items-center justify-between'>
                <ListItemIcon>
                    <Edit2 />
                </ListItemIcon>
                Edit
            </Link>
        </MenuItem>
    )
}

export default EditAction