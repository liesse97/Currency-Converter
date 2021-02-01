import React from 'react'


export default function Row(props) {
    const {
         rowoptions,
         chosenCurrency,
         selectChange,
         onchangenumber,
         calculate
        } =props
    return (
        <div>
          <input type="number" value={calculate} className="num_input" onChange={onchangenumber}/>
          <select value={chosenCurrency} onChange={selectChange}>
              {rowoptions.map(option =>(
                  <option 
                  key={option} 
                  value={option}>
                      {option}
                      </option>
              ))}
          </select>
        </div>
    )
}
