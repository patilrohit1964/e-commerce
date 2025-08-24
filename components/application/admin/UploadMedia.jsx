'use client'

import { Button } from '@/components/ui/button'
import { showToast } from '@/lib/toast'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'

const UploadMedia = ({ isMultiple }) => {
    const handleOnQueueEnd = async (result) => {
        const files = result?.info?.files
        const uploadedFiles = files.filter(file => file.uploadInfo).map((file) => ({
            asset_id: file.uploadInfo.asset_id,
            public_id: file.uploadInfo.public_id,
            secure_url: file.uploadInfo.secure_url,
            path: file.uploadInfo.path,
            thumbnail_url: file.uploadInfo.thumbnail_url,
            // alt: file.uploadInfo.alt,
            // title: file.uploadInfo.title,
        }))

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
        console.error('Cloudinary error:', error.statusText)
        showToast("error", error?.statusText || "Upload error")
    }

    return (
        <CldUploadWidget
            signatureEndpoint={"/api/cloudinary-signature"}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} // Must be UNSIGNED
            onError={handleOnError}
            onQueuesEnd={handleOnQueueEnd}
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
