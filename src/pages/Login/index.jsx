import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Navbar from '../../components/Navbar'
import { login } from '../../redux/actions/authActions'
const Login = () => {
    const [info, setInfo] = useState(null)
    const dispatch = useDispatch()
    const loading = useSelector(state => state.userLogin.loading)
    const user = useSelector(state => state.userLogin.userInfo)
    const history = useHistory()

    const handleChange = (event) => {
        
        setInfo({
            ...info,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()        
        dispatch(login(info.email, info.password))
    }
    useEffect(() => {
        if (user) {
            if (user.email)  history.push('/admin')
        }
        
    }, [user])
    return (
        <div>
            <p className="text-center text-2xl bg-yellow-500 py-4 font-bold">Hệ Thống Quản Lý</p>
            <div className="flex justify-center items-center h-[300px]">
                <div className="w-[300px] border-[1px] border-black p-4 rounded-md">
                    <p className="text-center font-semibold text-2xl mb-4">Đăng Nhập Hệ Thống</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <p className="font-semibold mb-2">Tài khoản</p>
                            <input className="border-[1px] border-gray-300 w-full p-2 rounded-md" name="email" type="text" onChange={handleChange} />
                        </div>
                        <div>
                            <p className="font-semibold mb-2">Mật khẩu</p>
                            <input className="border-[1px] border-gray-300 w-full p-2 rounded-md" name="password" type="password" onChange={handleChange} />
                        </div>
                        <button type='submit' className='w-full bg-yellow-500 font-semibold mt-4 py-2 rounded-md'>Đăng nhập</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
