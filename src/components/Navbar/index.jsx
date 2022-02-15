import React from 'react'
import { MdApartment } from "react-icons/md"
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../../redux/actions/authActions'

const Navbar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogout = () => {
        dispatch(logout())
        history.push('/login')
    }
    return (
        <div className="flex justify-between p-4 bg-yellow-500">
            <div className="flex justify-center items-center">
                <MdApartment className="text-4xl mr-2" />
                <span className="font-bold text-2xl">Quản Lý Chung Cư</span>
            </div>
            <div>
                <ul className="flex items-center justify-center">
                    <li className="ml-6 font-semibold">Trang chủ</li>
                    <li className="ml-6 font-semibold">Nav 1</li>
                    <li className="ml-6 font-semibold">Nav 2</li>
                    <li className="ml-6 font-semibold rounded-full border-black border-[2px] p-2">
                        <button className="font-semibold" onClick={handleLogout}>
                            Đăng xuất
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
