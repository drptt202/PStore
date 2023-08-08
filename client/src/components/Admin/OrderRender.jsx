import { PencilIcon, MagnifyingGlassIcon, ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";
import { useEffect, useReducer, useState } from "react";
import { add1ToCart, deleteType, getOrder } from "../../services/ApiService";
import { toast } from "react-hot-toast";

const TABLE_HEAD = ["Sản phẩm", "Giá", "Số lượng", "Ngày đặt", "Trạng thái", "Thanh toán", "Tổng cộng", ""];

const OrderRender = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    // eslint-disable-next-line react/prop-types
    const { type } = props
    const [data, setData] = useState([])
    const [allItems, setAllItems] = useState([])

    const [num, setNum] = useState({})
    const [disabled, setDisabled] = useState(false);


    const addToCart = (Code) => {
        add1ToCart(Code)
            .then(() => {
                toast('Đã thêm vào giỏ hàng', {
                    duration: 2000,
                    position: 'top-center',
                    className: 'bg-amber-700 w-80',
                    icon: '✅',
                    ariaProps: {
                        role: 'status',
                        'aria-live': 'polite',
                    },
                });
            }).catch(err => console.log(err))
    }

    const onClick = () => {
        setDisabled(true);
        setInterval(() => {
            setDisabled(false);
        }, 1000)
    };

    useEffect(() => {
        getOrder(type)
            .then(res => {
                setData(res.data.data.carts)
                setNum(res.data.data.count)
                setAllItems(res.data.data.result)
            })
    }, [ignored, type])
    const deleteOrder = (Code) => {
        try {
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].Code === Code) {
                    deleteType(Code)
                }
            }
            toast('Huỷ đơn hàng thành công', {
                duration: 2000,
                position: 'top-center',
                className: 'bg-amber-700 w-80',
                icon: '✅',
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                }
            })
        } catch (err) { console.log(err) }

    }
    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                        </div>
                        <Button className="flex items-center gap-3" color="blue" size="sm">
                            <PencilIcon strokeWidth={2} className="h-4 w-4" /> Chỉnh sửa
                        </Button>
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
                        {data.map(
                            (item, index) => {
                                const isLast = index === data.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={item.Code}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src={item.Image}
                                                    alt={item.Name}
                                                    size="md"
                                                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                />
                                                <Typography variant="small" color="blue-gray" className="font-bold">
                                                    {item.Name}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {item.Price} đ
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {num[item.Code]}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                ----------
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={type === "type=3" ? "Đã giao" : type === "type=1" ? "Chờ xác nhận" : type === 'type=2' ? "Đang giao hàng" : "Đã huỷ"}
                                                    color={
                                                        type === "type=3" ? "green" : type === "type=1" ? "amber" : type === 'type=2' ? "blue" : "red"
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal capitalize"
                                                    >
                                                        Khi nhận hàng
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {num[item.Code] * item.Price} đ
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            {
                                                type === "type=1"
                                                    ?
                                                    <Tooltip>
                                                        <IconButton variant="text" color="blue-gray" disabled={disabled} content="Huỷ" onClick={() => { deleteOrder(item.Code); onClick() }}>
                                                            <TrashIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    : <Tooltip>
                                                        <IconButton variant="text" color="blue-gray" disabled={disabled} content="Mua lại" onClick={() => { addToCart(item.Code); onClick() }} >
                                                            <ShoppingBagIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                            }


                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    )
}

export default OrderRender