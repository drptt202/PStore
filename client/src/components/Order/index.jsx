import { useState } from 'react'
import Navigation from '../Navigation'
import { Tab } from '@headlessui/react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import Pending from './Pending'
import Cancelled from './Cancelled'
import Completed from './Completed'
import Shipping from './Shipping';
const Index = () => {
    const navigate = useNavigate()
    const [type, setType] = useState('pending')
    const toLogout = () => {
        sessionStorage.setItem('isLogin', false)
        localStorage.clear()
        navigate('/')
    }
    return (
        <>
            <Navigation />
            <div className="flex">
                <div className="flex flex-col h-screen p-3 bg-white shadow w-60">
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <h2 className="text-xl font-bold">Đơn hàng</h2>
                        </div>
                        <div className="flex-1">
                            <Tab.Group as='div' className="pt-2 pb-4 space-y-1 text-sm">
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        onClick={() => setType('pending')}
                                        key={'pending'}
                                        className={({ selected }) =>
                                            classNames(
                                                selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                'flex items-center p-2 space-x-3 rounded-md'
                                            )
                                        }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM8 12h8" /></svg>
                                        <span>Chờ xác nhận</span>
                                    </Tab>
                                </Tab.List>
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        onClick={() => setType('shipping')}

                                        key={'shipping'}
                                        className={({ selected }) =>
                                            classNames(
                                                selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                'flex items-center p-2 space-x-3 rounded-md'
                                            )
                                        }
                                    ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg>
                                        <span>Đang vận chuyển</span>
                                    </Tab>
                                </Tab.List>
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        onClick={() => setType('completed')}

                                        key={'completed'}
                                        className={({ selected }) =>
                                            classNames(
                                                selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                'flex items-center p-2 space-x-3 rounded-md'
                                            )
                                        }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                                        <span>Thành công</span>
                                    </Tab>
                                </Tab.List>
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        onClick={() => setType('cancelled')}

                                        key={'cancelled'}
                                        className={({ selected }) =>
                                            classNames(
                                                selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                'flex items-center p-2 space-x-3 rounded-md'
                                            )
                                        }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM15 9l-6 6m0-6l6 6" /></svg>
                                        <span>Đã huỷ</span>
                                    </Tab>
                                </Tab.List>
                                <Tab.List className="rounded-sm">
                                    <Tab
                                        onClick={toLogout}
                                        href="/"
                                        className="flex items-center p-2 space-x-3 rounded-md"
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
                                        </svg>
                                        <span>Đăng xuất</span>
                                    </Tab>
                                </Tab.List>
                            </Tab.Group>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto mt-12">
                    {type === 'pending' &&
                        <Pending />
                    }{type === 'completed' &&
                        <Completed />
                    }{type === 'cancelled' &&
                        <Cancelled />
                    }{type === 'shipping' &&
                        <Shipping />
                    }
                </div>
            </div>
        </>
    )
}

export default Index