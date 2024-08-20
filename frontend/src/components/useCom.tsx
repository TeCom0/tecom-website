import Header from "./Header";

export default function Computer() {
    return <>
        <div>
            <div>
                <Header />
            </div>
            <div className=" flex items-center justify-center font-quickSand">
                <h1 className=" text-3xl">Please Use your laptop to access your account</h1>
            </div>
        </div>
    </>
}