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

const Index = () => {
    const [type, setType] = useState("profile");

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
                                        <Input type="email" label="Email" containerProps={{ className: "mb-4" }} />
                                        <Input label="Họ" containerProps={{ className: "mb-4" }} />
                                        <Input label="Tên" containerProps={{ className: "mb-4" }} />
                                        <Input label="Ngày sinh" type={'date'} containerProps={{ className: "mb-4" }} />
                                        <Input label="Số điện thoại" />
                                    </div>

                                </div>
                                <Button size="lg">Cập nhật</Button>
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
                                        <Input type="password" label="Mật khẩu cũ" containerProps={{ className: "mb-4" }} />
                                        <Input type="password" label="Mật khẩu mới" containerProps={{ className: "mb-4" }} />
                                        <Input type="password" label="Xác nhận mật khẩu" containerProps={{ className: "mb-28" }} />
                                    </div>
                                </div>
                                <Button size="lg">Cập nhật</Button>
                            </form>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </CardBody>
        </Card>
    );
}

export default Index