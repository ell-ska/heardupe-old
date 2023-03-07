import './search.css'
import '../css/components/input.css'

const Search = () => {
    return (
        <div className="search">
            <div className="search__inner">
                <form action="post" className="search__bar">
                    <input type="text" placeholder="Search for an artist"/>
                </form>
                <div className="search__results">

                </div>
            </div>
        </div>
    )
}

export default Search