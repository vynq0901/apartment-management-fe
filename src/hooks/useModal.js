import { useState } from 'react'

const useModal = () => {
    const [show, setShow] = useState(false)
    const toggleModal = () => {
        setShow(!show)
    }
    return {toggleModal, show}
}

export default useModal