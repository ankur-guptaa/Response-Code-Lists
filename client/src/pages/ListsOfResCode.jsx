import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header.jsx";
import NavigationBar from "../Components/NavigationBar.jsx";

const ListsOfResCode = () => {
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(null);

  const getLists = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/function/lists`,
        { headers: { token: JSON.parse(localStorage.getItem("token")) } }
      );
      setLists(res.data.lists);
      if (res.data.lists.length > 0) setCurrentList(res.data.lists[0]);
    } catch (error) {
      //   console.log(error);
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <div className=" w-screen flex flex-col items-center gap-5 mb- ">
      <div
        className=" w-full flex flex-col gap-5"
        style={{ "max-height": "25vh" }}
      >
        <NavigationBar></NavigationBar>
        <Header heading="All Lists"></Header>
      </div>
      <div
        className=" w-full flex justify-center gap-5"
        style={{ "max-height": "75vh" }}
      >
        <div className="w-1/4 flex flex-col items-center">
          <div className=" w-full flex items-center justify-center text-xl font-semibold p-4">
            City List
          </div>
          <div className=" w-3/4  border border-gray-300 rounded-lg max-h-96 overflow-y-auto">
            {lists.map((list) => {
              return (
                <div className=" w-full">
                  <div
                    className={` w-full flex flex-col border border-gray-300 p-2 ${
                      currentList == list ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    <button
                      className=" w-full flex justify-center"
                      onClick={() => {
                        setCurrentList(list);
                      }}
                    >
                      {list.name}
                    </button>
                    {currentList == list ? (
                      <div className=" flex justify-around">
                        <button className=" border border-gray-300 rounded-md px-4 bg-gray-200 text-black">
                          Edit
                        </button>
                        <button
                          className=" border border-gray-300 rounded-md px-2 bg-gray-200 text-black"
                          onClick={async () => {
                            try {
                              const res = await axios.get(
                                `${
                                  import.meta.env.VITE_SERVER_URL
                                }/function/delete/?objectId=${currentList._id}`,
                                {
                                  headers: {
                                    token: JSON.parse(
                                      localStorage.getItem("token")
                                    ),
                                  },
                                }
                              );
                              setLists(res.data.lists);
                              setCurrentList(null);
                            } catch (error) {
                              //   console.log(error);
                              alert(error.response.data);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div>
                    <hr className=" w-full border border-gray-300"></hr>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className=" w-3/4 flex flex-col items-center gap-2 overflow-y-scroll">
          <div className=" w-3/4 flex items-center justify-center border border-gray-300 rounded-lg p-5 my-5 font-semibold">
            {currentList
              ? currentList.name
              : "There are no lists available. Create one on the Search page."}
          </div>

          <div className="w-full flex flex-wrap justify-center px-32">
            {currentList ? (
              currentList.list.map((element, index) => {
                return (
                  <div className=" w-1/4 p-5">
                    <img src={element.imgLink} className="w-full h-auto"></img>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <div className=""></div>
      </div>
    </div>
  );
};

export default ListsOfResCode;
