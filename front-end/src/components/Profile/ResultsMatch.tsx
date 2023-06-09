
const MatchDiv = () => {
  return (
    <div className="">

    </div>
  )
}

const ResultsMatch = () => {
  return (
    <div className="flex top_1 min-h-[200px] ml-2 text-gray-400 max-md:ml-0">
      <h1 className="text-2xl p-2">Match Results</h1>
      <div className="flex">
        <MatchDiv />
        <MatchDiv />
        <MatchDiv />
        <MatchDiv />
      </div>
    </div>
  )
}

export default ResultsMatch
