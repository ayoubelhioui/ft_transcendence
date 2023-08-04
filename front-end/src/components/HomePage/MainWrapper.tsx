import { ReactNode } from "react"

const MainWrapper = ( {children} : {children : ReactNode} ) => {
    return (
        <>
        <div className='h-screen max-md:h-[1400px] max-custom-md:h-[1500px] relative overflow-hidden'>
            <div className='h-full flex items-center max-m-custom-md:h-full'>
            <div className="flex flex-col my-auto bg-profile-bg bg-cover bg-center rounded-[10px] max-sm:rounded-none w-[60%] mx-auto max-w-[1650px] h-[1100px] max-md:w-[100%] max-md:max-w-[1800px] max-sm:drop-shadow-none max-md:h-[100%] max-md:mt-3 max-sm:mt-0 max-sm:max-w-[1800px] max-h-[100%] max-custom-lg:w-[90%] max-m-custom-md:w-[100%] max-m-custom-md:h-full">
                {children}
            </div>
            </div>
        </div>
        </>
    )
}

export default MainWrapper