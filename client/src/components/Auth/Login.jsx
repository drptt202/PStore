import { useState } from 'react'
import logo from '../../assets/img/android-chrome-512x512.png'
import axiosCustom from '../../utils/axiosCustom'
import {
    Link, useNavigate
} from "react-router-dom"
import toast from 'react-hot-toast';

const Login = () => {
    const [accountName, accountNameUpdate] = useState("")
    const [password, passwordUpdate] = useState("")
    // const [accessToken, setAccessToken] = useState('')
    const onEnter = (e) => {
        const onkey = e.key
        if (onkey === 'Enter') {
            ProceedLogin(e)
        }
    }
    const navigate = useNavigate()
    const ProceedLogin = (e) => {
        e.preventDefault()
        axiosCustom.post("/auth/login", {
            Username: accountName,
            Password: password,
        }).then((res) => {
            localStorage.setItem('accessToken', res.data.data.token)
            sessionStorage.setItem('isLogin', true)
            toast.success('Đăng nhập thành công')
            navigate('/')
        }).catch((err) => {
            console.log(err)
        })
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
                    Đăng nhập thành viên
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={ProceedLogin} className="space-y-6">
                    <div>
                        <label htmlFor="text" className="float-left text-sm font-medium leading-6 text-gray-900">
                            Tên toài khoản
                        </label>
                        <div className="mt-2">
                            <input
                                id="text"
                                value={accountName}
                                name="text"
                                type="text"
                                autoComplete="text"
                                required
                                onChange={(e) => accountNameUpdate(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Mật khẩu
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Quên mật khẩu?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                value={password}
                                onChange={(e) => passwordUpdate(e.target.value)}
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
                            onKeyDown={onEnter}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Chưa có tài khoản?{' '}
                    <Link to={'/dang-ky'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Đăng ký
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login