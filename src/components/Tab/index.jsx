import React from 'react'
import { Link } from 'react-router-dom'
import {  useRouteMatch } from 'react-router'


const Tab = ({tabName, path}) => {
    let match = useRouteMatch({
        path: path
    })
    return (
        <Link to={path} className={`flex items-center py-4 hover:bg-gray-300 ` + (match ? 'border-r-4 border-yellow-500 duration-300' : '') }>
      
            <div>
                <p className="font-semibold text-sm">{tabName}</p>
               
            </div>
        </Link>
    )
}

export default Tab
