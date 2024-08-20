import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getCurrentUser } from "../../State/authSlice"
import { Navigate } from "react-router-dom"
import Select from "react-select"
import { selectedMembers } from "../../utils/constants"
import { User } from "../../utils/Types"
import { useGetMembersQuery } from "../../Api/MemberApi"
export default function Members() {
    const [type, setType] = useState<string | undefined>('Members')
    const User = useSelector(getCurrentUser)
    const { data, refetch } = useGetMembersQuery(type!)
    useEffect(() => {
        refetch()
    }, [refetch, type])
    console.log(data)
    if (!User) return <Navigate to='/login' />
    return <>
        <div className=" flex flex-col gap-4 font-quickSand">
            <div className=" flex justify-between p-4">
                <h1 className=" text-2xl">Club's Members</h1>
                <div className=" flex items-center gap-2">
                    <h3>Filter By Member Position:</h3>
                    <Select
                        options={selectedMembers}
                        onChange={(selectedOptions) => setType(selectedOptions?.value)}
                        className="basic-single w-56"
                    />
                </div>

            </div>
            <div className=" flex flex-wrap gap-4 justify-center">
                {data?.length && data?.map((user: User) => {
                    return <div className=" w-56 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 font-quickSand">
                        <div className="flex flex-col items-center pb-10 pt-10">
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{`${user.FirstName} ${user.LastName}`}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{user.Email}</span>
                            {User.Position=='President' && <div className="flex mt-4 md:mt-6">
                                <a href={`mailto:${user.Email}`} className="py-2 px-4 ms-2 text-sm font-medium text-clearBlue focus:outline-none bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Send Email</a>
                            </div>}
                        </div>
                    </div>
                })
                }
                {
                    !data?.length && <div>
                        <h2>No Member</h2>
                    </div>
                }
            </div>
        </div>
    </>
}