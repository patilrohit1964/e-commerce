'use client'
import { useFetch } from '../../../hooks/useFetch'
const Filter = () => {
  const { data: categoryData } = useFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/get-category`)
  const { data: sizeData } = useFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product-variants/size`)
  const { data: colorData } = useFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product-variant/colors`)
  return (
    <div></div>
  )
}

export default Filter