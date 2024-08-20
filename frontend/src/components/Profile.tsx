import { useSelector } from "react-redux"
import { getCurrentUser } from "../../State/authSlice"
import { Navigate } from "react-router-dom"
import { useState } from "react"
import EditProfile from "./ProfileEdit"

export default function Profile() {
    const user = useSelector(getCurrentUser)
    const [Edit, setEdit] = useState(false)
    if (!user) return <Navigate to='/login' />
    const { FirstName, LastName, Position, Email, MemberId } = user
    return <>
        {Edit && <EditProfile onClose={() => setEdit(false)} />}
        <div className=" font-roboto p-5 flex flex-col gap-10">
            <div className=" flex gap-7 items-center">
                <h1 className=" text-3xl font-bold">{`${FirstName} ${LastName}`}</h1>
                <h4 className=" text-gray-500">{Position}</h4>
            </div>
            <hr></hr>
            <div>
                <h3>Email: {Email}</h3>
                <h3>Student ID: {MemberId}</h3>
            </div>
            <div>
                <button className=" p-2 rounded-lg bg-clearBlue text-white hover:bg-red-600 hover:duration-300" onClick={() => setEdit(true)}>Edit Profile</button>
            </div>
        </div>
    </>
}