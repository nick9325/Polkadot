"use client"

import { useCallSubscription, useContract, useTx } from 'useink';
import { useTxNotifications } from 'useink/notifications';
import { TODO_CONTRACT_ADDRESS } from '../constants';
import metadata from '../assets/todo_list.json';
import { pickDecoded } from 'useink/utils';
import { useState } from 'react';




function Todo() {

  const contract = useContract(TODO_CONTRACT_ADDRESS, metadata);
  const getSub = useCallSubscription(contract, 'getTasks', [], {
    defaultCaller: true,
  });


  const [task, setTask] = useState('');
  const [editIndex, setEditIndex] = useState(0)
  const [deleteIndex, setDeleteIndex] = useState(0)
  const [editedTask, setEditedTask] = useState('');
  const [Loading,setLoading] = useState(true);



  const addTask = useTx(contract, 'addTask');
  useTxNotifications(addTask);
  const deleteTask = useTx(contract, 'deleteTask');
  useTxNotifications(deleteTask)
  const editTask = useTx(contract, 'editTask');
  useTxNotifications(editTask)



  const handleAddTask = () => {
    addTask.signAndSend([task])
    setTask('');
  };

  const handleDeleteTask = () => {
    deleteTask.signAndSend([deleteIndex]);
    setDeleteIndex(0);
  };
  const handleEditTask = () => {
    editTask.signAndSend([editIndex, editedTask]);
    setEditIndex(0);
    setEditedTask('');
  };




  return (
    <div className="p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Smart contract name: <span className="text-blue-500">{metadata.contract.name}</span></h1>


      <p className="mb-4 flex flex-row">
                <span className="text-gray-600">Tasks:</span>
                {pickDecoded(getSub.result)?<p className="text-green-600 ml-2 font-bold">{pickDecoded(getSub.result)?.toString()}</p>:<p className='text-gray-500 ml-2'>Fetching..</p>}
       </p>

      <div className="mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New Task"
          className="border rounded-md p-2"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
        >
          Add Task
        </button>
      </div>

      <div className="mb-4">
        <input
          type="number"
          value={editIndex}
          onChange={(e) => setEditIndex(e.target.valueAsNumber)}
          placeholder="Index of task"
          className="border rounded-md p-2"
        />
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          placeholder="New name for task"
          className="border rounded-md p-2 ml-2"
        />
        <button
          onClick={handleEditTask}
          className="bg-yellow-500 text-white px-4 py-2 ml-2 rounded-md"
        >
          Edit Task
        </button>
      </div>

      <div>
        <input
          type="number"
          value={deleteIndex}
          onChange={(e) => setDeleteIndex(e.target.valueAsNumber)}
          placeholder="Enter index for task"
          className="border rounded-md p-2"
        />
        <button
          onClick={handleDeleteTask}
          className="bg-red-500 text-white px-4 py-2 ml-2 rounded-md"
        >
          Delete Task
        </button>
      </div>
    </div>

  )
}
export default Todo
