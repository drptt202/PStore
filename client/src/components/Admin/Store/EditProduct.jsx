/* eslint-disable react/prop-types */
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Option,
    Select,
} from "@material-tailwind/react";
import { OPEN_EDIT } from "../../../reducers/types";
import { useContext, useEffect, useState } from "react";
import { EditContext } from "../../../Contexts/EditContext";
import axiosCustom from "../../../utils/axiosCustom";
import { toast } from 'react-hot-toast';

const EditProduct = (props) => {
    const { data } = props;
    const { openEdit, editDispatch } = useContext(EditContext)
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [cpu, setCPU] = useState("")
    const [ram, setRAM] = useState("")
    const [disk, setDISK] = useState("")
    const [release, setRelease] = useState("")
    const [code, setCode] = useState("")
    const [decription, setDecription] = useState("")

    useEffect(() => {
        setBrand(data.Brand)
        setCategory(data.Category)
        setName(data.Name)
        setPrice(data.Price)
        setCPU(data.CPU)
        setRAM(data.RAM)
        setDISK(data.DISK)
        setRelease(data.Release)
        setCode(data.Code)
        setDecription(data.Decription)
    }, [])

    const handleSubmit = () => {
        try {
            axiosCustom.post(`/admin/product/${data._id}`, {
                Brand: brand,
                Category: category,
                Name: name,
                Price: price,
                CPU: cpu,
                RAM: ram,
                DISK: disk,
                Release: release,
                Code: code,
                Decription: decription
            })
            toast.success('Cập nhật thành công')
        } catch (e) { toast.error(e) }
    }

    return (
        <Dialog open={openEdit} handler={() => editDispatch({ type: OPEN_EDIT })}>
            <DialogHeader>Cập nhật thông tin</DialogHeader>
            <DialogBody>
                <form className="flex flex-col gap-4">
                    <div>
                        Loại: {category}
                        <Select defaultValue={category} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" color="blue">
                            <Option onClick={() => setCategory('console')}>Máy chơi game</Option>
                            <Option onClick={() => setCategory('game')}>Game</Option>
                            <Option onClick={() => setCategory('pad')}>Thiết bị chơi game</Option>
                        </Select>
                        <div className="my-4 flex items-center gap-4">
                            <Input label='Mã sản phẩm' value={code} onChange={(e) => setCode(e.target.value)} className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <Input label='Release' value={release} onChange={(e) => setRelease(e.target.value)} className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="number" min={0} />
                        </div>

                        <Input label='Hãng' value={brand} onChange={(e) => setBrand(e.target.value)} className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <Input label='Tên' value={name} onChange={(e) => setName(e.target.value)} className="block mt-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <Input label='CPU' value={cpu} onChange={(e) => setCPU(e.target.value)} className="block mt-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        <div className="my-4 flex items-center gap-4">
                            <Input label='DISK' value={disk} onChange={(e) => setDISK(e.target.value)} className=" rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <Input label='RAM' value={ram} onChange={(e) => setRAM(e.target.value)} className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <Input value={price} label='Giá' onChange={(e) => setPrice(e.target.value)} className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="number" min={0} />

                        Mô tả:
                        <Input value={decription} type={'text'} onChange={(e) => setDecription(e.target.value)} className=" h-[40px] w-full block break-words rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                    </div>
                </form>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => editDispatch({ type: OPEN_EDIT })}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={() => { editDispatch({ type: OPEN_EDIT }); handleSubmit() }}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default EditProduct