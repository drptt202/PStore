/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { CartContext } from '../../Contexts/CartContext'
import { OPEN_ADDRESS, OPEN_CART } from '../../reducers/types'
import empty from '../../assets/img/empty-cart.png'
import Address from '../Address'
import { add1ToCart, delete1 } from '../../services/ApiService'
import {
    Button,
} from "@material-tailwind/react";

const Index = () => {
    const { total, cartData, open, dispatch, dispatch1 } = useContext(CartContext)
    const addToCart = (ma) => {
        add1ToCart(ma)
            .then(() => {
            }).catch(err => console.log(err))
    }
    const deleteFromCart = (ma) => {
        delete1(ma)
            .then(() => {
            }).catch(err => console.log(err))
    }

    const RenderItem = (props) => {
        const { item, index } = props
        const [num, setNum] = useState(0)
        useEffect(() => {
            setNum(item.Count)
        }, [])
        return (
            <li className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                        src={item.Item.Image}
                        alt={item.Item.Name}
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                                <a href={item.Item.Category}>{item.Item.Name}</a>
                            </h3>
                            <p className="ml-4">{item.Item.Price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.Item.Brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">

                        <div className="flex">
                            <button
                                onClick={() => { addToCart(item.Item.Code); setNum(pre => pre + 1) }}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                <PlusIcon className="h-6 w-6" aria-hidden="true" />

                            </button>
                            <form>
                                <input type="number" className="h-6 w-14" maxLength="3" value={num} min={0} onChange={(e) => setNum(e.target.value)} />
                            </form>
                            <button
                                onClick={() => { deleteFromCart(item.Item.Code); setNum(pre => pre - 1) }}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                <MinusIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        )
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { dispatch({ type: OPEN_CART }) }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => dispatch({
                                                            type: OPEN_CART
                                                        })}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {localStorage.getItem('Role') == 'User' && cartData && cartData.length > 0
                                                            ? cartData.map((item, index) => (
                                                                <RenderItem item={item} index={index} key={index} />
                                                            ))
                                                            :
                                                            <div className="h-full w-full flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img
                                                                    src={empty}
                                                                    alt='empty'
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            </div>
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Tổng cộng</p>
                                                <p>{total} đ</p>
                                            </div>
                                            <div className="mt-6">

                                                <div
                                                    className="flex items-center justify-center rounded-md border border-transparentpx-6 py-3 text-base font-medium text-white shadow-sm"
                                                >
                                                    <Button size='lg' onClick={() => { dispatch1({ type: OPEN_ADDRESS }) }}>Thanh toán</Button>
                                                    <Address />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Index