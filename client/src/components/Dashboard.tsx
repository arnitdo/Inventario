import React, {useContext, useEffect, useState} from 'react'
import { Sidebar } from './Sidebar';
import {AuthContext} from "../App";
const Dashboard = () => {
  const [warehouseList, setWarehouseList] = useState<string[]>([])

  const {isAuthenticated, authenticatedRole, authenticatedOrg} = useContext(AuthContext)

  useEffect(() => {
    const makeWarehouseRequest = async () => {
      const res = await fetch(
        `http://localhost:8800/api/orgs/hackoders-corp/warehouses`
      )

      const resJson = await res.json()

      const {status, orgWarehouses} = resJson

      if (status === "SUCCESS"){
        setWarehouseList(orgWarehouses)
      }
    }

    makeWarehouseRequest()
  }, [])

  return (
    <div>
        <Sidebar warehouses={warehouseList}/>
    </div>
  )
}

export {Dashboard};