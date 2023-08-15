import { useContext, useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Input,
    Button,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    List,
    ListItem,
    ListItemSuffix,
    IconButton
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axiosCustom from "../../utils/axiosCustom";
import { toast } from "react-hot-toast";
import Navigation from '../Navigation'
import Footer from '../Footer'
import { ProfileContext } from './../../Contexts/ProfileContext';
const TrashIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
        >
            <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Index = () => {
    const [type, setType] = useState("profile");
    const { profileData } = useContext(ProfileContext)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [ID, setID] = useState('')
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [DateOfBirth, setDateOfBirth] = useState('')
    const [Phone, setPhone] = useState('')
    const [Email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setID(profileData.ID)
        setFirstName(profileData.FirstName)
        setLastName(profileData.LastName)
        setDateOfBirth(profileData.DateOfBirth)
        setPhone(profileData.Phone)
        setEmail(profileData.Email)
    }, [profileData])

    const handleChange = () => {
        if (password2 == newPassword) {
            axiosCustom.put('/auth/password', {
                oldPassword: oldPassword,
                newPassword: newPassword
            })
                .then(() => {
                    toast.success('Đổi mật khẩu thành công')
                })
                .catch(err => {
                    console.log(err)
                })
            navigate('/')
        } else {
            toast.error('Mật khẩu xác nhận không khớp')
        }
    }

    const handleUpdate = () => {
        axiosCustom.put('/auth/edit', {
            ID: ID,
            FirstName: FirstName,
            LastName: LastName,
            DateOfBirth: DateOfBirth,
            Phone: Phone,
            Email: Email
        })
            .then(() => {
                toast.success('Cập nhật thông tin thành công')
            })
            .catch(err => {
                console.log(err)
            })
        navigate('/')
    }
    console.log('profileData :>> ', profileData);
    return (
        <>
            <Navigation />
            <Card className="w-full max-w-[40rem] mx-auto">
                <br />
                <CardBody>
                    <Tabs value={type} className="overflow-visible ">
                        <TabsHeader className="relative z-0 bg-amber-400">
                            <Tab value="profile" onClick={() => setType("password")}>
                                Cập nhật thông tin
                            </Tab>
                            <Tab value="password" onClick={() => setType("profile")}>
                                Đổi mật khẩu
                            </Tab>
                            <Tab value="address" onClick={() => setType("address")}>
                                Thêm địa chỉ
                            </Tab>
                        </TabsHeader>
                        <TabsBody
                            className="!overflow-x-hidden !overflow-y-visible m-auto h-[34rem] max-w-[24rem] "
                            animate={{
                                initial: {
                                    x: type === "profile" ? 400 : -400,
                                },
                                mount: {
                                    x: 0,
                                },
                                unmount: {
                                    x: type === "profile" ? 400 : -400,
                                },
                            }}
                        >
                            <TabPanel value="profile" className="p-0">
                                <form className="mt-12 flex flex-col gap-4 mb-">
                                    <div>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mb-4 font-medium"
                                        >
                                            Thông tin tài khoản
                                        </Typography>
                                        <div>
                                            <label>
                                                <span className="float-left">
                                                    Email:
                                                </span>
                                                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                                            </label>
                                            <label>
                                                <span className="float-left">
                                                    Họ:
                                                </span>
                                                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
                                            </label>
                                            <label>
                                                <span className="float-left">
                                                    Tên:
                                                </span>
                                                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={LastName} onChange={(e) => setLastName(e.target.value)} />
                                            </label>
                                            <label>
                                                <span className="float-left">
                                                    Ngày sinh:
                                                </span>
                                                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={DateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                                            </label>
                                            <label>
                                                <span className="float-left">
                                                    SDT:
                                                </span>
                                                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={Phone} onChange={(e) => setPhone(e.target.value)} />
                                            </label>
                                            <label>
                                                <span className="float-left">
                                                    CMND:
                                                </span>
                                                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={ID} onChange={(e) => setID(e.target.value)} />
                                            </label>
                                        </div>

                                    </div>
                                    <Button onClick={handleUpdate} size="lg">Cập nhật</Button>
                                </form>
                            </TabPanel>
                            <TabPanel value="password" className="p-0">
                                <form className="mt-12 flex flex-col gap-4">
                                    <div>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mb-12 font-medium"
                                        >
                                            Đổi mật khẩu
                                        </Typography>
                                        <div>
                                            <Input type="password" label="Mật khẩu cũ" onChange={(e) => setOldPassword(e.target.value)} containerProps={{ className: "mt-[60px] mb-4" }} />
                                            <Input type="password" label="Mật khẩu mới" onChange={(e) => setNewPassword(e.target.value)} containerProps={{ className: "mb-4" }} />
                                            <Input type="password" label="Xác nhận mật khẩu" onChange={(e) => setPassword2(e.target.value)} containerProps={{ className: "mb-[11rem]" }} />
                                        </div>
                                    </div>
                                    <Button onClick={handleChange} size="lg">Cập nhật</Button>
                                </form>
                            </TabPanel>
                            <TabPanel value="address" className="p-0">
                                <form className="mt-12 flex flex-col gap-4">
                                    <div>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mb-12 font-medium"
                                        >
                                            Danh sách địa chỉ
                                        </Typography>
                                        <Card className="w-96">
                                            <List>
                                                <ListItem ripple={false} className="py-1 pr-1 pl-4">
                                                    Item One
                                                    <ListItemSuffix>
                                                        <IconButton variant="text" color="blue-gray">
                                                            <TrashIcon />
                                                        </IconButton>
                                                    </ListItemSuffix>
                                                </ListItem>
                                                <ListItem ripple={false} className="py-1 pr-1 pl-4">
                                                    Item Two
                                                    <ListItemSuffix>
                                                        <IconButton variant="text" color="blue-gray">
                                                            <TrashIcon />
                                                        </IconButton>
                                                    </ListItemSuffix>
                                                </ListItem>
                                                <ListItem ripple={false} className="py-1 pr-1 pl-4">
                                                    Item Three
                                                    <ListItemSuffix>
                                                        <IconButton variant="text" color="blue-gray">
                                                            <TrashIcon />
                                                        </IconButton>
                                                    </ListItemSuffix>
                                                </ListItem>
                                            </List>
                                        </Card>
                                    </div>
                                    <div>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mt-4 mb-4 font-medium"
                                        >
                                            Thêm địa chỉ
                                        </Typography>
                                        <div className="relative flex w-full max-w-[24rem]">
                                            <Input
                                                type="text"
                                                label="Address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="pr-20"
                                                containerProps={{
                                                    className: "min-w-0",
                                                }}
                                            />
                                            <Button
                                                size="sm"
                                                color={address ? "blue" : "blue-gray"}
                                                disabled={!address}
                                                className="!absolute right-1 top-1 rounded"
                                            >
                                                Thêm
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </CardBody>
            </Card>
            <Footer />
        </>
    );
}

export default Index