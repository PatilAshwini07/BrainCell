import React, { useEffect, useState } from "react";
import "../components/Fetchdata.css"; 

const Fetchdata = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");

   
    async function showData() {
        try {
            let res = await fetch("https://jsonplaceholder.typicode.com/users");
            let data = await res.json();
            setFetchedData(data);
            setFilteredData(data);
        } catch (e) {
            console.error("Error fetching data:", e);
        }
    }

   
    useEffect(() => {
        showData();
    }, []);

    
    const handleChange = (e) => {
        let searchData = e.target.value;
        setSearch(searchData);

        const filtered = fetchedData.filter(item =>
            item.name.toLowerCase().includes(searchData.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div className="parent">
                <div className="search-container">
                    <label className="search-label">Name:</label>
                    <input
                        type="text"
                        value={search}
                        onChange={handleChange}
                        placeholder="Filter by name"
                        className="search-input"
                    />
                </div>
                <div className="data-container">
                    {filteredData.map((ele) => (
                        <div key={ele.id} className="card">
                            <p className="card-title">{ele.name}</p>
                            <p className="card-text">{ele.email}</p>
                        </div>
                    ))}
                </div>
        
        </div>
    );
};

export default Fetchdata;
