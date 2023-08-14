/* eslint-disable react/prop-types */

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
import { OPEN_EDIT } from "../../../reducers/types";
import { useContext, useEffect, useState } from "react";
import axiosCustom from "../../../utils/axiosCustom";
import { toast } from 'react-hot-toast';
import { EditContext } from "../../../Contexts/EditContext";

const EditEmployee = (props) => {
    const { data } = props;
    const { openEdit2, editDispatch2 } = useContext(EditContext)
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        setEmail(data.Email)
        setRole(data.Role)
        setFirstName(data.FirstName)
        setLastName(data.LastName)
        setDateOfBirth(data.DateOfBirth)
        setPhone(data.Phone)
        setId(data._id)
    }, [])

    console.log('data:>> ', firstName);


    const handleSubmit = () => {
        if (password2 === password) {
            axiosCustom.post(`/admin/edit/${id}`, {
                Password: password,
                Role: role,
                FirstName: firstName,
                LastName: lastName,
                DateOfBirth: dateOfBirth,
                Phone: phone,
                Email: email
            }).then(() => {
                toast.success('Cập nhật thành công')
            }).catch(err => { toast.error(err) });
        } else {
            toast.error('Sai mật khẩu')
        }
    }


    return (
        <Dialog open={openEdit2} handler={() => editDispatch2({ type: OPEN_EDIT })}>
            <DialogHeader>Sửa thông tin</DialogHeader>
            <DialogBody>
                <form className="flex flex-col gap-4">
                    <div>
                        Chức vụ: {role}
                        <Select defaultValue={role} label="Chọn" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" color="blue">
                            <Option value={'Employee'} onClick={() => setRole('Employee')}>Nhân viên</Option>
                            <Option value={'Admin'} onClick={() => setRole('Admin')}>Admin</Option>
                        </Select>

                        <Input value={email} label='Email' onChange={(e) => setEmail(e.target.value)} className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type={'email'} />

                        <Input value={password} label='Mật khẩu mới' onChange={(e) => setPassword(e.target.value)} className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type={'password'} />

                        <Input value={password2} label='Xác nhận mật khẩu' onChange={(e) => setPassword2(e.target.value)} className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type={'password'} />

                        <Input value={firstName} label='Họ' onChange={(e) => setFirstName(e.target.value)} className="block mt-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <Input value={lastName} label='Tên' onChange={(e) => setLastName(e.target.value)} className="block mt-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <Input value={dateOfBirth} label='Ngày sinh' onChange={(e) => setDateOfBirth(e.target.value)} className="block mt-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <Input value={phone} label='Số điện thoại' onChange={(e) => setPhone(e.target.value)} className="block mt-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                    </div>
                </form>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => editDispatch2({ type: OPEN_EDIT })}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={() => { editDispatch2({ type: OPEN_EDIT }); handleSubmit() }}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default EditEmployee