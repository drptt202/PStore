import { PencilIcon, MagnifyingGlassIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
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
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { useContext, useEffect, useReducer, useState } from "react";
import { ProductContext } from "../../Contexts/ProductContext";


const StoreRender = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    // eslint-disable-next-line react/prop-types
    const { type } = props

    // const TABLE_HEAD = type === "type=3"
    //     ? ["Email", "Họ", "Tên", "Ngày sinh", "Số điện thoại", "Chức vụ", ""]
    //     : ["Hãng", "Loại", "Tên", "Giá", type === "type=1" ? "Trạng thái" : "Số lượng", "Mã sản phẩm", "Ảnh", ""]
    const TABLE_HEAD = ["Hãng", "Loại", "Tên", "Giá", type === "type=1" ? "Trạng thái" : "Số lượng", "Mã sản phẩm", "Ảnh", "Cập nhật"]

    const { products, store } = useContext(ProductContext)
    const [disabled, setDisabled] = useState(false);


    const onClick = () => {
        setDisabled(true);
        setInterval(() => {
            setDisabled(false);
        }, 1000)
    };

    useEffect(() => {
    }, [ignored, type])
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
                        {products.map(
                            (item, index) => {
                                const isLast = index === products.length - 1;
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
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={store[item.Code] > 0 ? "Còn hàng" : "Hết hàng"}
                                                    color={
                                                        store[item.Code] > 0 ? "green" : "amber"
                                                    }
                                                />
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {item.Code}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src={item.Image}
                                                    alt={item.Name}
                                                    size="md"
                                                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                />
                                                <Button className="flex items-center gap-3" color="blue" size="sm">
                                                    <PencilIcon strokeWidth={2} className="h-3 w-3" /> Ảnh
                                                </Button>
                                            </div>
                                        </td>
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
                                                                <MenuItem>Còn hàng</MenuItem>
                                                                <MenuItem>Hết hàng</MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                    </Tooltip>
                                                    : <Tooltip>
                                                        <IconButton variant="text" color="blue-gray" disabled={disabled} content="Mua lại" onClick={() => { onClick() }} >
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

export default StoreRender