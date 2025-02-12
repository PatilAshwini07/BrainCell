import React, { useEffect, useState } from "react";

const Fetchdata = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");

    async function showData() {
        try {
            let res = await fetch("https://jsonplaceholder.typicode.com/users");
            let data = await res.json();
            console.log(data);
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

        let filtered = fetchedData.filter(item =>
            item.name.toLowerCase().includes(searchData.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "18px", fontWeight: "bold", marginRight: "10px" }}>Name:</label>
                <input
                    type="text"
                    value={search}
                    onChange={handleChange}
                    placeholder="Filter by name"
                    style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", outline: "none" }}
                />
            </div>
            <div style={{ width: "100%", maxWidth: "400px" }}>
                {filteredData.map((ele) => (
                    <div key={ele.id} style={{ backgroundColor: "#fff", padding: "15px", marginBottom: "10px", borderRadius: "5px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", border: "1px solid #ddd" }}>
                        <p style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>{ele.name}</p>
                        <p style={{ color: "#555" }}>{ele.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Fetchdata;
