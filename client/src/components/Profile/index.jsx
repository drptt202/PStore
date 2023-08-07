import { useContext, useState } from "react";
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
    TabPanel
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axiosCustom from "../../utils/axiosCustom";
import { toast } from "react-hot-toast";
import Navigation from '../Navigation'
import Footer from '../Footer'
import { ProfileContext } from './../../Contexts/ProfileContext';

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
        <>
            <Navigation />
            <Card className="w-full max-w-[24rem] mx-auto">
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
                        </TabsHeader>
                        <TabsBody
                            className="!overflow-x-hidden !overflow-y-visible "
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
                                                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="email" placeholder={profileData.Email} onChange={(e) => setEmail(e.target.value)} />
                                            </label>
                                            <label>
                                                <span className="float-left">
                                                    Họ:
                                                </span>
                                                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder={profileData.FirstName} onChange={(e) => setFirstName(e.target.value)} />
                                            </label>
                                            <label>
                                                <span className="float-left">
                                                    Tên:
                                                </span>
                                                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder={profileData.LastName} onChange={(e) => setLastName(e.target.value)} />
                                            </label>
                                            <label>
                                                <span className="float-left">
                                                    Ngày sinh:
                                                </span>
                                                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder={profileData.DateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                                            </label>
                                            <label>
                                                <span className="float-left">
                                                    SDT:
                                                </span>
                                                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder={profileData.Phone} onChange={(e) => setPhone(e.target.value)} />
                                            </label>
                                            <label>
                                                <span className="float-left">
                                                    CMND:
                                                </span>
                                                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder={profileData.ID} onChange={(e) => setID(e.target.value)} />
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
                                            <Input type="password" label="Mật khẩu cũ" onChange={(e) => setOldPassword(e.target.value)} containerProps={{ className: "mt-14 mb-4" }} />
                                            <Input type="password" label="Mật khẩu mới" onChange={(e) => setNewPassword(e.target.value)} containerProps={{ className: "mb-4" }} />
                                            <Input type="password" label="Xác nhận mật khẩu" onChange={(e) => setPassword2(e.target.value)} containerProps={{ className: "mb-[128px]" }} />
                                        </div>
                                    </div>
                                    <Button onClick={handleChange} size="lg">Cập nhật</Button>
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