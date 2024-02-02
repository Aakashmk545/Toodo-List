
import { useState } from 'react';
import './Todoo.css';

function App() {

  const [val, setval] = useState("");
  const [val1, setval1] = useState([]);
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setsort] = useState([]);
  const [sival, setsival] = useState([])



  const add = () => {

    if (val == '') {
      alert("ENTER Value ");
    }
    else {
      if (edit !== false) {
        const updated = [...val1];
        setsival([...val1])

        updated[edit] = { val: val, checked: false };
        setval1(updated);
        setsort(updated);
        setEdit(false);
        setval("");
      }
      else {
        setval1([...val1, { val: val, checked: false }]);
        setsival([...val1])
        setsort([...val1, { val: val, checked: false }]);
        setval("");
      }
    }
  }



  const del = (index) => {

    let data = val1.filter((val, id) => {
      console.log("id =", id)
      return id !== index;
    })

    setval1(data);
    setsort(data);
  }


  const update = (index) => {
    setEdit(index);
    setval(val1[index].val);
  };

  const handlecheck = (index) => {
    const check = [...val1];
    check[index].checked = !check[index].checked;
    setval1(check);
    setsort(check);
  }

  const searchhanlder = () => {

    let info = sort.filter((val, id) => {
      return val.val === search;
    })
    console.log('info', info)
    setval1(info);
  }

  const completed = () => {
    let com = sort.filter((val, id) => {
      return val.checked === true ? val : false
    });
    setval1(com);
  }

  const uncompleted = () => {
    let uncom = sort.filter((val, id) => {
      return val.checked === false ? val : false
    });
    setval1(uncom);
  }

  const all = () => {
    var data = [...sort];
    setval1(data);
  }

  return (
    <div className='text-center box p-5'>
      <h1 className='m-5 h1'>TODO LIST</h1>
      <div className="ms-4 ">
        <div className='form' >
          <input type="text" className='me-3' value={val} placeholder='Enter val' onChange={(e) => { setval(e.target.value) }} />
          <input type='button' className='' value={"Add val"} onClick={() => { add() }} /><br />

          <input type='button' className='me-3' value={"Uncompleted"} onClick={() => { uncompleted() }} style={{ marginRight: "10px" }} />
          <input type='button' className='me-3' value={"Completed"} onClick={() => { completed() }} style={{ marginRight: "10px" }} />
          <input type='text' className='my-3 me-3' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
          <input type='button' className='me-3' value={"Search"} onClick={() => { searchhanlder() }} />

          <input type='button' className='me-3' value={"All"} onClick={() => { all() }} style={{ marginRight: "10px" }} />

        </div>

        <table border={0} className='m-auto'>
          {
            val1.map((ele, index) => {
              return (
                <tr className='list' key={index} >

                  <td>{index + 1}<input type='checkbox' className='mx-3' checked={ele.checked} onChange={() => handlecheck(index)} /></td>
                  <td><input className="me-2" style={{ textDecoration: ele.checked ? "line-through" : "" }} value={ele.val}></input></td>
                  <td><input type='button' value={"Delete"} className='del me-3' onClick={() => { del(index) }} /></td>
                  <td><input type='button' value={"Edit"} onClick={() => { update(index) }} /></td>

                </tr>
              )
            })
          }
        </table>
      </div>


    </div>
  );
}

export default App;
