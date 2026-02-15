const DataLoader = () => {
  return (
    <div className="w-full sm:py-20 py-10 flex flex-col items-center justify-center gap-3 text-center">
      <div className=" text-[#e59e3b] ">
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-xl"></span>
      </div>
      <p className="text-[#e59e3b]  font-semibold animate-pulse">Loading...</p>
    </div>
  );
};

export default DataLoader;
