/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PlusIcon, PencilIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Tooltip,
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    IconButton,
    Chip,
} from "@material-tailwind/react";
import { useContext, useEffect, useReducer, useState } from "react";
import { ProductContext } from "../../../Contexts/ProductContext";
import { addReducer } from "../../../reducers/AddReducer";
import { OPEN_ADD } from './../../../reducers/types';
import AddProduct from "./AddProduct";
import { AddContext } from "../../../Contexts/AddContext";
import { deleteProdcut } from "../../../services/ApiService";
import { toast } from "react-hot-toast";
import axiosCustom from "../../../utils/axiosCustom";


const StoreRender = (props) => {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const { data, type, TABLE_HEAD } = props
    const { store } = useContext(ProductContext)
    const { open, dispatch } = useContext(AddContext)
    const [img, setImg] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [disabled, setDisabled] = useState(false);

    const onClick = () => {
        setDisabled(true);
        setInterval(() => {
            setDisabled(false);
        }, 1000)
    };

    const handleUpdate = (Code, Quantity) => {
        axiosCustom.put(`/admin/store`, {
            Code, Quantity
        }).then(() => { toast.success("Cập nhật thành công") })
            .catch(error => { toast.error(error) })
    }

    const delete1 = (code) => {
        deleteProdcut(code)
            .then(() => toast.success('Xoá thành công'))
            .catch((e) => toast.error(e))
    }

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
    const uploadImg = (code) => {
        axiosCustom.put(`/admin/product/${code}`, {
            Image: img
        }).then(() => { toast.success("Cập nhật ảnh thành công") })
            .catch(error => { toast.error(error) })
    }

    useEffect(() => {
    }, [ignored, type])
    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            {localStorage.getItem('Role')}
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                        </div>
                        {type !== "type=2"
                            &&
                            <>
                                <Button onClick={() => { dispatch({ type: OPEN_ADD }) }} className="flex items-center gap-3" color="blue" size="sm">
                                    <PlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm
                                </Button>
                                <AddProduct />
                            </>
                        }
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0 h-96">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map(
                                (item, index) => {
                                    const isLast = index === data.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={item.Code}>

                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.Brand}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.Category}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.Name}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal capitalize"
                                                        >
                                                            {item.Price}

                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    {type === 'type=1' ?
                                                        <Chip
                                                            size="sm"
                                                            variant="ghost"
                                                            value={store[item.Code] > 0 ? "Còn hàng" : "Hết hàng"}
                                                            color={
                                                                store[item.Code] > 0 ? "green" : "amber"
                                                            }
                                                        /> :
                                                        <Chip
                                                            size="sm"
                                                            variant="ghost"
                                                            value={`${store[item.Code]} sản phẩm`}
                                                            color={
                                                                store[item.Code] > 0 ? "green" : "amber"
                                                            }
                                                        />
                                                    }

                                                </div>
                                            </td>

                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.Code}
                                                </Typography>
                                            </td>
                                            {
                                                type === "type=1" ?
                                                    <td className={classes}>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar
                                                                src={item.Image}
                                                                alt={item.Name}
                                                                size="md"
                                                                className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                            />
                                                            <Menu
                                                                dismiss={{
                                                                    itemPress: false,
                                                                }}
                                                            >
                                                                <MenuHandler>
                                                                    <Button className="flex items-center gap-3" color="blue" size="sm">
                                                                        <PencilIcon strokeWidth={2} className="h-3 w-3" /> Ảnh
                                                                    </Button>
                                                                </MenuHandler>
                                                                <MenuList>
                                                                    <input
                                                                        onChange={convertToBase64}
                                                                        className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="file_input" type="file" />

                                                                    <MenuItem onClick={() => uploadImg(item.Code)}>Xác nhận</MenuItem>
                                                                </MenuList>
                                                            </Menu>
                                                        </div>
                                                    </td>
                                                    :
                                                    <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                                            <input onChange={(e) => setQuantity(e.target.value)} className="w-20 rounded" placeholder="Số lượng" type="number" min={0}></input>
                                                        </Typography>
                                                    </td>
                                            }
                                            <td className={classes}>
                                                {
                                                    type === "type=1"
                                                        ?
                                                        <Tooltip>
                                                            <Menu>
                                                                <MenuHandler>
                                                                    <PencilIcon className="h-4 w-4 cursor-pointer" />
                                                                </MenuHandler>
                                                                <MenuList>
                                                                    <MenuItem>Chỉnh sửa</MenuItem>
                                                                    <MenuItem onClick={() => delete1(item.Code)}>Xoá</MenuItem>
                                                                </MenuList>
                                                            </Menu>
                                                        </Tooltip>
                                                        :
                                                        <Button
                                                            onClick={() => handleUpdate(item.Code, quantity)}
                                                            className="flex items-center gap-3" color="white" size="sm">
                                                            <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" {...props}>
                                                                <path
                                                                    fill="currentColor"
                                                                    fillRule="evenodd"
                                                                    d="M1.903 7.297c0 3.044 2.207 5.118 4.686 5.547a.521.521 0 11-.178 1.027C3.5 13.367.861 10.913.861 7.297c0-1.537.699-2.745 1.515-3.663.585-.658 1.254-1.193 1.792-1.602H2.532a.5.5 0 010-1h3a.5.5 0 01.5.5v3a.5.5 0 01-1 0V2.686l-.001.002c-.572.43-1.27.957-1.875 1.638-.715.804-1.253 1.776-1.253 2.97zm11.108.406c0-3.012-2.16-5.073-4.607-5.533a.521.521 0 11.192-1.024c2.874.54 5.457 2.98 5.457 6.557 0 1.537-.699 2.744-1.515 3.663-.585.658-1.254 1.193-1.792 1.602h1.636a.5.5 0 110 1h-3a.5.5 0 01-.5-.5v-3a.5.5 0 111 0v1.845h.002c.571-.432 1.27-.958 1.874-1.64.715-.803 1.253-1.775 1.253-2.97z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </Button>
                                                }
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                    </tbody>
                </table>
            </CardBody>
        </Card >
    )
}

export default StoreRender