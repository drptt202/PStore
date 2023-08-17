import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Input, Rating } from '@material-tailwind/react'
import Navigation from '../Navigation'
import { useParams } from 'react-router-dom'
import { add1ToCart, productDetails } from './../../services/ApiService';
import { ProductContext } from '../../Contexts/ProductContext'

const Index = () => {
    const { loai, ten } = useParams()
    const [disabled, setDisabled] = useState(false);
    const { store } = useContext(ProductContext)
    const [product, setProduct] = useState([])
    const [count, setCount] = useState(1)



    useEffect(() => {
        productDetails(loai, ten)
            .then(res => {
                setProduct(res.data.data.product[0])
                if (store[product.Code] < 1) {
                    setDisabled(true)
                }
            }).catch(err => console.log(err))
    }, [store, loai, ten])

    const addToCart = (ma) => {
        let i = 1;
        while (i <= count) {
            add1ToCart(ma)
                .then(() => {
                    openToast()
                }).catch(err => console.log(err))
            i++;
        }
        window.location.reload()
    }

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
                                    {ten}
                                </a>
                            </li>
                        </ol>
                    </nav>

                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-sm">
                        <div className="aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                src={product.Image}
                                alt={product.Name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.Name}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h3 className="text-sm font-medium text-gray-900">Giá niêm yết</h3>
                            <p className="text-3xl tracking-tight text-gray-900">{product.Price}</p>

                            {/* Reviews */}
                            {/* <div className="mt-6">
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <Rating value={4} readonly />
                                    </div>
                                    <a href={'#'} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        117 reviews
                                    </a>
                                </div>
                            </div> */}

                            <div className="mt-10">
                                {/* Trạng thái */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Trạng thái</h3>
                                    <p className="text-3xl tracking-tight text-green-900">{store[product.Code] > 0 ? "Còn hàng" : "Tạm hết"}</p>
                                </div>

                                {/* Số lượng */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Số lượng</h3>
                                    </div>
                                    <Input type={'number'} value={count} min={1} max={store[product.Code]} onChange={e => { setCount(e.target.value) }} />
                                </div>
                                <div className='flex justify-between'>
                                    <button disabled={disabled} onClick={() => { onClick(); addToCart(product.Code); }}
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
                                    <p className="text-base text-gray-900">{product.Decription}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-lg font-bold text-gray-900">Thông số kỹ thuật</h3>

                                <div className="mt-4">
                                    <ul role="list" className="space-y-2 pl-4 text-sm list-none">
                                        {product.Code &&
                                            <li className="text-gray-400">
                                                <span className="text-gray-600">Mã sản phẩm: {product.Code}</span>
                                            </li>
                                        }
                                        {product.CPU &&
                                            <li className="text-gray-400">
                                                <span className="text-gray-600">CPU: {product.CPU}</span>
                                            </li>
                                        }
                                        {product.RAM &&
                                            <li className="text-gray-400">
                                                <span className="text-gray-600">RAM: {product.RAM}</span>
                                            </li>
                                        }
                                        {product.DISK &&
                                            <li className="text-gray-400">
                                                <span className="text-gray-600">Bộ nhớ: {product.DISK}</span>
                                            </li>
                                        }
                                        {product.Release &&
                                            <li className="text-gray-400">
                                                <span className="text-gray-600">Phát hành: {product.Release}</span>
                                            </li>
                                        }

                                    </ul>
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