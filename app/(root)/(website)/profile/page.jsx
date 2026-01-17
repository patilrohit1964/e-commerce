'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import ButtonLoading from "../../../../components/application/ButtonLoading"
import UserPanelLayout from "../../../../components/application/website/UserPanelLayout"
import WebsiteBreadCrumb from "../../../../components/application/website/WebsiteBreadCrumb"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../components/ui/form"
import { Input } from "../../../../components/ui/input"
import { zSchmea } from "../../../../lib/zodSchema"
import { useEffect, useState } from "react"
import { Textarea } from "../../../../components/ui/textarea"
import { useFetch } from "../../../../hooks/useFetch"
import Dropzone from "react-dropzone/"
import { Avatar, AvatarImage } from "../../../../components/ui/avatar"
import { Camera } from "lucide-react"
import { showToast } from "../../../../lib/toast"
import axios from "axios"
import { useDispatch } from "react-redux"
import { login } from "../../../../store/reducers/authReducer"
const breadCrumbData = {
  title: 'Profile',
  links: [{ label: 'Profile' }]
}
const UserProfile = () => {
  const { data: userData, loading: getUserLoading } = useFetch('/api/profile/get')
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [file, setFile] = useState();
  const dispatch = useDispatch()
  const updateProfileSchema = zSchmea.pick({
    address: true,
    name: true,
    phone: true,
  })

  const updateProfileForm = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: ''
    }
  })
  const handleProfilePic = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file)
    setPreview(preview)
    setFile(file)
  };
  const handleProfileUpdate = async ({ name, phone, address }) => {
    setLoading(true)
    try {
      let formData = new FormData()
      if (file) {
        formData.set('file', file)
      }
      formData.set('name', name)
      formData.set('phone', phone)
      formData.set('address', address)
      const { data: profileData } = await axios.put(`/api/profile/update`, formData)
      if (!profileData?.success) {
        throw new Error(profileData?.message)
      }
      showToast('success', profileData?.message)
      dispatch(login(profileData?.data))
    }
    catch (error) {
      console.log(error)
      showToast('error', error?.message)
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    if (userData && userData?.success) {
      updateProfileForm.reset({
        name: userData?.data?.name,
        phone: userData?.data?.phone,
        address: userData?.data?.address,
      })
    }
  }, [userData])
  return (
    <div>
      <WebsiteBreadCrumb props={breadCrumbData} />
      <UserPanelLayout>
        <div className='shadow rounded'>
          <div className='p-5 text-xl form-semibold border-b'>
            Profile
          </div>
          <div className='p-5'>
            {
              getUserLoading ? <h1>Fetch Details...</h1> :
                <Form {...updateProfileForm}>
                  <form onSubmit={updateProfileForm.handleSubmit(handleProfileUpdate)}>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                      <div className='md:col-span-2 col-span-1 flex items-center justify-center'>
                        <Dropzone onDrop={acceptedFiles => handleProfilePic(acceptedFiles)}>
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <Avatar className={'w-28 h-28 relative group border border-gray-400 transition-all duration-300'}>
                                <AvatarImage src={preview ? preview : userData?.data?.avatar?.url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAwLk7BdSBwMGmmO6YCyxEP0otqy_0jXtY6w&s'} />
                                <div className='absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-violet-500 rounded-full group-hover:flex hidden cursor-pointer bg-black/50'>
                                  <Camera color='white' />
                                </div>
                              </Avatar>
                            </div>
                          )}
                        </Dropzone>
                      </div>
                      <div>
                        <FormField control={updateProfileForm.control} name='name' render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor={'name'}>Name</FormLabel>
                            <FormControl>
                              <Input type={'text'} id={'name'} placeholder="enter your name" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}>
                        </FormField>
                      </div>
                      <div>
                        <FormField control={updateProfileForm.control} name='phone' render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor={'phone'}>Phone</FormLabel>
                            <FormControl>
                              <Input type={'number'} id={'phone'} placeholder="enter your phone" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}>
                        </FormField>
                      </div>
                      <div className='md:col-span-2 col-span-1'>
                        <FormField control={updateProfileForm.control} name='address' render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor={'address'}>Address</FormLabel>
                            <FormControl>
                              <Textarea type={'text'} id={'address'} placeholder="enter your address" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}>
                        </FormField>
                      </div>
                    </div>
                    <ButtonLoading loading={loading} text={"Update Profile"} className={'my-3 cursor-pointer'} />
                  </form>
                </Form>
            }
          </div>
        </div>
      </UserPanelLayout>
    </div>
  )
}

export default UserProfile