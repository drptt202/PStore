import {
    Dialog,
    DialogHeader,
    DialogBody,
    IconButton,
    Typography,
    MenuItem,
    Input,
} from "@material-tailwind/react";
import { OPEN_ADDRESS, OPEN_CART } from "../../reducers/types";
import { useContext, useState } from "react";
import { CartContext } from "../../Contexts/CartContext";
import { PlusIcon } from "@heroicons/react/24/outline";
import { checkout } from "../../services/ApiService";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const { allItems, address, open1, dispatch1, dispatch } = useContext(CartContext)
    const navigate = useNavigate()
    const [text, setText] = useState('')

    const checkOut = (address) => {
        try {
            for (let i = 0; i < allItems.length; i++) {
                checkout(allItems[i].Item.Code, address)
            }
            toast.success("Đặt hàng thành công")
            navigate('/don-hang?Type=1')
        } catch (err) { console.log(err) }
    }

    return (
        <Dialog size="xs" open={open1} onClose={() => { dispatch1({ type: OPEN_ADDRESS }) }}>
            <DialogHeader className="justify-between">
                <Typography variant="h5" color="blue-gray">
                    Chọn địa chỉ giao hàng
                </Typography>
                <IconButton
                    color="blue-gray"
                    size="sm"
                    variant="text"
                    onClick={() => { dispatch1({ type: OPEN_ADDRESS }) }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </IconButton>
            </DialogHeader>
            <DialogBody className="overflow-y-scroll pr-2">
                <div className="mb-2">
                    <ul className="mt-1 -ml-2 flex flex-col gap-1">
                        {address && address.length > 0 &&
                            address.map((item, index) => (
                                <MenuItem
                                    onClick={() => { checkOut(item); dispatch({ type: OPEN_CART }) }}
                                    key={index} className="flex items-center gap-3">
                                    <Typography color="blue-gray" variant="h6">
                                        {item}
                                    </Typography>
                                </MenuItem>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-semibold opacity-70 mb-2"
                    >
                        Địa chỉ mới
                    </Typography>
                    <Input color="blue" onChange={(e) => setText(e.target.value)}
                        icon={<PlusIcon
                            onClick={() => { checkOut(text); dispatch({ type: OPEN_CART }) }}
                        />} />
                </div>
            </DialogBody>
        </Dialog>
    )
}

export default Index