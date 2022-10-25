import { useEffect, useState } from "react"
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from "../../store/user";
import './SearchBar.css'

const SearchBar = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const allProfiles = useSelector(state => state.users)
    const [filterProfiles, setFilterProfiles] = useState([])
    const [search, setSearch] = useState('')

    console.log(allProfiles)

    useEffect(() => {
        dispatch(getAllUsers())
    })


    const handleSearch = (e) => {
        const profileSearch = e.target.value
        setSearch(profileSearch)
        const findUser = Object.values(allProfiles).filter(user => {
            return ((user.username.toLowerCase().includes(profileSearch.toLowerCase())) || user.firstName.toLowerCase().includes(profileSearch.toLowerCase()) || user.lastName.toLowerCase().includes(profileSearch.toLowerCase()))
        })
        profileSearch === '' ? setFilterProfiles([]) : setFilterProfiles(findUser)

    }
    const handleSubmit = () => {
        history.push(`/shoe/${filterProfiles[0].id}`)
        setFilterProfiles([])
        setSearch('')
    }
    const clearSearch = () => {
        setFilterProfiles([])
        setSearch('')
    }

    return (
        <div className='search-bar-container'>
            <form className="search-bar-input-container"
                onSubmit={handleSubmit}>
                <input
                    className='search-bar-input'
                    type='text'
                    value={search}
                    onChange={handleSearch}
                    placeholder='Search'
                />
            </form>
            <div>
                {search.length !== 0 ? <button className="clear-button" onClick={clearSearch}>X</button> : <button style={{ border: 'none' }}></button>}
            </div>
            <div className='shoe-search-results'>
                {
                    filterProfiles.slice(0, 10).map((shoe, idx) => (
                        <NavLink to={`/shoe/${shoe.id}`} style={{ textDecoration: 'none' }}>
                            <div className='dropdown-searchbar-results' key={idx} onClick={clearSearch} >
                                <div className='searchbar-image-container'>
                                    <img src={shoe.imageUrl} alt='shoe' className="searchbar-image"></img>
                                </div>
                                <div className="searchbar-text-container">
                                    <div>{shoe.name}</div>
                                    <div>{shoe.colorway}</div>
                                </div>
                            </div>
                        </NavLink>
                    ))
                }
            </div >
        </div >
    )
}

export default SearchBar
