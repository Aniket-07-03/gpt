import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Search,
  TrendingUp,
  Clock,
  X,
} from "lucide-react";
import { searchData } from "./Navigation";
import { useNavigate } from "react-router-dom";

const Globalfilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    {name:"Pune",route:"/districts/pune"},
        {name:"Haveli",route:"/block/Haveli"},
       {name:"Dhoksanghavi",route:"/block/shirur/village/Dhoksanghavi"},

  ]);
  const [filteredData, setFilteredData] = useState(searchData);
  const router = useNavigate();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !searchRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(searchData);
    } else {
      const filtered = searchData.map(group => ({
        ...group,
        items: group.items.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(group => group.items.length > 0);
      setFilteredData(filtered);
    }
  }, [searchQuery]);

  const handleSearch = (value) => {
    setSearchQuery(value);
    setIsOpen(true);
  };

  const handleItemSelect = (groupName, value) => {
    setSearchQuery(value);
    setIsOpen(false);
    
    // Add to recent searches if not already present
    if (!recentSearches.includes(value)) {
      setRecentSearches(prev => [value, ...prev.slice(0, 4)]);
    }
    
    console.log(groupName.toLowerCase() == "village", "groupName");
    if (groupName.toLowerCase() == "village") {
      router(`block/shirur/${groupName.toLowerCase()}/${value}`);
    } else if (groupName.toLowerCase() == "Block") {
      router(`block/${value}`);
    } else {
      router(`${groupName}/${value}`);
    }
  };

  const handleRecentSearch = (search) => {
    // setSearchQuery(search);
    setIsOpen(false);
    // Navigate based on the search type - you may need to adjust this logic
    router(search.route);
  };

  const clearRecentSearch = (search, e) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter(item => item !== search));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-3 w-3 text-yellow-500" />;
      default:
        return <TrendingUp className="h-3 w-3 text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-gradient-to-r from-green-50 to-emerald-50";
      case "warning":
        return "text-yellow-600 bg-gradient-to-r from-yellow-50 to-orange-50";
      default:
        return "text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50";
    }
  };

  return (
    <div className="flex justify-end w-full mb-8">
      <div className="relative w-full max-w-2xl">
        {/* Search Input */}
        <div 
          ref={searchRef}
          className="relative w-full"
        >
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="p-1 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg shadow-lg">
                <Search className="h-4 w-4 text-white" />
              </div>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsOpen(true)}
              placeholder="Search districts, blocks, villages..."
              className="w-full pl-16 pr-4 py-4 bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 focus:shadow-blue-500/30 transition-all duration-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700 font-medium text-lg placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div 
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl overflow-hidden z-50 max-h-96 overflow-y-auto"
          >
            {/* Recent Searches */}
            {searchQuery === "" && recentSearches.length > 0 && (
              <div className="p-4 border-b border-gray-100/50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg shadow-lg">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-gray-800 text-lg">Recent Searches</span>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      onClick={() => handleRecentSearch(search)}
                      className="flex items-center justify-between p-3 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-blue-50/80 rounded-xl cursor-pointer transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700 font-medium">{search.name}</span>
                      </div>
                      <button
                        onClick={(e) => clearRecentSearch(search, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded-lg transition-all duration-200"
                      >
                        <X className="h-3 w-3 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {filteredData.length === 0 ? (
              <div className="py-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl shadow-lg">
                    <Search className="h-8 w-8 text-blue-500" />
                  </div>
                  <p className="text-gray-700 font-semibold text-lg">
                    No results found.
                  </p>
                  <p className="text-sm text-gray-500">
                    Try searching for districts, blocks, villages, or fund types.
                  </p>
                </div>
              </div>
            ) : (
              filteredData.map((group) => {
                const IconComponent = group.icon;
                return (
                  <div key={group.category} className="p-2">
                    {/* Group Header */}
                    <div className="flex items-center space-x-4 py-3 px-4 bg-gradient-to-r from-gray-50/80 to-blue-50/80 backdrop-blur-lg rounded-xl mb-2 shadow-lg border border-white/50">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg">
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-bold text-gray-800 text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {group.category}
                      </span>
                    </div>
                    
                    {/* Group Items */}
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <div
                          key={item.name}
                          onClick={() => handleItemSelect(group.category, item.name)}
                          className="cursor-pointer group px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-purple-50/80 transition-all duration-300 rounded-xl border-0 hover:shadow-lg bg-white/40 backdrop-blur-lg"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-white/80 backdrop-blur-lg rounded-lg shadow-md border border-white/50">
                                {getStatusIcon(item.status)}
                              </div>
                              <span className="font-semibold text-gray-800">
                                {item.name}
                              </span>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="p-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg">
                                <ArrowRight className="h-3 w-3 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Globalfilter;