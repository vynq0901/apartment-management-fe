import React, { useEffect, useState } from 'react'
import { FiPlus, FiSearch } from "react-icons/fi"
import { BiPencil, BiTrash } from "react-icons/bi"
import { AiFillEye } from "react-icons/ai"
import aptApi from '../../api/aptApi'
import residentApi from '../../api/residentApi'
import contractApi from '../../api/contractApi'
import useModal from '../../hooks/useModal'
import Modal from '../Modal'
import {toast} from 'react-toastify'
import Pagination from '../Pagination'

const Contract = () => {
    const [apts, setApts] = useState([])
    const [contracts, setContracts] = useState([])
    const [residents, setResidents] = useState([])
    const {show, toggleModal} = useModal()
    const [modal, setModal] = useState("")
    const [addInfo, setAddInfo] = useState(null)
    const [editInfo, setEditInfo] = useState(null)
    const [selectedApt, setSelectedApt] = useState(null)
    
    
   
   
    const getAllContract = async () => {
        try {
            const response = await contractApi.getAll()
            setContracts(response)
            
            
        } catch (error) {
            console.log(error)
        }
    }
    const getAllResidents = async () => {
        try {
            const response = await residentApi.getAll()
            setResidents(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getAllApts = async () => {
        try {
            const response = await aptApi.getAll()
           
           
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
        getAllContract()
        getAllResidents()
    }, [])

  return(
    <div className=" py-4 px-8 flex-1">
        <h1 className="font-bold text-2xl">Quản lý hợp đồng</h1>
        <div className="flex items-center justify-between">
            <div className="flex items-center border-[1px] p-1 border-gray-300 w-1/3">
                <div className="mr-1">
                    <FiSearch className="font-bold" />
                </div>
                <input className="outline-none text-sm w-full"  />
            </div>
            <div className="flex justify-end items-center my-4">
                <div className="flex items-center bg-yellow-500 p-1 border-2 border-transparent text-black rounded-md cursor-pointer hover:bg-white hover:text-black hover:border-yellow-500">
                    <FiPlus className="font-semibold mr-2 font-bold text-2xl" />
                    <button className="text-xs font-semibold" onClick={openAddModal}>Thêm hợp đồng</button>
                </div>
            </div>
        </div>
        
        <div className='min-h-[300px]'>
        <table className="border-solid w-full">
                    <thead className="border-t-[1px] border-b-[1px]">
                        <tr className="text-left font-normal text-sm">
                            <th className="w-[150px] text-center">Căn hộ</th>
                            <th className="w-[150px] text-center">Người thuê</th>
                            <th className="w-[150px] text-center">Cư dân</th>
                            <th className="w-[150px] text-center">Địa chỉ</th>
                            <th className="w-[150px] text-center">Hết hạn</th>
                            <th className="w-[150px] text-center"></th>
                        </tr>
                    </thead>
                    
             
                    <tbody>
                        {
                            contracts.map(con => {
                            return      <tr className="mb-2 border-b-[1px]" key={con.id}>
                                               
                                               
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{con.area}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{con.rooms}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{con.price}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{con.apartment_areas?.name}</p>
                                                </td>
                                                {
                                                    con.status === 1 ? <td className='text-center'>
                                                    <p className="text-xs font-medium">Còn trống</p>
                                                    </td> :
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{con.expired_at}</p>
                                                </td>
                                                }
                                                <td className='text-center'>
                                                    <span className="inline-block mr-2 cursor-pointer" onClick={() => openViewModal(con)}><AiFillEye className="inline-block"/></span>
                                                    <span className="inline-block mr-2 cursor-pointer" onClick={() => openEditModal(con)}><BiPencil className="inline-block"/></span>
                                                    <span className="inline-block mr-2 cursor-pointer" onClick={() => openDeleteModal(con)}><BiTrash className="inline-block"/></span>
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
                                                <select onChange={handleAddChange} name="apartment_id">
                                                    {
                                                        apts.map(apt => <option value={apt.id}>{apt.id}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <select onChange={handleAddChange} name="resident_id">
                                                    {
                                                        residents.map(res => <option value={res.id}>{res.last_name + " " + res.first_name}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Ngày hết hạn</label>
                                                <input type="date" className="text-sm p-1 border-[1px] rounded-md" name="expired_at" onChange={handleAddChange} />
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
        
    </div>
)
};

export default Contract;
