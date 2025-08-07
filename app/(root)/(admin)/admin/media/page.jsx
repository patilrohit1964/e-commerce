import BreadCrumb from "@/components/application/admin/BreadCrumb"
import UploadMedia from "@/components/application/admin/UploadMedia"
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from "@/routes/adminPaneRoute"

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: "Home" },
    { href: ADMIN_MEDIA_SHOW, label: "Media" },
]
const MediaPage = () => {

    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />
            <UploadMedia isMultiple={true} />
        </div>
    )
}

export default MediaPage