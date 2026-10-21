import { useEffect, useState } from "react"
import useDebounce from "./useDebounce"


const Search = () => {
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const handleSearch = (e) => setSearchValue(e.target.value)

    const searchDebounce = useDebounce(searchValue, 1000)



    useEffect(() => {
        if (!searchDebounce) {
            setData([])

            return
        }
        const controller = new AbortController()
        const apiCall = async () => {
            setLoading(true)
            const url = searchDebounce ? `https://dummyjson.com/products/search?q=${searchDebounce}` : 'https://dummyjson.com/products/search?q='
            try {
                const response = await fetch(url, { signal: controller.signal })
                const data = await response.json()
                setData(data?.products)


            } catch (error) {
                console.error(error)

            }
            finally {
                setLoading(false)
            }
        }
        apiCall()

        return () => controller.abort()
    }, [searchValue, searchDebounce])

    const handleSuggestionClick = (item) => {
        setSearchValue(item)
        setData([])


    }

    return <div>




        <div>
            <input value={searchValue} onChange={handleSearch} />
        </div>
        {loading && <div>Loading ..</div>}
        <div>
            {
                data?.map(i => <div key={i?.id} style={{ cursor: 'pointer' }} onClick={() => handleSuggestionClick(i?.title)}> {i?.title}</div>)
            }
        </div>
        {!loading && !data?.length && searchDebounce && <div>No data Found.</div>}
    </div>

}

export default Search 