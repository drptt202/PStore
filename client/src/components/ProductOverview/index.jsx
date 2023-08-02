import { useState } from 'react'
import toast from 'react-hot-toast'
import { Input, Rating } from '@material-tailwind/react'
import Navigation from '../Navigation'
import { useParams } from 'react-router-dom'
import ps5 from '../../assets/img/may-ps5-gia-re-P1349-1621770999197.jpg'

const product = {
    name: 'PS5 Standard Edition',
    price: ' 14.880.000',
    href: '#',
    images: [
        {
            src: ps5,
            alt: 'may-ps5-standard-edition',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

const Index = () => {
    const { loai, ma } = useParams()
    const [disabled, setDisabled] = useState(false);

    const onClick = () => {
        setDisabled(true);
        setInterval(() => {
            setDisabled(false);
        }, 1000)
    };

    const openToast = () => {
        toast('Đã thêm vào giỏ hàng', {
            duration: 2000,
            position: 'top-center',
            className: 'bg-amber-700 w-80',
            icon: '✅',
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        });
    }
    return (
        <>
            <Navigation />
            <div className="bg-white">
                <div className="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <li>
                                <div className="flex items-center">
                                    <a href={`/${loai}`} className="mr-2 text-sm font-medium text-gray-900">
                                        {loai}
                                    </a>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                            <li className="text-sm">
                                <a aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                    {ma}
                                </a>
                            </li>
                        </ol>
                    </nav>

                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-sm">
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                src={product.images[0].src}
                                alt={product.images[0].alt}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h3 className="text-sm font-medium text-gray-900">Giá niêm yết</h3>
                            <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

                            {/* Reviews */}
                            <div className="mt-6">
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <Rating value={4} readonly />
                                    </div>
                                    <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        {reviews.totalCount} reviews
                                    </a>
                                </div>
                            </div>

                            <div className="mt-10">
                                {/* Trạng thái */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Trạng thái</h3>

                                    <p className="text-3xl tracking-tight text-green-900">Còn hàng</p>
                                </div>

                                {/* Số lượng */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Số lượng</h3>
                                    </div>
                                    <Input type={'number'} />
                                </div>
                                <div className='flex justify-between'>
                                    <button disabled={disabled} onClick={() => { openToast(); onClick() }}
                                        // type="submit"
                                        className="cursor-pointer mr-1 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Thêm vào giỏ
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{product.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-lg font-bold text-gray-900">Thông số kỹ thuật</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {product.highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex mx-auto items-center justify-center shadow-lg mt-6 mb-4 max-w-lg">
                                    <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg"><Rating /></h2>
                                            <div className="w-full md:w-full px-3 mb-2 mt-2">
                                                <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Nhập đánh giá của bạn' required></textarea>
                                            </div>
                                            <div className="w-full md:w-full flex items-start px-3">
                                                <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">

                                                </div>
                                                <div className="-mr-1">
                                                    <input type='submit' className="cursor-pointer bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Gửi đánh giá' />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index