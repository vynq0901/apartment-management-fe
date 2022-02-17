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


const Contract = () => {
    const [apts, setApts] = useState([])
    const [contracts, setContracts] = useState([])
    const [residents, setResidents] = useState([])
    const {show, toggleModal} = useModal()
    const [modal, setModal] = useState("")
    const [addInfo, setAddInfo] = useState(null)
    const [editInfo, setEditInfo] = useState(null)
    const [selectedContract, setSelectedContract] = useState(null)
    
    
   
   
    const getAllContract = async () => {
        try {
            const response = await contractApi.getAll()
            let arr = []
            for (let i = 0; i < response.length; i++) {
               
                const res1 = await aptApi.getApt(response[i].apartment_id)
                 
                const res2 = await residentApi.getResident(response[i].resident_id)
              
                arr.push({
                    ...response[i],
                    apartment_id: res1.id,
                    resident_name: res2.last_name + " " + res2.first_name
                })
            }
            setContracts(arr)
            
            
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
        setSelectedContract(apt)
        setModal("edit")
        toggleModal()
    }
    const openDeleteModal = (apt) => {
        setSelectedContract(apt)
        setModal("delete")
        toggleModal()
    }
    const openViewModal = (apt) => {
        setSelectedContract(apt)
        setModal("view")
        toggleModal()
    }
    const handleAddChange = (event) => {
        if (event.target.name === "resident_id" || event.target.name === "apartment_id") {
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
    const handleSubmitEdit = async () => {
        try {
            const response = await contractApi.editContract({...selectedContract, ...editInfo})
            
            const index = contracts.findIndex(area => area.id === response.data.id)
            const repContracts = [...contracts]
            const lastName = residents.find(res => res.id === response.data.resident_id).last_name
            const firstName = residents.find(res => res.id === response.data.resident_id).first_name
            repContracts[index] = {
                ...response.data,
                resident_name: lastName + " " + firstName
            }
            setContracts(repContracts)
            setEditInfo(null)
            toggleModal()
            toast.success("Cập nhật thành công !!!")
        } catch (error) {
            console.log(error)
            toast.error("Đã có lỗi xảy ra")
        }
    }
    const handleEditChange = (event) => {
        if (event.target.name === "resident_id" || event.target.name === "apartment_id") {
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
            const response = await contractApi.addContract(addInfo)
            const repApts = [...contracts]
            const lastName = residents.find(res => res.id === response.data.resident_id).last_name
            const firstName = residents.find(res => res.id === response.data.resident_id).first_name
            repApts.unshift({
                ...response.data,
                resident_name: lastName + " " + firstName
            })
            
            setContracts(repApts)
            toggleModal()
            toast.success("Tạo thành công !!!")
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleSubmitDelete = async () => {
        try {
            const response = await contractApi.deleteContract(selectedContract.id)
           
            const repAreas = [...contracts]
            const deletedContracts = repAreas.filter(area => area.id !== selectedContract.id)
            setContracts(deletedContracts)
            
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
                                                    <p className="text-xs font-medium">{con.apartment_id}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{con.resident_name}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{con.customer_address}</p>
                                                </td>
                                                <td className='text-center'>
                                                    <p className="text-xs font-medium">{con.expired_at}</p>
                                                </td>
                                                
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
                                                <label className="text-sm font-medium">Căn hộ</label>
                                                <select onChange={handleAddChange} name="apartment_id">
                                                    {
                                                        apts.map(apt => <option value={apt.id}>{apt.id}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label   label className="text-sm font-medium">Cư dân</label>
                                                <select onChange={handleAddChange} name="resident_id">
                                                    {
                                                        residents.map(res => <option value={res.id}>{res.last_name + " " + res.first_name}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                    <label className="text-sm font-medium">Địa chỉ</label>
                                                    <input  className="text-sm p-1 border-[1px] rounded-md" name="customer_address" onChange={handleAddChange} />
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
                                                <label className="text-sm font-medium">Căn hộ</label>
                                                <select defaultValue={selectedContract.apartment_id} onChange={handleEditChange} name="apartment_id">
                                                    {
                                                        apts.map(apt => <option value={apt.id}>{apt.id}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label   label className="text-sm font-medium">Cư dân</label>
                                                <select defaultValue={selectedContract.resident_id} onChange={handleEditChange} name="resident_id">
                                                    {
                                                        residents.map(res => <option value={res.id}>{res.last_name + " " + res.first_name}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                    <label className="text-sm font-medium">Địa chỉ</label>
                                                    <input defaultValue={selectedContract.customer_address} className="text-sm p-1 border-[1px] rounded-md" name="customer_address" onChange={handleEditChange} />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm font-medium">Ngày hết hạn</label>
                                                <input type="date" defaultValue={selectedContract.expired_at} className="text-sm p-1 border-[1px] rounded-md" name="expired_at" onChange={handleEditChange} />
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
