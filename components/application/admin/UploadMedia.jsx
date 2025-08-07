'use client'
import { Button } from '@/components/ui/button'
import { showToast } from '@/lib/toast'
import axios from 'axios'
import { CldUploadWidget } from 'next-cloudinary'

const UploadMedia = ({ isMultiple }) => {
    const handleOnError = (error) => {
        showToast("error", error?.statusText || "Upload error")
    }

    const handleOnUpload = async (result) => {
        const file = result?.info;
        const uploadedFiles = file ? [{
            asset_id: file.asset_id,
            public_id: file.public_id,
            secure_url: file.secure_url,
            path: file.path,
            thumbnail_url: file.thumbnail_url,
        }] : [];

        if (uploadedFiles.length > 0) {
            try {
                const { data: uploadResponse } = await axios.post('/api/media/create', uploadedFiles);
                if (!uploadResponse.success) throw new Error(uploadResponse.message);
                showToast('success', uploadResponse.message);
            } catch (error) {
                console.error(error);
                showToast('error', error.message);
            }
        }
    }

    return (
        <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onError={handleOnError}
            onUpload={handleOnUpload}
            options={{
                multiple: isMultiple,
                sources: ['local', 'url', 'unsplash', 'google_drive'],
                maxFiles: isMultiple ? 10 : 1
            }}
            config={{
                cloud: {
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
                    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
                }
            }}
        >
            {({ open }) => (
                <Button variant="secondary" onClick={() => open()}>
                    Upload
                </Button>
            )}
        </CldUploadWidget>
    )
}

export default UploadMedia
