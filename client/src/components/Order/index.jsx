import Navigation from '../Navigation'
import { Tab } from '@headlessui/react'
import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'
import RenderItem from './RenderItem'
const Index = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    // eslint-disable-next-line no-unused-vars
    // const [query, setQuery] = useState(searchParams.get('Type'))
    const query = searchParams.get('Type')
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
                                        onClick={() => { setSearchParams('?Type=1') }}
                                        key={1}
                                        className={() =>
                                            classNames(
                                                query == 1 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
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
                                        onClick={() => { setSearchParams('?Type=2') }}

                                        key={2}
                                        className={() =>
                                            classNames(
                                                query == 2 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                'flex items-center p-2 space-x-3 rounded-md'
                                            )
                                        }
                                    ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg>
                                        <span>Đang vận chuyển</span>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                                        <span>Thành công</span>
                                    </Tab>
                                </Tab.List>
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
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM15 9l-6 6m0-6l6 6" /></svg>
                                        <span>Đã huỷ</span>
                                    </Tab>
                                </Tab.List>
                            </Tab.Group>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto mt-12">
                    <RenderItem type={`type=${query}`} />
                </div>
            </div>
        </>
    )
}

export default Index