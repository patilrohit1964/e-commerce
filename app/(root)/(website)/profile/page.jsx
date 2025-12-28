import UserPanelLayout from '../../../../components/application/website/UserPanelLayout'
import WebsiteBreadCrumb from '../../../../components/application/website/WebsiteBreadCrumb'
import React from 'react'
const breadCrumbData = {
  title: 'Profile',
  links: [{ label: 'Profile' }]
}
const UserProfile = () => {
  return (
    <div>
      <WebsiteBreadCrumb props={breadCrumbData} />
      <UserPanelLayout>
        <div className='shadow rounded'>
          <div className='p-5 text-xl form-semibold border-b'>
            Profile
          </div>
          <div className='p-5'>

          </div>
        </div>
      </UserPanelLayout>
    </div>
  )
}

export default UserProfile