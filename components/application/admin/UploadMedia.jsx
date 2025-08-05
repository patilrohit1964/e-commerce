'use client'
import { Button } from '@/components/ui/button'
import { showToast } from '@/lib/toast'
import { CldUploadWidget } from 'next-cloudinary'

const UploadMedia = ({ isMultiple }) => {
    const handleOnError = (error) => {
        showToast("error", error.statusText)
    }
    const handleOnQueueEnd = async (results) => {
        console.log('results', results);
    }
    return (
        <CldUploadWidget
            signatureEndpoint={'/api/cloudinary-signature'}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onError={handleOnError} onQueuesEnd={handleOnQueueEnd}
            config={{
                cloud: {
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
                    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
                }
            }}
            options={{
                multiple: isMultiple,
                sources: ['local', 'url', 'unsplash', 'google_drive']
            }
            }
        >
            {({ open }) => {
                return (
                    <Button variant={'secondary'} className="button" onClick={() => open()}>
                        Upload
                    </Button>
                );
            }}
        </CldUploadWidget >
    )
}

export default UploadMedia