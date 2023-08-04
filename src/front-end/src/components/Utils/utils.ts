import { useEffect, useRef, useState } from "react";

const searchEffect = (result : any, filter : (searchText : string, list : any[]) => any[]) => {
  const isSearchingDone = useRef(true)
  const [search, setSearch] = useState('')
  const [commitSearch, setCommitSearch] = useState(false)
  //const result = response.state
  let dataFiltered = useRef<Object[] | null>()

  
  /******** Filter List */
  const commitEffect = () => {
    return useEffect(() => {}, [commitSearch])
  }

  const filterEffect = (dips : any[] = []) => {
    return useEffect(() => {
      ////console.log("searching...", result.data)
      if (result.data && search.length > 0 && isSearchingDone.current) {
        isSearchingDone.current = false
        dataFiltered.current = [...result.data]
        dataFiltered.current = filter(search, dataFiltered.current);
        isSearchingDone.current = true
      } else if (result.data && search.length === 0) {
        dataFiltered.current = [...result.data]
      }
      setCommitSearch(!commitSearch)
    }, [search, ...dips])
  }

  return {
    search,
    setSearch,
    commitEffect,
    filterEffect,
    dataFiltered : dataFiltered.current
  }
}

export {
  searchEffect
}