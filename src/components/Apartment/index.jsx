import React, { useEffect, useState } from 'react'
import { FiPlus, FiSearch } from "react-icons/fi"
import { BiPencil, BiTrash } from "react-icons/bi"
import { AiFillEye } from "react-icons/ai"
import aptApi from '../../api/aptApi'
import aptAreaApi from '../../api/aptAreaApi'
import useModal from '../../hooks/useModal'
import Modal from '../Modal'
import {toast} from 'react-toastify'
import Pagination from '../Pagination'
const findArea = (arr, id) => {
    return arr.find(el => el.id === id)
}
const Apartment = () => {
    const [apts, setApts] = useState([])
    const [aptAreas, setAptAreas] = useState([])
    const {show, toggleModal} = useModal()
    const [modal, setModal] = useState("")
    const [addInfo, setAddInfo] = useState(null)
    const [editInfo, setEditInfo] = useState(null)
    const [selectedApt, setSelectedApt] = useState(null)
    const [filter, setFilter] = useState({
        page: 1
    })
    const [pagination, setPagination] = useState({
        page: 1,
        totalApts: 1
    })
    const handlePageChange = (newPage) => {
       handleFiltersChange({
           ...filter,
           page: newPage.selected + 1
       })
    }
    const handleFiltersChange = (fil) => {
        if (fil.page === filter.page) {
            setFilter({
                ...fil,
                page: fil.selected - fil.selected + 1
            })
        } else {
            setFilter({
                ...fil
            })
        }
       
    }
    const handleFilterChange = (event) => {
        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        })
    }
    const getAllAptAreas = async () => {
        try {
            const response = await aptAreaApi.getAll()
     
            
            setAptAreas(response)
        } catch (error) {
            console.log(error)
        }
    }
    
    const getAllApts = async () => {
        try {
            const response = await aptApi.getAll(filter)
            console.log(response)
            setPagination({
                ...pagination,
                limit: response.per_page,
                totalApts: response.total
            })
            setApts(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const openAddModal = () => {
        setModal("add")
        toggleModal()
    }

    const openEditModal = (apt) => {
        setSelectedApt(apt)
        setModal("edit")
        toggleModal()
    }
    const openDeleteModal = (apt) => {
        setSelectedApt(apt)
        setModal("delete")
        toggleModal()
    }
    const openViewModal = (apt) => {
        setSelectedApt(apt)
        setModal("view")
        toggleModal()
    }
    const handleAddChange = (event) => {
        if (event.target.name === "apartment_areas_id" || event.target.name === "price") {
            setAddInfo({
                ...addInfo,
                [event.target.name]: parseFloat(event.target.value)
            })
        } else {
            setAddInfo({
                ...addInfo,
                [event.target.name]: event.target.value
            })
        }
    }
    const handleEditChange = (event) => {
        if (event.target.name === "apartment_areas_id" || event.target.name === "price") {
            setEditInfo({
                ...addInfo,
                [event.target.name]: parseFloat(event.target.value)
            })
        } else {
            setEditInfo({
                ...addInfo,
                [event.target.name]: event.target.value
            })
        }
    }
    const handleSubmitAdd = async () => {
        try {
            const response = await aptApi.addApt(addInfo)
            const repApts = [...apts]
            repApts.unshift(response.data)
            
            setApts(repApts)
            toggleModal()
            toast.success("Tạo thành công !!!")
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleSubmitEdit = async () => {
        try {
            const response = await aptApi.editApt({...selectedApt, ...editInfo})
            console.log(response)
            const index = apts.findIndex(apt => apt.id === response.data.id)
            const repAreas = [...apts]
            repAreas[index] = response.data
            setApts(repAreas)
            setEditInfo(null)
            toggleModal()
            toast.success("Cập nhật thành công !!!")
        } catch (error) {

            toast.error("Đã có lỗi xảy ra")
        }
    }
    const handleSubmitDelete = async () => {
        try {
            const response = await aptApi.deleteApt(selectedApt.id)
           
            const repAreas = [...apts]
            const deletedAreas = repAreas.filter(area => area.id !== selectedApt.id)
            setApts(deletedAreas)
            
            toggleModal()
            toast.success("Xóa thành công !!!")
        } catch (error) {

            toast.error("Đã có lỗi xảy ra")
        }
    }
    useEffect(() => {
        getAllApts()
        getAllAptAreas()
    }, [filter])

  return(
    <div className=" py-4 px-8 flex-1">
        <h1 className="font-bold text-2xl">Quản lý căn hộ</h1>
        <div className="flex items-center justify-between">
            
            <div className="flex justify-end items-center my-4">
                <div className="flex items-center bg-yellow-500 p-1 border-2 border-transparent text-black rounded-md cursor-pointer hover:bg-white hover:text-black hover:border-yellow-500">
                    <FiPlus className="font-semibold mr-2 font-bold text-2xl" />
                    <button className="text-xs font-semibold" onClick={openAddModal}>Thêm căn hộ</button>
                </div>
            </div>
        </div>
        <div className='flex items-center mb-4'>

           <div>
                <select className='flex mr-8 rounded-md border-2 py-1 px-2 cursor-pointer' name="sortBy" onChange={handleFilterChange}>
                    <option selected value="price">
                        Giá
                    </option>
                    <option value="rooms">
                        Phòng
                    </option>
                    <option value="area">
                        Diện tích
                    </option>
                </select>
           </div>
           <div className='flex mr-8 rounded-md border-2 py-1 px-2 cursor-pointer' onChange={handleFilterChange}>
                <select name="sortOrder">
                    <option selected value="asc">
                        Tăng dần
                    </option>
                    <option value="desc">
                        Giảm dần
                    </option>

                </select>
           </div>
        </div>
        <div className='min-h-[300px]'>
        <table className="border-solid w-full">
                    <thead className="border-t-[1px] border-b-[1px]">
                        <tr className="text-left font-normal text-sm">
                            <th className="w-[150px] text-center">Mã căn hộ</th>
                            <th className="w-[150px] text-center">Diện tích</th>
                            <th className="w-[150px] text-center">Số phòng</th>
                            <th className="w-[150px] text-center">Giá</th>
                            <th className="w-[150px] text-center">Khu vực</th>
                            <th className="w-[150px] text-center">Tình trạng</th>
                            <th className="w-[150px] text-center"></th>
                        </tr>
                    </thead>
                    
             
                    <tbody>
                        {
                            apts.map(apt => {
                            return      <tr className="mb-2 border-b-[1px]" key={apt.id}>
                                               
                                               <td className='text-center'>
                                                    <p className="text-xs font-medium">{apt.id}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{apt.area}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{apt.rooms}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{apt.price}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{apt.apartment_areas?.name}</p>
                                                </td>
                                                {
                                                    apt.status === 1 ? <td className='text-center'>
                                                    <p className="text-xs font-medium">Còn trống</p>
                                                    </td> :
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">Đã thuê</p>
                                                </td>
                                                }
                                                <td className='text-center'>
                                                  
                                                    <span className="inline-block mr-2 cursor-pointer" onClick={() => openEditModal(apt)}><BiPencil className="inline-block"/></span>
                                                    <span className="inline-block mr-2 cursor-pointer" onClick={() => openDeleteModal(apt)}><BiTrash className="inline-block"/></span>
                                                </td>
                                        </tr>
                            })
                        }
                    </tbody>
                
            </table>
        </div>
        {
               modal === 'add' && <Modal show={show}>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Mã căn hộ</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="id" onChange={handleAddChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Diện tích</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="area" onChange={handleAddChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Giá</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="price" onChange={handleAddChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Số phòng</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="rooms" onChange={handleAddChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <select onChange={handleAddChange} name="apartment_areas_id">
                                                    {
                                                        aptAreas.map(area => <option value={area.id}>{area.name}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="flex justify-between">
                                                <button className="border-[1px] font-semibold text-sm border-black px-4" onClick={toggleModal}>Hủy</button>
                                                <button className="bg-yellow-500 font-semibold text-sm px-4" onClick={handleSubmitAdd}>Thêm</button>
                                            </div>
                                    </Modal>
        }
        {
            modal === 'edit' && <Modal show={show}>
              
                                             <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Diện tích</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" defaultValue={selectedApt.area} name="area" onChange={handleEditChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Giá</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="price" defaultValue={selectedApt.price} onChange={handleEditChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Số phòng</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="rooms" defaultValue={selectedApt.rooms} onChange={handleEditChange} />
                                            </div>
                                            
                                            <div className="flex justify-between">
                                                <button className="border-[1px] font-semibold text-sm border-black px-4" onClick={toggleModal}>Hủy</button>
                                                <button className="bg-yellow-500 font-semibold text-sm px-4" onClick={handleSubmitEdit}>Sửa</button>
                                            </div>
                                </Modal>
        }                
        {
            modal === 'delete' && <Modal show={show}>
                                        <div className='font-semibold my-4'>
                                            Chắc chắn xóa ?
                                        </div>
                                        <div className="flex justify-between">
                                            <button className="border-[1px] font-semibold text-sm border-black px-4" onClick={toggleModal}>Hủy</button>
                                            <button className="bg-yellow-500 font-semibold text-sm px-4" onClick={handleSubmitDelete}>Xóa</button>
                                        </div>
                                </Modal>
        }     
        <Pagination onPageChange={handlePageChange} pagination={pagination}/>
    </div>
)
};

export default Apartment;
