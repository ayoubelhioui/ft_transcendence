
const Conversations = () => {

  const isBool: boolean = false;

  return (
    !isBool ? (
      <div className="flex top_2 col-span-2 h-[950px] row-span-2 ">
        {/* Your content here */}
      </div>
    ) : 
    <div className="flex top_2 col-span-3 h-[950px] row-span-2 ">
        {/* Your content here */}
    </div>
  )
}

export default Conversations
