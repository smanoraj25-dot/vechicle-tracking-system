import axios from "axios";
import  {useState}  from "react";
import  {IoClose}  from "react-icons/io5";
import  {FaSearch}  from "react-icons/fa";
import "./search.css"

function NavbarSearch({setSearchtoggle,searchtoggle}) {

  const [searchbox, setSearchbox] = useState("");
  const [results, setResults] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleSearch = async () => {

    const CX = "b221857cd8d694843";

    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1`,
        {
          params: {
            key: API_KEY,
            cx: CX,
            q: searchbox,
          },
        }
      );
      setResults(response.data.items);
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  return (
       <div className="search-nav">
           <div className="pos-ser-btn-p">
            <button className="nav-search-close-btn" onClick={() => setSearchtoggle(!searchtoggle)}><IoClose /></button>
              <h3 className="nav-search-title">Search Our Site</h3>
                  <div className="nav-ser-pro-pos">
                     <input type="text" value={searchbox} onChange={(e) => setSearchbox(e.target.value)}  onKeyDown={(e) => e.key === "Enter" && handleSearch()} className="nav-search" placeholder="Search for products.." />
                        <button className="inp-search-p-btn" onClick={() => {
                             handleSearch()
                            }}><FaSearch />
                        </button>
                                
                   </div>
            </div>

           {/* Search results dropdown */}
            {results?.length>0 && (
                <div className="search-results">
                {results.map((item) => (
                    <div key={item.link} className="search-item">
                    <a href={item.link} target="_blank" rel="noreferrer">
                        {item.title}
                    </a>
                    <p>{item.snippet}</p>
                    </div>
                ))}
                </div>
            )}
    </div>
  );
}

export default NavbarSearch