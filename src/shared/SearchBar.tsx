import { ChangeEvent, FormEvent, useState } from "react"

interface SearchBarProps {
    searchValue: string,
    setSearchValue: (searchValue: string) => void,
    isLoading: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({ searchValue, setSearchValue, isLoading }) => {

    const [localSearchValue, setLocalSearchValue] = useState(searchValue);

    function handleLocalSearchValueChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setLocalSearchValue(e.target.value);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (searchValue !== localSearchValue) {
            setSearchValue(localSearchValue);
        }
    }

    function clearSearchValue() {
        setSearchValue("");
        setLocalSearchValue("");
    }

    return (
        <form onSubmit={handleSubmit} className="search-bar input-group mb-3 w-50">
            <input
                className="form-control"
                type="text"
                id="searchValue"
                placeholder="Rechercher..."
                disabled={isLoading}
                value={localSearchValue}
                onChange={handleLocalSearchValueChange}
            />
            <div className="input-group-append">
                <button disabled={isLoading} className="btn btn-outline-secondary search-button" type="submit">
                    <i className="bi bi-search"></i>
                </button>
            </div>
            { localSearchValue.length !== 0 &&
                <div className="ms-3">
                    <button disabled={isLoading} onClick={clearSearchValue} className="btn btn-danger">
                        <i className="bi bi-filter"></i>
                    </button>
                </div>
            }
        </form>
    )
}

export default SearchBar;