import { useContext } from 'react'
import { ProductContext } from '../../Contexts/ProductContext'
const Index = () => {

    const { top5, selling } = useContext(ProductContext)

    return (
        <div className="bg-white ">
            <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
                <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-900">Sản phẩm nổi bật</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-1 cursor-pointer">
                    {top5 && top5.length > 0 &&
                        top5.map((item) => (
                            <div key={item.id} className="group relative  border border-gray-400 rounded-lg overflow-hidden">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                                    <img
                                        src={item.Image}
                                        alt={item.Name}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-around">
                                    <div>
                                        <h3 className="text-sm text-gray-700 max-w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                                            <a href={`/${item.Category}/${item.Name}`} className="h-100">
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {item.Name}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-900">{item.Price} đ</p>
                                    </div>
                                    <p className="text-sm font-medium  text-gray-500">{item.Brand}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
                <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-900">Đang giảm giá</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-1 cursor-pointer">
                    {selling && selling.length > 0 &&
                        selling.map((item) => (
                            <div key={item.id} className="group relative  border border-gray-400 rounded-lg overflow-hidden">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                                    <img
                                        src={item.Image}
                                        alt={item.Name}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-around">
                                    <div>
                                        <h3 className="text-sm text-gray-700  max-w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                                            <a href={`/${item.Category}/${item.Name}`}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {item.Name}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-900">{item.Price} đ</p>
                                    </div>
                                    <p className="text-sm font-medium  text-gray-500">{item.Brand}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )

}
export default Index