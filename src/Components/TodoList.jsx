import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, onValue,remove ,update} from "firebase/database";
const TodoList = () => {
  const database = getDatabase();
  const [list, setList] = useState([]);
  const [updateModal,setUpdateModal]=useState(false)
  const [did,setDid]=useState('')
  const [updateTask,setUpdateTask]=useState('')
  useEffect(() => {
    const starCountRef = ref(database, "todos/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];

      snapshot.forEach((item) => {

        arr.push({item:item.val(), id:item.key});
      });

      setList(arr);
    });
  }, []);

  let handleDelete=(item)=>{
    console.log(item.id);
    remove(ref(database, "todos/" + item.id ))
  }

  let handleUpdateModal=(item)=>{
    setUpdateModal(true)
    setDid(item.id)
  }

  const handleUpdate=()=>{
    console.log(did, updateTask);
    update(ref(database, "todos/" + did),{
      todo:updateTask,
    }).then(()=>{
      setUpdateModal(false)
    })
  }
  return (
    <div className="w-[250px] h-[200px] mx-auto mt-[20px] overflow-y-scroll relative">
      <ul>
        {list.map((Titem, i) => (
          <li
            key={i}
            className=" bg-slate-700 px-4 py-2 mb-5 text-white rounded flex justify-between"
          >
            {Titem.item.todo} 
            <button onClick={()=>handleUpdateModal(Titem)} className=" bg-green-500 py-2 px-2 text-xs ">Edit</button>
            <button onClick={()=>handleDelete(Titem)} className=" bg-red-500 py-2 px-2 text-xs ">Delete</button>
          </li>
        ))}
      </ul>

      {updateModal && 
        <div className=" w-full h-[500px] bg-red-500 absolute top-0 left-0  px-5">
          <h2>Update Your Todo List</h2>
          <input
        onChange={(e)=>setUpdateTask(e.target.value)}
          className="h-[30px] w-full px-4 outline-green-500 outline"
          type="text"
          name=""
          id=""
          placeholder="Write Something"
        />
        <div className="mt-5">
        <button  onClick={handleUpdate} className=" bg-green-500 py-2 px-2 text-xs ">Update</button>
         <button onClick={()=>setUpdateModal(false)}  className=" bg-green-500 py-2 px-2 text-xs ml-5 ">Cancel</button>
        </div>
        </div>
      }
    </div>
  );
};

export default TodoList;
