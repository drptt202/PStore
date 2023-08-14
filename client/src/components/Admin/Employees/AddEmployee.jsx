import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { OPEN_ADD } from "../../../reducers/types";
import { useContext, useState } from "react";
import { AddContext } from "../../../Contexts/AddContext";
import axiosCustom from "../../../utils/axiosCustom";
import { toast } from 'react-hot-toast';

const AddEmployee = () => {
    const { open2, dispatch2 } = useContext(AddContext)
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('Employee')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const handleSubmit = () => {
        try {
            if (password2 === password) {
                axiosCustom.post('/admin/register', {
                    Password: password,
                    Role: role,
                    FirstName: firstName,
                    LastName: lastName,
                    DateOfBirth: dateOfBirth,
                    Phone: phone,
                    Email: email,
                    Status: true
                })
            } else {
                toast.error('Sai mật khẩu')
            }
            toast.success('Thêm thành công')

        } catch (e) { toast.error(e) }
    }


    return (
        <Dialog open={open2} handler={() => dispatch2({ type: OPEN_ADD })}>
            <DialogHeader>Thêm nhân viên</DialogHeader>
            <DialogBody>
                <form className="flex flex-col gap-4">
                    <div>

                        Chức vụ:
                        <Select defaultValue={'Employee'} label="Chọn" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" color="blue">
                            <Option value={'Employee'} onClick={() => setRole('Employee')}>Nhân viên</Option>
                            <Option value={'Admin'} onClick={() => setRole('Admin')}>Admin</Option>
                        </Select>

                        <Input label='Email' onChange={(e) => setEmail(e.target.value)} className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type={'email'} />

                        <Input label='Mật khẩu' onChange={(e) => setPassword(e.target.value)} className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type={'password'} />

                        <Input label='Xác nhận mật khẩu' onChange={(e) => setPassword2(e.target.value)} className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type={'password'} />

                        <Input label='Họ' onChange={(e) => setFirstName(e.target.value)} className="block mt-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <Input label='Tên' onChange={(e) => setLastName(e.target.value)} className="block mt-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <Input label='Ngày sinh' onChange={(e) => setDateOfBirth(e.target.value)} className="block mt-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <Input label='Số điện thoại' onChange={(e) => setPhone(e.target.value)} className="block mt-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                    </div>
                </form>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => dispatch2({ type: OPEN_ADD })}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={() => { dispatch2({ type: OPEN_ADD }); handleSubmit() }}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default AddEmployee