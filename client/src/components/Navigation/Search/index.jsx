import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { recommendSearch } from "../../../services/ApiService";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const [selected, setSelected] = useState('');
    const [query, setQuery] = useState("");
    const [data, setData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        recommendSearch(query)
            .then(res => {
                setData(res.data.data.products)
            })
            .catch(err => { console.log(err) });
    }, [query])

    return (
        <>
            <div className="flex lg:ml-0 lg:mr-4 lg:mt-0.5">
                <div className="w-full md:w-72">
                    <Combobox value={selected} onChange={setSelected}>
                        <div className="relative mt-1">
                            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                <Combobox.Input
                                    className="w-full border-black text-sm leading-5 text-gray-900 focus:ring-0 rounded-lg"
                                    displayValue={(item) => item.Name}
                                    onChange={(event) => setQuery(event.target.value)}
                                />
                                <Combobox.Button
                                    onClick={() => navigate(`/search?keyword=${query}`)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <MagnifyingGlassIcon className="h-5 w-5" />
                                </Combobox.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQuery("")}
                            >
                                <Combobox.Options className=" absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                                    {data.length === 0 && query === "" ? (
                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        data.map((item) => (
                                            <Combobox.Option
                                                key={item.ProductCode}
                                                onClick={() => navigate(`/${item.Category}/${item.Name}`)}
                                                className={({ active }) =>
                                                    ` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? "bg-teal-600 text-white" : "text-gray-900"
                                                    }`
                                                }
                                                value={item.ProductCode}
                                            >
                                                <div
                                                >
                                                    {item.Name}
                                                </div>
                                                <div
                                                >
                                                    {item.Price} đ
                                                </div>
                                            </Combobox.Option>

                                        ))
                                    )}
                                    <Combobox.Option
                                        key={1}
                                        onClick={() => navigate(`/search?keyword=${query}`)}
                                        className="relative cursor-pointer select-none py-2 pl-10 pr-4"
                                        value={1}
                                    >
                                        {
                                            query &&
                                            <span className="text-indigo-800"
                                            >

                                                Tìm tất cả kết quả với  &quot;{query}&quot;
                                            </span>
                                        }

                                    </Combobox.Option>
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                </div>
            </div>
        </>

    )
}

export default Index