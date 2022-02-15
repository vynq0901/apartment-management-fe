import React, { useEffect, useState } from 'react'
import { FiPlus, FiSearch } from "react-icons/fi"
import { BiPencil, BiTrash } from "react-icons/bi"
import { AiFillEye } from "react-icons/ai"
import aptAreaApi from '../../api/aptAreaApi'
import useModal from '../../hooks/useModal'
import Modal from '../Modal'
import {toast} from 'react-toastify'

const ApartmentArea = () => {
    const [areas, setAreas] = useState([])
    const {show, toggleModal} = useModal()
    const [modal, setModal] = useState("")
    const [addInfo, setAddInfo] = useState(null)
    const [editInfo, setEditInfo] = useState(null)
    const [selectedArea, setSelectedArea] = useState(null)

    const getAllAreas = async () => {
        try {
            const response = await aptAreaApi.getAll()
          
            setAreas(response)
        } catch (error) {
            console.log(error.response)
        }
    }

    const openAddModal = () => {
        setModal("add")
        toggleModal()
    }

    const openEditModal = (area) => {
        setSelectedArea(area)
        setModal("edit")
        toggleModal()
    }
    const openDeleteModal = (area) => {
        setSelectedArea(area)
        setModal("delete")
        toggleModal()
    }
    const openViewModal = (area) => {
        setSelectedArea(area)
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
            const response = await aptAreaApi.addArea(addInfo)
            setAreas([...areas, response.data])
            toggleModal()
            toast.success("Tạo thành công !!!")
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleSubmitEdit = async () => {
        try {
            const response = await aptAreaApi.editArea({...selectedArea, ...editInfo})
            
            const index = areas.findIndex(area => area.id === response.data.id)
            const repAreas = [...areas]
            repAreas[index] = response.data
            setAreas(repAreas)
            setEditInfo(null)
            toggleModal()
            toast.success("Cập nhật thành công !!!")
        } catch (error) {

            toast.error("Đã có lỗi xảy ra")
        }
    }
    const handleSubmitDelete = async () => {
        try {
            const response = await aptAreaApi.deleteArea(selectedArea.id)
           
            const repAreas = [...areas]
            const deletedAreas = repAreas.filter(area => area.id !== selectedArea.id)
            setAreas(deletedAreas)
            
            toggleModal()
            toast.success("Xóa thành công !!!")
        } catch (error) {

            toast.error("Đã có lỗi xảy ra")
        }
    }
    useEffect(() => {
        getAllAreas()
    }, [])

  return(
    <div className=" py-4 px-8 flex-1">
        <h1 className="font-bold text-2xl">Quản lý khu vực</h1>
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
                    <button className="text-xs font-semibold" onClick={openAddModal}>Thêm khu vực</button>
                </div>
            </div>
        </div>
        <div>
        <table className="border-solid w-full">
                    <thead className="border-t-[1px] border-b-[1px]">
                        <tr className="text-left font-normal text-sm">
                            <th className="w-[150px] text-center">Tên khu vực</th>
                            <th className="w-[150px] text-center">Floors</th>
                            <th className="w-[300px] text-center">Địa chỉ</th>
                          
                            <th className="w-[150px] text-center"></th>
                        </tr>
                    </thead>
                    
             
                    <tbody>
                        {
                            areas.map(area => {
                            return      <tr className="mb-2 border-b-[1px]" key={area.id}>
                                               
                                               
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{area.name}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{area.floors}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{area.address}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <span className="inline-block mr-2 cursor-pointer" onClick={() => openViewModal(area)}><AiFillEye className="inline-block"/></span>
                                                    <span className="inline-block mr-2 cursor-pointer" onClick={() => openEditModal(area)}><BiPencil className="inline-block"/></span>
                                                    <span className="inline-block mr-2 cursor-pointer" onClick={() => openDeleteModal(area)}><BiTrash className="inline-block"/></span>
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
                                                <label className="text-sm font-medium">Tên khu vực</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="name" onChange={handleAddChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Floors</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="floors" onChange={handleAddChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Địa chỉ</label>
                                                <input className="text-sm p-1 border-[1px] rounded-md" name="address" onChange={handleAddChange} />
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
                                            <label className="text-sm font-medium">Tên khu vực</label>
                                            <input className="text-sm p-1 border-[1px] rounded-md" name="name" defaultValue={selectedArea.name} onChange={handleEditChange} />
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm font-medium">Floors</label>
                                            <input className="text-sm p-1 border-[1px] rounded-md" name="floors" defaultValue={selectedArea.floors} onChange={handleEditChange} />
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm font-medium">Địa chỉ</label>
                                            <input className="text-sm p-1 border-[1px] rounded-md" name="address" defaultValue={selectedArea.address} onChange={handleEditChange} />
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
        
    </div>
)
};

export default ApartmentArea;
