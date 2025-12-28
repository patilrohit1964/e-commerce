import { ShoppingBag, ShoppingCart } from 'lucide-react'
import UserPanelLayout from '../../../../components/application/website/UserPanelLayout'
import WebsiteBreadCrumb from '../../../../components/application/website/WebsiteBreadCrumb'
import React from 'react'
const breadCrumbData = {
  title: 'Dashboard',
  links: [{ label: 'Dashboard' }]
}
const MyAccount = () => {
  return (
    <div>
      <WebsiteBreadCrumb props={breadCrumbData} />
      <UserPanelLayout>
        <div className='shadow rounded'>
          <div className='p-5 text-xl form-semibold border'>
            Dashboard
          </div>
          <div className='p-5'>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-10'>
              <div className='flex items-center justify-between gap-5 border rounded p-3'>
                <div>
                  <h4 className='font-semibold text-lg mb-1'>Total Orders</h4>
                  <span className='font-semibold text-gray-500'>0</span>
                </div>
                <div className='w-16 h-16 bg-primary rounded-full flex justify-center items-center'>
                  <ShoppingBag color='white' size={15} />
                </div>
              </div>
              <div className='flex items-center justify-between gap-5 border rounded p-3'>
                <div>
                  <h4 className='font-semibold text-lg mb-1'>Items In Cart</h4>
                  <span className='font-semibold text-gray-500'>0</span>
                </div>
                <div className='w-16 h-16 bg-primary rounded-full flex justify-center items-center'>
                  <ShoppingCart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserPanelLayout>
    </div>
  )
}

export default MyAccount