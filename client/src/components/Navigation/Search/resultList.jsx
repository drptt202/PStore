import Navigation from '../../Navigation'
import Footer from '../../Footer'
import { useEffect, useState } from 'react'
import { searchByKeyword } from '../../../services/ApiService'
import { useSearchParams } from 'react-router-dom'
const ResultList = () => {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams()
    const [data, setData] = useState([])
    const query = searchParams.get('keyword')

    useEffect(() => {
        searchByKeyword(query)
            .then(res => {
                setData(res.data.data.products)
            })
            .catch(err => { console.log(err) });
    }, [query])
    return (
        <>
            <Navigation />
            <div className="bg-white">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 uppercase">
                        <li>
                            <div className="flex items-center">
                                <span className="mr-2 text-lg font-medium text-gray-900">
                                    {data.length} kết quả với từ khoá &quot;{query}&quot;
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {data && data.length && data.map((item) => (
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

export default ResultList