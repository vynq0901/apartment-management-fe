import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ApartmentArea from '../../components/ApartmentArea'
import Apartment from '../../components/Apartment'
import Resident from '../../components/Resident'
import Navbar from '../../components/Navbar'
import Tab from '../../components/Tab'
import TabContainer from '../../components/TabContainer'
import Contract from '../../components/Contract'
const Home = () => {
    return (
            <div>
                <Navbar />
                        <div className="flex">
                <TabContainer  className="w-1/5">
                    <Tab tabName="Quản lý khu vực" path="/admin/apartment-areas" />
                    <Tab tabName="Quản lý căn hộ" path="/admin/apartment" />
                    <Tab tabName="Quản lý cư dân" path="/admin/resident" />
                    <Tab tabName="Quản lý hợp đồng" path="/admin/contract" />
                </TabContainer>
                <Switch>
                        <Route exact path="/admin/apartment-areas">
                            <ApartmentArea />
                        </Route>
                        <Route exact path="/admin/apartment">
                            <Apartment />
                        </Route>
                        <Route exact path="/admin/resident">
                            <Resident />
                        </Route>
                        <Route exact path="/admin/contract">
                            <Contract />
                        </Route>
                </Switch>
                        </div>
            </div>
    )
}

export default Home
