

const LeaderBoard = () => {
  return (
    <table className="table-auto w-full px-4">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Rank</th>
          <th className="py-3 px-6 text-left">Name</th>
          <th className="py-3 px-6 text-center">Score</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        <tr className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left whitespace-nowrap">1</td>
          <td className="py-3 px-6 text-left">{/* Name */}</td>
          <td className="py-3 px-6 text-center">{/* Score */}</td>
        </tr>
        <tr className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left whitespace-nowrap">2</td>
          <td className="py-3 px-6 text-left">{/* Name */}</td>
          <td className="py-3 px-6 text-center">{/* Score */}</td>
        </tr>
        <tr className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left whitespace-nowrap">3</td>
          <td className="py-3 px-6 text-left">{/* Name */}</td>
          <td className="py-3 px-6 text-center">{/* Score */}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default LeaderBoard;
