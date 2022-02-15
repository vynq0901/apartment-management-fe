import React, { useEffect } from 'react'


const Modal = ({show, className, children, scroll}) => {
    useEffect(() => {
        if (show && scroll !== true) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [show])
    return (
        <>
        {
           show ?
           
          <div>
            <div  className={"z-[52] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] rounded-lg bg-white p-4 " + className}>
                  {
                      children
                  }
            </div>
            <div className="fixed top-0 left-0 w-full h-full z-50 bg-black opacity-75"></div>
                   
          </div> : null
        }
        </>
    )
}

export default Modal


