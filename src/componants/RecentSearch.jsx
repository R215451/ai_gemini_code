const RecentSearch = ({
  recentHistory,
  setRecentHistory,
  setSearchHistory,
}) => {
  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };
  return (
    <>
      <div className="col-span-1 dark:bg-zinc-800 bg-amber-50 text-white p-1">
        {/* This is Questions history Div */}
        <h1 className="flex justify-center dark:text-zinc-200 text-blue-500 text-xl p-3">
          <span>Recent Search</span>
          <button onClick={clearHistory} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#EA3323"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        </h1>
        <ul className="text-left overflow-auto text-sm">
          {recentHistory &&
            recentHistory.map((question, index) => (
              <li
                key={index}
                onClick={() => setSearchHistory(question)}
                className="p-2 m-1 text-sm text-zinc-300 cursor-pointer truncate rounded-md transition-all duration-200 
                dark:bg-linear-to-r from-blue-950 to-zinc-700 bg-zinc-700
                hover:bg-linear-to-r hover:from-blue-950 hover:to-teal-700/40 hover:text-white hover:pl-3 active:bg-zinc-700"
              >
                {question}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default RecentSearch;
