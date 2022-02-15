import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ApartmentArea from '../../components/ApartmentArea'
import Apartment from '../../components/Apartment'
import Navbar from '../../components/Navbar'
import Tab from '../../components/Tab'
import TabContainer from '../../components/TabContainer'
const Home = () => {
    return (
            <div>
                <Navbar />
                        <div className="flex">
                <TabContainer  className="w-1/5">
                    <Tab tabName="Quản lý khu vực" path="/admin/apartment-areas" />
                    <Tab tabName="Quản lý căn hộ" path="/admin/apartment" />
                </TabContainer>
                <Switch>
                        <Route exact path="/admin/apartment-areas">
                            <ApartmentArea />
                        </Route>
                        <Route exact path="/admin/apartment">
                            <Apartment />
                        </Route>
                </Switch>
                        </div>
            </div>
    )
}

export default Home
