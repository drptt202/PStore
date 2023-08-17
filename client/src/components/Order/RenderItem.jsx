import { TrashIcon } from "@heroicons/react/24/solid";
import {
    Card,
    Typography,
    CardBody,
    Chip,
    Avatar,
    IconButton,
    Tooltip
} from "@material-tailwind/react";
import { useContext, useEffect, useReducer, useState } from "react";
import { deleteType, getOrder } from "../../services/ApiService";
import { toast } from "react-hot-toast";
import axiosCustom from "../../utils/axiosCustom";
import { ProfileContext } from "../../Contexts/ProfileContext";
import RatingProduct from "./Rating";
import { CommentContext } from "../../Contexts/CommentContext";
import { OPEN_COMMENT } from "../../reducers/types";


const RenderItem = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const { dispatch } = useContext(CommentContext)
    // eslint-disable-next-line react/prop-types
    const { type } = props
    const TABLE_HEAD = ["Sản phẩm", "Giá", "Số lượng", type === "type=1" ? "Ngày đặt" : type === "type=2" ? "Ngày rời kho" : type === "type=3" ? "Ngày nhận hàng" : "Ngày huỷ", "Trạng thái", "Thanh toán", "Tổng cộng", type === "type=1" ? "Huỷ" : type === "type=2" ? "Đã nhận" : "Đánh giá"];
    const [data, setData] = useState([])
    const [allItems, setAllItems] = useState([])

    const [num, setNum] = useState({})
    const [disabled, setDisabled] = useState(false);
    const { Username } = useContext(ProfileContext)

    console.log('Username :>> ', Username);

    const success = async (itemID, OrderDate, AcceptDate, Address, check) => {
        try {
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].Item.Code === itemID) {
                    await axiosCustom.post('/admin/order/success',
                        { User: Username, itemID, OrderDate, AcceptDate, Address, check }
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
    const deleteOrder = (Code, OrderDate, Address) => {
        try {
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].Item.Code === Code) {
                    deleteType(Code, OrderDate, Address)
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
                                                {num[item.Item.Code]}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {type === "type=1" ? item.OrderDate : type === 'type=2' ? item.AcceptDate : type === "type=3" ? item.Date : item.CancelledDate}
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
                                                {num[item.Item.Code] * item.Item.Price} đ
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            {
                                                type === "type=1"
                                                &&
                                                <Tooltip>
                                                    <IconButton variant="text" color="blue-gray" disabled={disabled} content="Huỷ" onClick={() => { deleteOrder(item.Item.Code, item.OrderDate, item.Address); onClick() }}>
                                                        <TrashIcon className="h-5 w-5" />
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                            {
                                                type === "type=2"
                                                &&
                                                <Tooltip>
                                                    <IconButton variant="text" color="blue-gray" disabled={disabled} content="Đã nhận hàng" onClick={() => { success(item.Item.Code, item.OrderDate, item.AcceptDate, item.Address, true); onClick() }} >
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            height="2em"
                                                            width="2em"
                                                        >
                                                            <path d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5m1.5-9H17V12h4.46L19.5 9.5M6 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5M20 8l3 4v5h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H9c0 1.66-1.34 3-3 3s-3-1.34-3-3H1V6c0-1.11.89-2 2-2h14v4h3M3 6v9h.76c.55-.61 1.35-1 2.24-1 .89 0 1.69.39 2.24 1H15V6H3m2 4.5L6.5 9 8 10.5 11.5 7 13 8.5l-5 5-3-3z" />
                                                        </svg>
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                            {
                                                type === "type=3" && item.Rating.length === 0
                                                &&
                                                <>
                                                    <Tooltip>
                                                        <IconButton variant="text" color="blue-gray" disabled={disabled} content="Đánh giá" onClick={() => { onClick(); dispatch({ type: OPEN_COMMENT }) }} >
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                height="2em"
                                                                width="2em"
                                                            >
                                                                <path d="M16.23 18L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18M12 2C6.47 2 2 6.5 2 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" />
                                                            </svg>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <RatingProduct item={item} />
                                                </>
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

export default RenderItem