'use client'

import { Button } from '@/components/ui/button'
import { showToast } from '@/lib/toast'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'

const UploadMedia = ({ isMultiple }) => {
    const handleOnUpload = async (result) => {
        const file = result?.info
        console.log('file uploaded:', file)

        const uploadedFiles = file ? [{
            asset_id: file.asset_id,
            public_id: file.public_id,
            secure_url: file.secure_url,
            path: file.path,
            thumbnail_url: file.thumbnail_url,
        }] : []

        if (uploadedFiles.length > 0) {
            try {
                const { data: uploadResponse } = await axios.post('/api/media/create', uploadedFiles)
                if (!uploadResponse.success) throw new Error(uploadResponse.message)
                showToast('success', uploadResponse.message)
            } catch (error) {
                console.error(error)
                showToast('error', error.message)
            }
        }
    }

    const handleOnError = (error) => {
        console.error('Cloudinary error:', error)
        showToast("error", error?.statusText || "Upload error")
    }

    return (
        <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} // Must be UNSIGNED
            onUpload={handleOnUpload}
            onError={handleOnError}
            options={{
                multiple: isMultiple,
                maxFiles: isMultiple ? 10 : 1,
                sources: ['local', 'url', 'unsplash', 'google_drive'],
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME
            }}
            config={{
                cloud: {
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
                    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
                }
            }}        >
            {({ open }) => (
                <Button variant="secondary" onClick={() => open()}>
                    <Plus /> Upload
                </Button>
            )}
        </CldUploadWidget>
    )
}

export default UploadMedia
