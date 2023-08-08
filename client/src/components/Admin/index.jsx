import { Tab } from '@headlessui/react'
import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'
import StoreRender from './StoreRender'
import OrderRender from './OrderRender'
import { useContext } from 'react'
import { ProductContext } from '../../Contexts/ProductContext'
import { TABLE_HEAD1, TABLE_HEAD2, TABLE_HEAD3 } from './table_head'
import { ProfileContext } from '../../Contexts/ProfileContext'
import EmployeesRender from './EmployeesRender'
const Index = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { products } = useContext(ProductContext)
    const { employees } = useContext(ProfileContext)


    // eslint-disable-next-line no-unused-vars
    const query = searchParams.get('Type')
    return (
        <>
            <header className="relative bg-white">
                <p className="flex h-10 items-center justify-center bg-amber-400 px-4 text-sm font-medium text-black sm:px-6 lg:px-8">
                    Chuyên Máy Game PS5, PS4, Nintendo Switch giá tốt nhất thị trường
                </p>
            </header>
            <div className="flex">
                <div className="flex flex-col h-screen p-3 bg-white shadow w-60">
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <h2 className="text-xl font-bold">Cửa hàng</h2>
                        </div>
                        <div className="flex-1">
                            <Tab.Group as='div' className="pt-2 pb-4 space-y-1 text-sm">
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        onClick={() => { setSearchParams('?Type=1') }}
                                        key={1}
                                        className={() =>
                                            classNames(
                                                query == 1 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                'flex items-center p-2 space-x-3 rounded-md'
                                            )
                                        }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM12 8v8m-4-4h8" /></svg><span>Sản phẩm</span>
                                    </Tab>
                                </Tab.List>
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        onClick={() => { setSearchParams('?Type=2') }}

                                        key={2}
                                        className={() =>
                                            classNames(
                                                query == 2 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                'flex items-center p-2 space-x-3 rounded-md'
                                            )
                                        }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg><span>Tồn kho</span>
                                    </Tab>
                                </Tab.List>
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        onClick={() => { setSearchParams('?Type=3') }}

                                        key={3}
                                        className={() =>
                                            classNames(
                                                query == 3 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                'flex items-center p-2 space-x-3 rounded-md'
                                            )
                                        }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg><span>Nhân viên</span>
                                    </Tab>
                                </Tab.List>
                            </Tab.Group>
                        </div>
                        <div className="flex items-center">
                            <h2 className="text-xl font-bold">Đơn hàng</h2>
                        </div>
                        <div className="flex-1">
                            <Tab.Group as='div' className="pt-2 pb-4 space-y-1 text-sm">
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        onClick={() => { setSearchParams('?Type=4') }}

                                        key={4}
                                        className={() =>
                                            classNames(
                                                query == 4 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                'flex items-center p-2 space-x-3 rounded-md'
                                            )
                                        }
                                    ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg><span>Duyệt đơn</span>
                                    </Tab>
                                </Tab.List>
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        onClick={() => { setSearchParams('?Type=5') }}

                                        key={5}
                                        className={() =>
                                            classNames(
                                                query == 5 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                'flex items-center p-2 space-x-3 rounded-md'
                                            )
                                        }
                                    >
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                            height="2em"
                                            width="2em"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <path d="M9 17 A2 2 0 0 1 7 19 A2 2 0 0 1 5 17 A2 2 0 0 1 9 17 z" />
                                            <path d="M19 17 A2 2 0 0 1 17 19 A2 2 0 0 1 15 17 A2 2 0 0 1 19 17 z" />
                                            <path d="M5 17H3v-4M2 5h11v12m-4 0h6m4 0h2v-6h-8m0-5h5l3 5M3 9h4" />
                                        </svg>
                                        <span>Đang giao</span>
                                    </Tab>
                                </Tab.List>
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        onClick={() => { setSearchParams('?Type=6') }}

                                        key={6}
                                        className={() =>
                                            classNames(
                                                query == 6 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                'flex items-center p-2 space-x-3 rounded-md'
                                            )
                                        }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" /></svg><span>Hoá đơn</span>
                                    </Tab>
                                </Tab.List>
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        onClick={() => { setSearchParams('?Type=7') }}

                                        key={7}
                                        className={() =>
                                            classNames(
                                                query == 7 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                'flex items-center p-2 space-x-3 rounded-md'
                                            )
                                        }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38" /></svg>
                                        <span>Đơn bị trả/huỷ</span>
                                    </Tab>
                                </Tab.List>
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        className={() =>
                                            classNames('border-transparent text-gray-900 flex items-center p-2 space-x-3 rounded-md'
                                            )
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                            />
                                        </svg><span>Đăng xuất</span>
                                    </Tab>
                                </Tab.List>
                            </Tab.Group>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto mt-12">
                    {/* {
                        query == 1 || query == 2 || query == 3 ?
                            <StoreRender data={products} TABLE_HEAD={TABLE_HEAD} type={`type=${query}`} /> : <OrderRender TABLE_HEAD={TABLE_HEAD} type={`type=${query}`} />
                    } */}
                    {query == 1 && <StoreRender data={products} TABLE_HEAD={TABLE_HEAD1} type={`type=${query}`} />}
                    {query == 2 && <StoreRender data={products} TABLE_HEAD={TABLE_HEAD2} type={`type=${query}`} />}
                    {query == 3 && <EmployeesRender data={employees} TABLE_HEAD={TABLE_HEAD3} type={`type=${query}`} />}
                    {query == 4 && <OrderRender data={products} TABLE_HEAD={TABLE_HEAD3} type={`type=${query}`} />}
                    {query == 5 && <OrderRender data={products} TABLE_HEAD={TABLE_HEAD3} type={`type=${query}`} />}
                    {query == 6 && <OrderRender data={products} TABLE_HEAD={TABLE_HEAD3} type={`type=${query}`} />}

                </div>
            </div>
        </>
    )
}

export default Index