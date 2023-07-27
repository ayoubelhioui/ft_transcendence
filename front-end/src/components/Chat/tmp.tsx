// const Dialog = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openDialog = () => {
//     setIsOpen(true);
//   };

//   const closeDialog = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div>
//       {isOpen && (
//         <div className="fixed z-10 inset-0 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen">
//             <div className="fixed inset-0 bg-black opacity-30" onClick={closeDialog}></div>
//             <div className="bg-white rounded-lg w-1/2 p-6">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-lg font-medium">Dialog Title</h2>
//                 <button onClick={closeDialog}>X</button>
//               </div>
//               <div>
//                 <p>Dialog content goes here.</p>
//               </div>
//               <div className="flex justify-end">
//                 <button onClick={closeDialog} className="mr-2">
//                   Cancel
//                 </button>
//                 <button onClick={closeDialog} className="bg-blue-500 text-white">
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };






  


const Conversations = ({id, name} : {id : number, name : string}) => {

  
    const [isOpened, setIsOpened] = useState(false);
  
  
  
    return messages.data ? (

    ) : (
      <div className="flex top_2 col-span-3 h-[950px] row-span-2 ">
        {/* Your content here */}
      </div>
    );
  };




  {
    messages.data.reverse().map((item : any) => (
      item.user.id === authApp.user?.id ? <Sender key={item.id} message={item}/> : <Receiver key={item.id} message={item}/>
    ))
  }