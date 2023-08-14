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
} from "@material-tailwind/react";
import { useContext, useEffect, useReducer } from "react";
import AddEmployee from "./AddEmployee";
import { OPEN_ADD, OPEN_EDIT } from "../../../reducers/types";
import { AddContext } from "../../../Contexts/AddContext";
import axiosCustom from "../../../utils/axiosCustom";
import { toast } from "react-hot-toast";
import { role } from "../../../store/store";
import { EditContext } from "../../../Contexts/EditContext";
import EditEmployee from "./EditEmployee";


const EmployeesRender = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    // eslint-disable-next-line react/prop-types
    const { data, type, TABLE_HEAD } = props
    const { dispatch2 } = useContext(AddContext)
    const { editDispatch2 } = useContext(EditContext)


    const changeStatus = () => {
        axiosCustom.post('/admin/edit')
            .then(() => { toast.success("Cập nhật thành công") })
            .catch(err => { toast.error(err) });
    }


    useEffect(() => {
    }, [ignored, type])
    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            {role}
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                        </div>
                        <Button onClick={() => { dispatch2({ type: OPEN_ADD }) }} className="flex items-center gap-3" color="blue" size="sm">
                            <PlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm
                        </Button>
                        <AddEmployee />
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
                                        <tr key={item.Email}>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.Email}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.FirstName}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.LastName}
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
                                                            {item.DateOfBirth}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    {item.Phone}

                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.Role}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.Status.toString()}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip>
                                                    <Menu dismiss={{
                                                        itemPress: false,
                                                    }}>
                                                        <MenuHandler>
                                                            <PencilIcon className="h-4 w-4 cursor-pointer" />
                                                        </MenuHandler>
                                                        <MenuList>
                                                            <MenuItem onClick={() => { editDispatch2({ type: OPEN_EDIT }) }}>Chỉnh sửa</MenuItem>
                                                            <EditEmployee data={item} />
                                                            <MenuItem onClick={changeStatus}>Đổi trạng thái</MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </Tooltip>
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

export default EmployeesRender