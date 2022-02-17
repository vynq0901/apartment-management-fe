import React, { useEffect, useState } from 'react'
import { FiPlus, FiSearch } from "react-icons/fi"
import { BiPencil, BiTrash } from "react-icons/bi"
import { AiFillEye } from "react-icons/ai"
import residentApi from '../../api/residentApi'
import useModal from '../../hooks/useModal'
import Modal from '../Modal'
import {toast} from 'react-toastify'
import Pagination from '../Pagination'

const Resident = () => {
    const [residents, setResidents] = useState([])
    const {show, toggleModal} = useModal()
    const [modal, setModal] = useState("")
    const [addInfo, setAddInfo] = useState(null)
    const [editInfo, setEditInfo] = useState(null)
    const [selectedResident, setSelectedResident] = useState(null)
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
    const getAllResidents = async () => {
        try {
            const response = await residentApi.getAll(filter)
            setPagination({
                ...pagination,
                limit: response.per_page,
                totalApts: response.total
            })
            setResidents(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const openAddModal = () => {
        setModal("add")
        toggleModal()
    }

    const openEditModal = (area) => {
        setSelectedResident(area)
        setModal("edit")
        toggleModal()
    }
    const openDeleteModal = (area) => {
        setSelectedResident(area)
        setModal("delete")
        toggleModal()
    }
    const openViewModal = (area) => {
        setSelectedResident(area)
        setModal("view")
        toggleModal()
    }
    const handleAddChange = (event) => {
        setAddInfo({
            ...addInfo,
            [event.target.name]: event.target.value
        })
    }
    const handleEditChange = (event) => {
        setEditInfo({
            ...editInfo,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmitAdd = async () => {
        try {
            const response = await residentApi.addResident(addInfo)
            const repResidents = [...residents]
            repResidents.unshift(response.data)
            setResidents(repResidents)
            toggleModal()
            toast.success("Tạo thành công !!!")
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleSubmitEdit = async () => {
        try {
            const response = await residentApi.editResident({...selectedResident, ...editInfo})
            
            const index = residents.findIndex(area => area.id === response.data.id)
            const repAreas = [...residents]
            repAreas[index] = response.data
            setResidents(repAreas)
            setEditInfo(null)
            toggleModal()
            toast.success("Cập nhật thành công !!!")
        } catch (error) {

            toast.error("Đã có lỗi xảy ra")
        }
    }
    const handleSubmitDelete = async () => {
        try {
            const response = await residentApi.deleteResident(selectedResident.id)
           
            const repResidents = [...residents]
            const deletedAreas = repResidents.filter(area => area.id !== selectedResident.id)
            setResidents(deletedAreas)
            
            toggleModal()
            toast.success("Xóa thành công !!!")
        } catch (error) {

            toast.error("Đã có lỗi xảy ra")
        }
    }
    useEffect(() => {
        getAllResidents()
    }, [filter])

  return(
    <div className=" py-4 px-8 flex-1">
        <h1 className="font-bold text-2xl">Quản lý cư dân</h1>
        <div className="flex items-center justify-between">
            
            <div className="flex justify-end items-center my-4">
                <div className="flex items-center bg-yellow-500 p-1 border-2 border-transparent text-black rounded-md cursor-pointer hover:bg-white hover:text-black hover:border-yellow-500">
                    <FiPlus className="font-semibold mr-2 font-bold text-2xl" />
                    <button className="text-xs font-semibold" onClick={openAddModal}>Thêm cư dân</button>
                </div>
            </div>
        </div>
        <div>
        <table className="border-solid w-full">
                    <thead className="border-t-[1px] border-b-[1px]">
                        <tr className="text-left font-normal text-sm">
                            <th className="w-[150px] text-center">Họ</th>
                            <th className="w-[150px] text-center">Tên</th>
                            <th className="w-[150px] text-center">Ngày sinh</th>
                            <th className="w-[150px] text-center">Giới tính</th>
                            <th className="w-[150px] text-center">Quốc tịch</th>
                            <th className="w-[150px] text-center"></th>
                        </tr>
                    </thead>
                    
             
                    <tbody>
                        {
                            residents.map(res => {
                            return      <tr className="mb-2 border-b-[1px]" key={res.id}>
                                               
                                               
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{res.last_name}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{res.first_name}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{res.birthday}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{res.gender}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{res.country}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <span className="inline-block mr-2 cursor-pointer" onClick={() => openViewModal(res)}><AiFillEye className="inline-block"/></span>
                                                    <span className="inline-block mr-2 cursor-pointer" onClick={() => openEditModal(res)}><BiPencil className="inline-block"/></span>
                                                    <span className="inline-block mr-2 cursor-pointer" onClick={() => openDeleteModal(res)}><BiTrash className="inline-block"/></span>
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
                                                <label className="text-sm font-medium">Họ</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="last_name" onChange={handleAddChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Tên</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="first_name" onChange={handleAddChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Địa chỉ</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="address" onChange={handleAddChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Ngày sinh</label>
                                                <input type="date" className="text-sm p-1 border-[1px] rounded-md" name="birthday" onChange={handleAddChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Giới tính</label>
                                               
                                                <select className='flex mr-8 rounded-md border-2 py-1 px-2 cursor-pointer' name="gender" onChange={handleAddChange}>
                                                    <option selected value="nam">
                                                        Nam
                                                    </option>
                                                    <option value="nữ">
                                                        Nữ
                                                    </option>
                                                    
                                                </select>
                                        
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Số điện thoại</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="phone_number" onChange={handleAddChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Số căn cước</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="identity_card_number" onChange={handleAddChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Quốc tịch</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="country" onChange={handleAddChange} />
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
                                            <label className="text-sm font-medium">Họ</label>
                                            <input className="text-sm p-1 border-[1px] rounded-md" name="last_name" defaultValue={selectedResident.last_name} onChange={handleEditChange} />
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm font-medium">Tên</label>
                                            <input className="text-sm p-1 border-[1px] rounded-md" name="first_name" defaultValue={selectedResident.first_name} onChange={handleEditChange} />
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm font-medium">Địa chỉ</label>
                                            <input className="text-sm p-1 border-[1px] rounded-md" name="address" defaultValue={selectedResident.address} onChange={handleEditChange} />
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm font-medium">Số điện thoại</label>
                                            <input className="text-sm p-1 border-[1px] rounded-md" name="phone_number" defaultValue={selectedResident.phone_number} onChange={handleEditChange} />
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm font-medium">Số căn cước</label>
                                            <input className="text-sm p-1 border-[1px] rounded-md" name="identity_card_number" defaultValue={selectedResident.identity_card_number} onChange={handleEditChange} />
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm font-medium">Quốc tịch</label>
                                            <input className="text-sm p-1 border-[1px] rounded-md" name="country" defaultValue={selectedResident.country} onChange={handleEditChange} />
                                        </div>
                                        <div className="flex justify-between">
                                            <button className="border-[1px] font-semibold text-sm border-black px-4" onClick={toggleModal}>Hủy</button>
                                            <button className="bg-yellow-500 font-semibold text-sm px-4" onClick={handleSubmitEdit}>Cập nhật</button>
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
        {
            modal === 'view' && <Modal show={show}>
                                       <div>
                                           <div className='grid grid-cols-2 gap-x-8 gap-y-8'>
                                                <div className=''>
                                                    <label className='font-semibold'>Họ</label>
                                                    <p>{selectedResident.last_name}</p>
                                                </div>
                                                <div>
                                                    <label className='font-semibold'>Tên</label>
                                                    <p>{selectedResident.first_name}</p>
                                                </div>
                                                <div>
                                                    <label className='font-semibold'>Giới tính</label>
                                                    <p>{selectedResident.gender}</p>
                                                </div>
                                                <div>
                                                    <label className='font-semibold'>Số điện thoại</label>
                                                    <p>{selectedResident.phone}</p>
                                                </div>
                                                <div>
                                                    <label className='font-semibold'>Số căn cước</label>
                                                    <p>{selectedResident.identity_card_number}</p>
                                                </div>
                                                <div>
                                                    <label className='font-semibold'>Ngày sinh</label>
                                                    <p>{selectedResident.birthday}</p>
                                                </div>
                                                <div>
                                                    <label className='font-semibold'>Quốc tịch</label>
                                                    <p>{selectedResident.country}</p>
                                                </div>
                                           </div>
                                            <div className="text-center">
                                                <button className="border-[1px] font-semibold text-sm bg-yellow-500 py-2 rounded-sm  px-4" onClick={toggleModal}>Đóng</button>
                                               
                                            </div>
                                       </div>
                                </Modal>
        }        
        <Pagination onPageChange={handlePageChange} pagination={pagination}/>
    </div>
)
};

export default Resident;
