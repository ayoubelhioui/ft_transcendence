



























  import { useEffect, useRef, useState } from "react";
import { LiveItem } from "./LiveItem";
import { useAppDataContext } from "../Context/context";



function getData(fun : any) {
    const [state, setState] = useState(undefined)

    useEffect(() => {
        async function loadData() {
            setState(await fun())
        }
        loadData()
    }, [])

    return (state)
}

function setDataEvent(event : string) {
    const appContext = useAppDataContext()
    const [state, setState] = useState(undefined)

    
    useEffect(() => {
        appContext.socketHandler.on(event, (data : any) => {
            setState(data)
        })
        
        return () => {
            appContext.socketHandler.on(event, undefined)
        }

    }, [])

    return (state)
}

function LiveTitle() {
    const data = setDataEvent("message")

    if (data)
        return <div> Live {data} </div>
    else
        return <div> Live No Data </div>
}

// function LiveTitle() {
//     const appContext = useAppDataContext()
//     const data = getData(appContext.functions.loadData)

//     if (data)
//         return <div> Live {data} </div>
//     else
//         return <div> Live No Data </div>
// }

export function Live() {

    const [state, setState] = useState(undefined)

    useEffect(() => {
        setTimeout((set : Function) => {
            console.log("Time Out")
            set("k")
        }, 3000, setState)
    }, [])

    if (state) {
        return <div> Done ! </div>
    }
    return (
        <>
            <LiveTitle></LiveTitle>
            <LiveItem></LiveItem>
        </>
    )
}