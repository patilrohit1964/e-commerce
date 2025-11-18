'use client'
import Link from 'next/link'
import { useRouter, useSearchParams, } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import { Slider } from '../../../components/ui/slider'
import { useFetch } from '../../../hooks/useFetch'
import { WEBSITE_SHOP } from '../../../routes/websiteRoute'
import ButtonLoading from '../ButtonLoading'
import { CoolMode } from '../../../components/ui/cool-mode'

const Filter = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [priceFilter, setPriceFilter] = useState({ minPrice: 0, maxPrice: 3000 });
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const { data: categoryData } = useFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/get-category`)
  const { data: sizeData } = useFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product-variant/size`)
  const { data: colorData } = useFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product-variant/colors`)
  const urlSearchParams = new URLSearchParams(searchParams.toString())
  const handlePriceChange = (value) => {
    setPriceFilter({ minPrice: value[0], maxPrice: value[1] })
  };

  // set category func
  const handleCategoryFilter = (categorySlug) => {
    let newSelectedCategory = [...selectedCategory]
    if (newSelectedCategory.includes(categorySlug)) {
      newSelectedCategory = newSelectedCategory.filter(cat => cat !== categorySlug)
    } else {
      newSelectedCategory.push(categorySlug)
    }
    setSelectedCategory(newSelectedCategory)
    newSelectedCategory.length > 0 ? urlSearchParams.set('category', newSelectedCategory.join(',')) : urlSearchParams.delete('category')
    router.push(`${WEBSITE_SHOP}?${urlSearchParams}`)
  };

  //set color func 
  const handleColorFilter = (color) => {
    let newSelectedColor = [...selectedColor]
    if (newSelectedColor.includes(color)) {
      newSelectedColor = newSelectedColor.filter(co => co !== color)
    } else {
      newSelectedColor.push(color)
    }
    setSelectedColor(newSelectedColor)
    newSelectedColor.length > 0 ? urlSearchParams.set('color', newSelectedColor.join(',')) : urlSearchParams.delete('color')
    router.push(`${WEBSITE_SHOP}?${urlSearchParams}`)
  };

  //set size func
  const handleSizeFilter = (size) => {
    let newSelectedSize = [...selectedSize]
    if (newSelectedSize.includes(size)) {
      newSelectedSize = newSelectedSize.filter(s => s !== size)
    } else {
      newSelectedSize.push(size)
    }
    setSelectedSize(newSelectedSize)
    newSelectedSize.length > 0 ? urlSearchParams.set('size', newSelectedSize.join(',')) : urlSearchParams.delete('size')
    router.push(`${WEBSITE_SHOP}?${urlSearchParams}`)
  };

  const handlePriceFilter = () => {
    urlSearchParams.set('minPrice', priceFilter.minPrice)
    urlSearchParams.set('maxPrice', priceFilter.maxPrice)
    router.push(`${WEBSITE_SHOP}?${urlSearchParams}`)
  }
  useEffect(() => {
    searchParams?.get('category') ? setSelectedCategory(searchParams?.get('category')?.split(',')) : setSelectedCategory([])
    searchParams?.get('color') ? setSelectedColor(searchParams?.get('color')?.split(',')) : setSelectedColor([])
    searchParams?.get('size') ? setSelectedSize(searchParams?.get('size')?.split(',')) : setSelectedSize([])
  }, [searchParams]);

  return (
    <div>
      {searchParams?.size > 0 &&
        <CoolMode>
          <Button type='button' variant={'destructive'}>
            <Link href={WEBSITE_SHOP}>Clear Filter</Link>
          </Button>
        </CoolMode>
      }
      <Accordion type="multiple" defaultValue={['1', '2', '3', '4']}>
        {/* this help to multiple accordion open by default open all accordion */}
        {/* category accordion */}
        <AccordionItem value="1">
          <AccordionTrigger className={'uppercase font-semibold hover:no-underline'}>Category</AccordionTrigger>
          <AccordionContent>
            <div className='max-h-48 overflow-auto'>
              <ul>
                {categoryData && categoryData?.success && categoryData?.data?.map(category => (
                  <li key={category?._id} className='mb-3'>
                    <label className={'space-x-3 cursor-pointer flex items-center'}>
                      <Checkbox className={'border border-gray-500'} onCheckedChange={(e) => handleCategoryFilter(category?.slug)} checked={selectedCategory.includes(category?.slug)} />
                      <span className='uppercase'>{category?.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* color accordion */}
        <AccordionItem value="2">
          <AccordionTrigger className={'uppercase font-semibold hover:no-underline'}>Color</AccordionTrigger>
          <AccordionContent>
            <div className='max-h-48 overflow-auto'>
              <ul>
                {colorData && colorData?.success && colorData?.data?.map((color, idx) => (
                  <li key={idx} className='mb-3'>
                    <label className={'space-x-3 cursor-pointer flex items-center'}>
                      <Checkbox className={'border border-gray-500'} onCheckedChange={(e) => handleColorFilter(color)} checked={selectedColor?.includes(color)} />
                      <span>{color}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* size accordion */}
        <AccordionItem value="3">
          <AccordionTrigger className={'uppercase font-semibold hover:no-underline'}>Size</AccordionTrigger>
          <AccordionContent>
            <div className='max-h-48 overflow-auto'>
              <ul>
                {sizeData && sizeData?.success && sizeData?.data?.map((size, idx) => (
                  <li key={idx} className='mb-3'>
                    <label className={'space-x-3 cursor-pointer flex items-center'}>
                      <Checkbox className={'border border-gray-500'} onCheckedChange={(e) => handleSizeFilter(size)} checked={selectedSize.includes(size)} />
                      <span className='uppercase'>{size}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* price accordion */}
        <AccordionItem value="4">
          <AccordionTrigger className={'uppercase font-semibold hover:no-underline'}>Price</AccordionTrigger>
          <AccordionContent>
            <Slider defaultValue={[0, 3000]} max={3000} step={1} onValueChange={handlePriceChange} />
            <div className='flex justify-between items-center pt-2'>
              <span>{priceFilter.minPrice.toLocaleString("en-In", { style: 'currency', currency: 'INR' })}</span>
              <span>{priceFilter.maxPrice.toLocaleString("en-In", { style: 'currency', currency: 'INR' })}</span>
            </div>
            <div className='mt-2'>
              <ButtonLoading type={'button'} text={'Filter Price'} className={'rounded-full cursor-pointer'} onClick={handlePriceFilter} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Filter