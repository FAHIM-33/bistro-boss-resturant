import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useMenu = () => {
    const axiosPublic = useAxiosPublic()
    // const [menu, setMenu] = useState([])
    // const [loading, setLoading] = useState(true)
    // const axios = useAxios()

    // useEffect(() => {

    //     axios.get('/menu')
    //         .then(res => {
    //             setMenu(res.data)
    //             setLoading(false)
    //         })
    //         .catch(err => console.log(err))
    // }, [axios])
    async function getMenu() {
        let res = await axiosPublic.get('/menu')
        return res.data
    }

    const { data, isLoading: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: getMenu
    })

    return [data, loading, refetch]
}
export default useMenu