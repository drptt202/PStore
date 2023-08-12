import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { OPEN_ADD } from "../../../reducers/types";
import { useContext, useState } from "react";
import { AddContext } from "../../../Contexts/AddContext";
import axiosCustom from "../../../utils/axiosCustom";
import { toast } from 'react-hot-toast';

const AddProduct = () => {
    const { open, dispatch } = useContext(AddContext)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('console')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [cpu, setCPU] = useState('')
    const [ram, setRAM] = useState('')
    const [disk, setDISK] = useState('')
    const [release, setRelease] = useState('')
    const [code, setCode] = useState('')
    const [decription, setDecription] = useState('')
    const [quantity, setQuantity] = useState('')
    const [img, setImg] = useState('')

    const convertToBase64 = (e) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setImg(reader.result)
        }
        reader.onerror = error => {
            console.log('error :>> ', error);
        }
    }

    const handleSubmit = () => {
        try {
            axiosCustom.post('/admin/product', {
                Brand: brand,
                Category: category,
                Name: name,
                Price: price,
                CPU: cpu,
                RAM: ram,
                DISK: disk,
                Release: release,
                Code: code,
                Image: img,
                Dicription: decription
            })
            axiosCustom.post('/admin/store', {
                Code: code,
                Quantity: quantity,
            })
            toast.success('Thêm thành công')
        } catch (e) { toast.error(e) }
    }


    return (
        <Dialog open={open} handler={() => dispatch({ type: OPEN_ADD })}>
            <DialogHeader>Thêm sản phẩm</DialogHeader>
            <DialogBody>
                <form className="flex flex-col gap-4">
                    <div>
                        <div>
                            <label>
                                <span className="float-left">
                                    Loại:
                                </span>
                                <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" color="blue" label="Select Version">
                                    <option onClick={() => setCategory('console')}>Máy chơi game</option>
                                    <option onClick={() => setCategory('game')}>Game</option>
                                    <option onClick={() => setCategory('pad')}>Thiết bị chơi game</option>
                                </select>
                            </label>
                            <div className="my-4 flex items-center gap-4">
                                <Input label='Mã sản phẩm' onChange={(e) => setCode(e.target.value)} className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <Input label='Release' onChange={(e) => setRelease(e.target.value)} className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="number" min={0} />
                            </div>

                            <Input label='Hãng' onChange={(e) => setBrand(e.target.value)} className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                            <Input label='Tên' onChange={(e) => setName(e.target.value)} className="block mt-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                            <Input label='CPU' onChange={(e) => setCPU(e.target.value)} className="block mt-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <div className="my-4 flex items-center gap-4">
                                <Input label='DISK' onChange={(e) => setDISK(e.target.value)} className=" rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <Input label='RAM' onChange={(e) => setRAM(e.target.value)} className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            <div className="my-4 flex items-center gap-4">
                                <Input label='Giá' onChange={(e) => setPrice(e.target.value)} className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="number" min={0} />
                                <Input label='Số lượng' onChange={(e) => setQuantity(e.target.value)} className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="number" min={0} />
                            </div>


                            <input
                                onChange={convertToBase64}
                                className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="file_input" type="file" />

                            <label>
                                <span className="float-left">
                                    Mô tả:
                                </span>
                                <textarea onChange={(e) => setDecription(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </label>
                        </div>
                    </div>
                </form>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => dispatch({ type: OPEN_ADD })}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={() => { dispatch({ type: OPEN_ADD }); handleSubmit() }}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default AddProduct