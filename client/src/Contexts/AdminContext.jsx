import { createContext, useEffect, useState } from "react";
import axiosCustom from "../utils/axiosCustom";

export const AdminContext = createContext({})

// eslint-disable-next-line react/prop-types
export const AdminProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [employees, setEmployees] = useState([])
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        axiosCustom.get("/admin/product")
            .then((res) => {
                setProducts(res.data.data.products)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axiosCustom.get("/admin/customers")
            .then((res) => {
                setCustomers(res.data.data.customers)
            }).catch((err) => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        axiosCustom.get('/admin/employees')
            .then(res => {
                setEmployees(res.data.data.employees)
            })
            .catch(err => console.log(err))
    }, [])
    const AdminData = {
        products, employees, customers
    }
    return (
        <AdminContext.Provider value={AdminData}>
            {children}
        </AdminContext.Provider>
    )
}