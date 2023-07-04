import { ChangeEvent } from "react"

interface SearchBarProps{
    searchValue: string, 
    setSearchValue: (value: string) => void, 
    isLoading: boolean,
    onSearch: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchValue, setSearchValue, onSearch, isLoading }) => {
    
    function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setSearchValue(e.target.value);
    }
    
    return(
        <div className="d-flex search-bar w-50">
            <input 
                type="text"
                id="searchValue"
                placeholder="Rechercher..."
                disabled={isLoading}
                value={searchValue}
                onChange={handleValueChange} 
            />
            <i onClick={onSearch} className="bi bi-search"></i>
        </div>
    )
}

export default SearchBar;