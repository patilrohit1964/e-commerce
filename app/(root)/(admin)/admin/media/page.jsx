import BreadCrumb from "@/components/application/admin/BreadCrumb"
import { ADMIN_DASHBOARD } from "@/routes/adminPaneRoute"

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: "Home" },
    { href: '', label: "Media" },
]
const MediaPage = () => {

    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />
        </div>
    )
}

export default MediaPage