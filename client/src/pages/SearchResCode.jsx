import { useState } from "react";
import axios from "axios";
import Header from "../Components/Header.jsx";
import NavigationBar from "../Components/NavigationBar.jsx";

const SearchResCode = () => {
  const [numCode, setNumCode] = useState(1);
  const [listName, setListName] = useState("");
  const [codeList, setCodeList] = useState([""]);
  const [resCodeList, setResCodeList] = useState([]);
  const [customizeList, setCustomizeList] = useState([]);

  return (
    <div className=" w-screen flex flex-col items-center gap-5 mb-24">
      <NavigationBar></NavigationBar>
      <Header heading="Search List"></Header>

      <div className=" w-full flex flex-col justify-center gap-2">
        {Array(numCode)
          .fill()
          .map((element, index) => {
            return (
              <div className=" w-full flex justify-center">
                <div className=" w-1/6 flex items-center justify-center">
                  Enter the Response Code
                </div>
                <div className=" w-3/6">
                  <input
                    type="text"
                    placeholder="Eg. 2xx"
                    value={codeList[index]}
                    className=" w-full border border-gray-400 rounded-xl p-2"
                    onChange={(e) => {
                      const updatedCodeList = [...codeList];
                      updatedCodeList[index] = e.target.value;
                      setCodeList(updatedCodeList);
                      // console.log(codeList);
                    }}
                  ></input>
                </div>
              </div>
            );
          })}
      </div>

      <div className=" w-7/12 flex justify-center">
        <div className=" w-full flex justify-start">
          <button
            className=" bg-blue-500 text-white text-sm rounded-lg px-2 py-2"
            onClick={() => {
              if (numCode == 1) return;
              setNumCode(numCode - 1);
              const updatedCodeList = codeList;
              updatedCodeList.pop();
              setCodeList(updatedCodeList);
            }}
          >
            Remove Response Code
          </button>
        </div>
        <div className=" w-full flex justify-center">
          <button
            className=" bg-blue-600 text-white text-xl rounded-lg px-20 py-2"
            onClick={async (e) => {
              try {
                const res = await axios.post(
                  `${import.meta.env.VITE_SERVER_URL}/function/search`,
                  { res_codes: codeList },
                  {
                    headers: {
                      token: JSON.parse(localStorage.getItem("token")),
                    },
                  }
                );
                setResCodeList(res.data.resCodeList);
                setCustomizeList(res.data.customizeList);
              } catch (error) {
                alert(error.response.data);
              }
            }}
          >
            Search
          </button>
        </div>
        <div className=" w-full flex justify-end">
          <button
            className=" bg-blue-500 text-white text-sm rounded-lg px-2 py-2"
            onClick={() => {
              setNumCode(numCode + 1);
              const updatedCodeList = codeList;
              updatedCodeList.push("");
              setCodeList(updatedCodeList);
            }}
          >
            Add Response Code
          </button>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-center px-32">
        {resCodeList.map((element, index) => {
          return (
            <div className=" w-1/4 p-5">
              <img src={element.imgLink} className="w-full h-auto"></img>
            </div>
          );
        })}
      </div>

      <div className="w-full flex justify-center">
        <div className=" w-1/6 flex items-center justify-center">
          Enter the List Name
        </div>
        <div className=" w-3/6">
          <input
            type="text"
            placeholder="Eg. List 5"
            value={listName}
            className=" w-full border border-gray-400 rounded-xl p-2"
            onChange={(e) => {
              setListName(e.target.value);
            }}
          ></input>
        </div>
      </div>

      <div className=" w-7/12 flex justify-center">
        <div className=" w-full flex justify-center">
          <button
            className=" bg-blue-600 text-white text-xl rounded-lg px-20 py-2"
            onClick={async (e) => {
              try {
                const res = await axios.post(
                  `${import.meta.env.VITE_SERVER_URL}/function/savelist`,
                  { listName, customizeList },
                  {
                    headers: {
                      token: JSON.parse(localStorage.getItem("token")),
                    },
                  }
                );
                alert("List have been saved.");
                setNumCode(1);
                setListName("");
                setCodeList([""]);
                setResCodeList([]);
                setCustomizeList([]);
              } catch (error) {
                alert(error.response.data);
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResCode;
