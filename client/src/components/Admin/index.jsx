import { Tab } from '@headlessui/react'
import classNames from 'classnames'
import { useNavigate, useSearchParams } from 'react-router-dom'
import StoreRender from './Store/StoreRender'
import OrderRender from './Order/OrderRender'
import { useContext } from 'react'
import { TABLE_HEAD1, TABLE_HEAD2, TABLE_HEAD3, TABLE_HEAD4, TABLE_HEAD5, TABLE_HEAD6, TABLE_HEAD7, TABLE_HEAD8 } from './table_head'
import EmployeesRender from './Employees/EmployeesRender'
import { AdminContext } from '../../Contexts/AdminContext'
import CustomerRender from './Customers/CustomersRender'

const Index = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const { products, employees, customers } = useContext(AdminContext)
    const toLogout = () => {
        sessionStorage.setItem('isLogin', false)
        localStorage.clear()
        navigate('/dang-nhap')
    }

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
                                {
                                    localStorage.getItem('Role') == "Admin" &&
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
                                }
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        onClick={() => { setSearchParams('?Type=8') }}

                                        key={8}
                                        className={() =>
                                            classNames(
                                                query == 8 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                'flex items-center p-2 space-x-3 rounded-md'
                                            )
                                        }
                                    >
                                        <svg
                                            viewBox="0 0 1024 1024"
                                            fill="currentColor"
                                            height="2em"
                                            width="2em"
                                        >
                                            <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
                                        </svg><span>Khách hàng</span>
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
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            height="2em"
                                            width="2em"
                                        >
                                            <path d="M19 19H5V5h14m0-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2m-2.5 13.25c0-1.5-3-2.25-4.5-2.25s-4.5.75-4.5 2.25V17h9M12 12.25A2.25 2.25 0 0014.25 10 2.25 2.25 0 0012 7.75 2.25 2.25 0 009.75 10 2.25 2.25 0 0012 12.25z" />
                                        </svg>
                                        <span>Tài khoản</span>
                                    </Tab>

                                </Tab.List>
                                {/* <Profile /> */}
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        onClick={toLogout}
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
                    {localStorage.getItem('Role') == "Admin" && query == 3 && <EmployeesRender data={employees} TABLE_HEAD={TABLE_HEAD3} type={`type=${query}`} />}
                    {query == 4 && <OrderRender TABLE_HEAD={TABLE_HEAD4} type={`type=${query}`} />}
                    {query == 5 && <OrderRender TABLE_HEAD={TABLE_HEAD5} type={`type=${query}`} />}
                    {query == 6 && <OrderRender TABLE_HEAD={TABLE_HEAD6} type={`type=${query}`} />}
                    {query == 7 && <OrderRender TABLE_HEAD={TABLE_HEAD7} type={`type=${query}`} />}
                    {query == 8 && <CustomerRender data={customers} TABLE_HEAD={TABLE_HEAD8} type={`type=${query}`} />}

                </div>
            </div>
        </>
    )
}

export default Index