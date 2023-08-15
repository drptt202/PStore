/* eslint-disable react/prop-types */
import { PencilIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,
    Avatar,
    IconButton,
    Tooltip,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { useEffect, useReducer, useState } from "react";
import { getOrderbyAdmin } from "../../../services/ApiService";
import { toast } from "react-hot-toast";
import axiosCustom from "../../../utils/axiosCustom";

// const TABLE_HEAD = ["Sản phẩm", "Giá", "Số lượng", "Ngày đặt", "Tài khoản", "Trạng thái", "Thanh toán", "Tổng cộng", ""];

const OrderRender = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    // eslint-disable-next-line react/prop-types
    const { type, TABLE_HEAD } = props
    const [data, setData] = useState([])
    const [allItems, setAllItems] = useState([])
    const [disabled, setDisabled] = useState(false);

    const onClick = () => {
        setDisabled(true);
        setInterval(() => {
            setDisabled(false);
        }, 500)
    };

    const success = async (itemID, User, OrderDate, AcceptDate, Address) => {
        try {
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].Item.Code === itemID && allItems[i].Username === User) {
                    await axiosCustom.post('/admin/order/success',
                        { User, itemID, OrderDate, AcceptDate, Address }
                    ).then((res) => { console.log(res.status) })
                        .catch((err) => { console.log(err) })
                }
            }
            toast('Hoàn thành đơn hàng', {
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


    const fail = async (itemID, User, OrderDate, AcceptDate, Address) => {
        try {
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].Item.Code === itemID && allItems[i].Username === User) {
                    await axiosCustom.post('/admin/order/fail',
                        { User, itemID, OrderDate, AcceptDate, Address }
                    ).then((res) => { console.log(res.status) })
                        .catch((err) => { console.log(err) })
                }
            }
            toast('Huỷ đơn hàng của khách', {
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


    useEffect(() => {
        getOrderbyAdmin(type)
            .then(res => {
                setData(res.data.data.carts)
                setAllItems(res.data.data.result)
            })
    }, [ignored, type])
    const acceptOrder1 = async (Code, User, OrderDate, Address) => {
        try {
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].Item.Code === Code && allItems[i].Username === User) {
                    await axiosCustom.post('/admin/order/accept',
                        { User, itemID: Code, OrderDate, Address }
                    ).then((res) => { console.log(res.status) })
                        .catch((err) => { console.log(err) })
                }
            }
            toast('Xác nhận đơn hàng thành công', {
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
                        <Typography variant="h5" color="blue-gray">
                            {localStorage.getItem('Role')}
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
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
                                    <tr key={item.Item.Code}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src={item.Item.Image}
                                                    alt={item.Item.Name}
                                                    size="md"
                                                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                />
                                                <Typography variant="small" color="blue-gray" className="font-bold">
                                                    {item.Item.Name}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {item.Item.Price} đ
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {item.Count}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {item.OrderDate}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            {
                                                type === "type=5" &&
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.AcceptDate}
                                                </Typography>
                                            }
                                            {
                                                type === "type=6" &&
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.AcceptDate}
                                                </Typography>
                                            }
                                            {
                                                type === "type=7" &&
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.AcceptDate}
                                                </Typography>
                                            }
                                        </td>
                                        <td className={classes}>
                                            {
                                                type === "type=6" &&
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.Date}
                                                </Typography>
                                            }
                                            {
                                                type === "type=7" &&
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.CancelledDate}
                                                </Typography>
                                            }
                                        </td>

                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {item.Username}
                                            </Typography>
                                        </td>
                                        {
                                            type === "type=5" &&
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.Employee}
                                                </Typography>
                                            </td>
                                        }

                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={type === "type=4" ? "Chờ xác nhận" : type === "type=5" ? "Đang giao hàng" : item && `${item.Employee}`}
                                                    color={
                                                        type === "type=6" ? "green" : type === "type=4" ? "amber" : type === 'type=5' ? "blue" : "red"
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
                                                {item.Count * item.Item.Price} đ
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            {
                                                type === "type=5"
                                                &&
                                                <Tooltip>
                                                    <Menu>
                                                        <MenuHandler>
                                                            <PencilIcon className="h-4 w-4 cursor-pointer" />
                                                        </MenuHandler>
                                                        <MenuList>
                                                            <MenuItem onClick={() => success(item.Item.Code, item.Username, item.OrderDate, item.AcceptDate, item.Address)}>Giao thành công</MenuItem>
                                                            <MenuItem onClick={() => fail(item.Item.Code, item.Username, item.OrderDate, item.AcceptDate, item.Address)}>Giao thất bại</MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </Tooltip>
                                            }
                                            {
                                                type === "type=4"
                                                &&
                                                <Tooltip>
                                                    <IconButton variant="text" color="green" disabled={disabled} onClick={() => { acceptOrder1(item.Item.Code, item.Username, item.OrderDate, item.Address); onClick() }}>
                                                        <svg
                                                            viewBox="0 0 1024 1024"
                                                            fill="currentColor"
                                                            height="2em"
                                                            width="2em"
                                                        >
                                                            <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                                                        </svg>
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