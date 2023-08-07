import Navigation from '../Navigation'
import Footer from '../Footer'
import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getByCategory, getByCategorynBrand } from '../../services/ApiService'
const Index = () => {
    const { loai } = useParams()
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams()
    // eslint-disable-next-line no-unused-vars
    const [query, setQuery] = useState(searchParams.get('brand') ? searchParams.get('brand') : searchParams.get('order') ? searchParams.get('order') : "")
    const [listData, setListData] = useState([])
    useEffect(() => {
        if (searchParams.get('brand')) {
            getByCategorynBrand(loai, query)
                .then(res => {
                    setListData(res.data.data.products)
                }).catch(err => { console.log(err) })
        }
        else if (searchParams.get('order')) {
            getByCategory(loai)
                .then(res => {
                    setListData(res.data.data.products)
                    if (query == "ASC") {
                        setListData(res.data.data.products.sort((a, b) => a.Price - b.Price))
                    }
                    else if (query == "DESC") {
                        setListData(res.data.data.products.sort((a, b) => b.Price - a.Price))
                    }
                }).catch(err => { console.log(err) })
        }
        else {
            getByCategory(loai)
                .then(res => {
                    setListData(res.data.data.products)
                }).catch(err => { console.log(err) })
        }
    }, [query])
    return (
        <>
            <Navigation />

            <div className="bg-white">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 uppercase">
                        <li>
                            <div className="flex items-center">
                                <a href={`/${loai}`} className="mr-2 text-lg font-medium text-gray-900">
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
                        <li className="text-lg">
                            <a aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {query}
                            </a>
                        </li>
                    </ol>
                </nav>
                <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {listData.map((item) => (
                            <a key={item.Code} href={`/${item.Category}/${item.Name}`} className="group">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src={item.Image}
                                        alt={item.Name}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">{item.Name}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">{item.Price}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Index