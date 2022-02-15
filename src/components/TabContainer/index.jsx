import React from 'react'
//components


const TabContainer = ({className, user, children}) => {
    // const user = useSelector(state => state.userLogin.userInfo)
    return (
        <div className={`pb-3 pt-3 pl-3 mb-[-20px] bg-gray-100 h-screen ` + className }>
       
        {
            children
        }
        </div>
    )
}

export default TabContainer
 