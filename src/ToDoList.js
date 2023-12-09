import { useEffect, useState } from 'react';
import { checked } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { addList, checkBox } from './services/action';

const ToDoList = () => {

  const dispatch = useDispatch();
  const List = useSelector((state) => state.toDoList);
  const [status, setstatus] = useState("ALL");
  const [active, setActive] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [list, setList] = useState('');
  const id = Date.now().toString().slice(9, 13);

  useEffect(() => {
    if (List.length !== 0) {
      filtering();
    } else {
      setActive([]);
      setCompleted([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [List])

  const filtering = () => {
    let findActive = List.filter((value) => value.checked === false);
    setActive(findActive);
    let findCompleted = List.filter((value) => value.checked === true);
    setCompleted(findCompleted);
  }

  const submitList = (e) => {
    if (e.key === "Enter") {
      let list = e.target.value.trim();
      if (list !== '') {
        dispatch(addList(list, id));
        setList('');
      }
    }
  }

  const boxClick = (e, id) => {
    let temp = checked(List, id, e.target.checked);
    dispatch(checkBox(temp))
  }

  const filterClick = (filter) => {
    if (filter === "ACTIVE") {
      setstatus("ACTIVE");
    } else if (filter === "COMPLETED") {
      setstatus("COMPLETED");
    } else {
      setstatus("ALL");
    }
  }

  const removeList = (id) => {
    let temp = List.filter((content) => content.id !== id);
    dispatch(checkBox(temp));
  }

  const removeCompleted = () => {
    console.log("completed", completed);
    let temp = List.filter((obj) => obj.checked !== true);
    dispatch(checkBox(temp));
  }
  console.log("List", List);
  return (
    <div className="main">
      <h1 className='align'>To Do List</h1>
      <div className='sizeing'>
        <div className='container formWidth listAlignCenter'>
          <div className='container'>
            <input type={"text"} name='listInput' placeholder='Add On Your Tasks..!!' onKeyPress={submitList} onChange={(e) => setList(e.target.value)} value={list} className='input'></input>
            <h1 className='align marginNone'>{`${status} TASK`}</h1>
          </div>
          <div className='effects'>
            {List.length === 0 ?
              <div className='to-do-list input container'>List Down Your Events Here 👇</div>
              : status === "ACTIVE" ? active.length === 0 ?
                <div className='to-do-list input container'>No Active Events Here 👇</div>
                : active.map((content, index) => {
                  return (
                    <div key={index} className='to-do-list input'>
                      <div key={index} className=' container listJustify'>
                        <div className='childOne'>
                          <input checked={content.checked} onChange={(e) => boxClick(e, content.id)} className='checkBox' type={"checkbox"}></input>
                          <label>{content.list}</label>
                        </div>
                        <div className='childTwo'><button onClick={() => removeList(content.id)} className='removeButton input'>remove</button></div>
                      </div>
                    </div>
                  )
                })
                : status === "COMPLETED" ? completed.length === 0 ?
                  <div className='to-do-list input container'>No Completed Events Here 👇</div>
                  : completed.map((content, index) => {
                    return (
                      <div key={index} className='to-do-list input'>
                        <div key={index} className=' container listJustify'>
                          <div className='childOne'>
                            <input checked={content.checked} onChange={(e) => boxClick(e, content.id)} className='checkBox' type={"checkbox"}></input>
                            <label className={content.checked === true ? "wordStrike" : ""}>{content.list}</label>
                          </div>
                          <div className='childTwo'><button onClick={() => removeList(content.id)} className='removeButton input'>remove</button></div>
                        </div>
                      </div>
                    )
                  })
                  : List.map((content, index) => {
                    return (
                      <div key={index} className='to-do-list input'>
                        <div key={index} className=' container listJustify'>
                          <div className='childOne'>
                            <input checked={content.checked} onChange={(e) => boxClick(e, content.id)} className='checkBox' type={"checkbox"}></input>
                            <label className={content.checked === true ? "wordStrike" : ""}>{content.list}</label>
                          </div>
                          <div className='childTwo'>
                            <button onClick={() => removeList(content.id)} className='removeButton input'>remove</button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
          </div>
          <div className='to-do-list input'>
            <div className='container align'>
              <div className='flexGrow '>
                <label>Total Items {List.length}</label>
                <button onClick={() => filterClick("ALL")} className='button input filteringButtons'><label>All Task</label></button>
              </div>
              <div className='flexGrow'>
                <label>Active Items {active.length}</label>
                <button onClick={() => filterClick("ACTIVE")} className='button input filteringButtons'>Active Task</button>
              </div>
              <div className='flexGrow'>
                <label>Completed Items {completed.length}</label>
                <button onClick={() => filterClick("COMPLETED")} className='button input filteringButtons'>Completed Task</button>
              </div>
              <div className='flexGrow'>
                <label>Clear Completed Tasks</label>
                <button onClick={removeCompleted} className='button input filteringButtons'>Clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
