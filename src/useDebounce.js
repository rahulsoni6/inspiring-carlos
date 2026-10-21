import { useEffect, useState } from "react"

const useDebounce = (searchValue, delay) => {
    const [searchDebounce, setSearchDebounce] = useState(searchValue)

    useEffect(() => {

        let timer = setTimeout(() => {
            setSearchDebounce(searchValue)

        }, delay);


        return () => clearTimeout(timer)

    }, [searchValue, delay])


    return searchDebounce

}

export default useDebounce