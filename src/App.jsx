import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [rows, setRows] = useState([
    { operator: "+", value: 0, disabled: false },
  ]);
  const [result, setResult] = useState(0);

  const addRow = () => {
    setRows([...rows, { operator: "+", value: 0, disabled: false }]);
  };

  const deleteRow = (index) => {
    let rowsCopy = [...rows];
    rowsCopy.splice(index, 1);
    setRows(rowsCopy);
  };

  const disableRow = (index) => {
    let rowsCopy = [...rows];
    rowsCopy[index].disabled = !rowsCopy[index].disabled;
    setRows(rowsCopy);
  };

  const setValue = (event, index) => {
    let rowsCopy = [...rows];
    const newValue = parseFloat(event.target.value) || 0;
    rowsCopy[index].value = newValue;
    setRows(rowsCopy);
  };

const cambioSegno = (index)=>{
  let rowsCopy = [...rows];
  rowsCopy[index].operator == '+' ? rowsCopy[index].operator = '-' : rowsCopy[index].operator = '+';
  setRows(rowsCopy);
}

  useEffect(() => {
    setResult(0);
    rows.map((row) => {
      if (row.operator == '+' && row.disabled == false) {
        setResult((prev) => prev + row.value);
      } else if (row.operator == '-' && row.disabled == false) {
        setResult((prev) => prev - row.value);
      }
    });
  }, [rows]);

  return (
    <div>
      <h1>Calculator</h1>
      <div className="wrapper">
        <div>
          <button onClick={addRow}>Add row</button>
        </div>
        <ul>
          {rows.map((row, index) => (
            <li key={index}>
              <select defaultValue="+" onChange={()=>cambioSegno(index)}>
                <option value='+'>+</option>
                <option value='-'>-</option>
              </select>
              <input
                type="text"
                value={row.value}
                onChange={(event) => setValue(event, index)}
              />
              <button onClick={() => deleteRow(index)}>Delete</button>
              <button onClick={() => disableRow(index)}>
                {row.disabled ? "disabled" : "enabled"}
              </button>
            </li>
          ))}
        </ul>
        <div>Risultato: {result}</div>
      </div>
    </div>
  );
}

export default App;
