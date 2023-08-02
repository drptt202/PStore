import { useState } from 'react'
import logo from '../../assets/img/android-chrome-512x512.png'
import { toast } from 'react-hot-toast';
import axiosCustom from '../../utils/axiosCustom';

import {
    useNavigate
} from "react-router-dom"

const Register = () => {
    const [accountName, setAccountName] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password2 == password) {
            axiosCustom.post("/auth/register", {
                Username: accountName,
                Email: email,
                Password: password,
                ID: 99999999,
                FirstName: "none",
                LastName: "none",
                DateOfBirth: "none",
                Phone: "none"
            }).then(() => {
                toast.success('Đăng ký thành công')
                navigate('/dang-nhap')
            }).catch((err) => {
                toast.error(err)
            })
        } else {
            toast.error("Mật khẩu xác nhận sai")
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-24 w-auto"
                    src={logo}
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Đăng ký thành viên
                </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="text" className="float-left text-sm font-medium leading-6 text-gray-900">
                            Tên toài khoản
                        </label>
                        <div className="mt-2">
                            <input
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                                id="text"
                                name="text"
                                type="text"
                                autoComplete="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="float-left text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="float-left text-sm font-medium leading-6 text-gray-900">
                            Mật khẩu
                        </label>
                        <div className="mt-2">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="float-left text-sm font-medium leading-6 text-gray-900">
                            Xác nhận mật khẩu
                        </label>
                        <div className="mt-2">
                            <input
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Đăng ký
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register