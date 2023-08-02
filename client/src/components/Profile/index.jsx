import { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel
} from "@material-tailwind/react";
import {
    UserIcon
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axiosCustom from "../../utils/axiosCustom";
import { toast } from "react-hot-toast";

const Index = () => {
    const [type, setType] = useState("profile");
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [ID, setID] = useState('')
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [DateOfBirth, setDateOfBirth] = useState('')
    const [Phone, setPhone] = useState('')
    const [Email, setEmail] = useState('')
    const navigate = useNavigate()

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
    return (
        <Card className="w-full max-w-[24rem] mx-auto">
            <br />
            <CardHeader
                floated={false}
                shadow={false}
                className="m-0 grid place-items-center rounded-b-none py-6 px-4 text-center bg-amber-400"
            >
                <div className="mb-4 rounded-full border border-white/50 bg-white/10 p-6 text-white">
                    <UserIcon className="h-10 w-10" />
                </div>
            </CardHeader>
            <CardBody>
                <Tabs value={type} className="overflow-visible">
                    <TabsHeader className="relative z-0 ">
                        <Tab value="profile" onClick={() => setType("password")}>
                            Cập nhật thông tin
                        </Tab>
                        <Tab value="password" onClick={() => setType("profile")}>
                            Đổi mật khẩu
                        </Tab>
                    </TabsHeader>
                    <TabsBody
                        className="!overflow-x-hidden !overflow-y-visible"
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
                                        <Input type="email" label="Email" onChange={(e) => setEmail(e.target.value)} containerProps={{ className: "mb-4" }} />
                                        <Input label="Họ" onChange={(e) => setFirstName(e.target.value)} containerProps={{ className: "mb-4" }} />
                                        <Input label="Tên" onChange={(e) => setLastName(e.target.value)} containerProps={{ className: "mb-4" }} />
                                        <Input label="Ngày sinh" onChange={(e) => setDateOfBirth(e.target.value)} type={'date'} containerProps={{ className: "mb-4" }} />
                                        <Input label="Số điện thoại" onChange={(e) => setPhone(e.target.value)} containerProps={{ className: "mb-4" }} />
                                        <Input label="CMND" onChange={(e) => setID(e.target.value)} />
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
                                        className="mb-4 font-medium"
                                    >
                                        Đổi mật khẩu
                                    </Typography>
                                    <div>
                                        <Input type="password" label="Mật khẩu cũ" onChange={(e) => setOldPassword(e.target.value)} containerProps={{ className: "mb-4" }} />
                                        <Input type="password" label="Mật khẩu mới" onChange={(e) => setNewPassword(e.target.value)} containerProps={{ className: "mb-4" }} />
                                        <Input type="password" label="Xác nhận mật khẩu" onChange={(e) => setPassword2(e.target.value)} containerProps={{ className: "mb-28" }} />
                                    </div>
                                </div>
                                <Button onClick={handleChange} size="lg">Cập nhật</Button>
                            </form>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </CardBody>
        </Card>
    );
}

export default Index