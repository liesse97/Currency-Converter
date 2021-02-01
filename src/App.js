import React, {useEffect,useState} from 'react';
import'./App.css';
import Row from './Row';

const Currency_url= 'https://api.exchangeratesapi.io/latest'
function App() {
  const[rowoptions,setRowOptions]= useState([])
  const[upCurrency,setUpCurrency]=useState()
  const[downCurrency,setDownCurrency]=useState()
  const[ratExchange, setRatExchange]=useState()
  const[calculate,setCalculate] =useState(1)
  //IF WE EXCHANGE FROM THE UP OR DOWN CURRENCY
  const[calculateChange,setcalculateChange]=useState(true)

  let upCalculate ,downCalculate
  if(upCurrency){
    upCalculate= calculate
    downCalculate= calculate*ratExchange
  }else{
     downCalculate= calculate
   upCalculate= calculate/ratExchange
  }
 



  useEffect(()=>{
    fetch(Currency_url)
    .then(res =>res.json())
    .then(data =>{
      const firstCurrency= Object.keys(data.rates)[0]
       setRowOptions([data.base, ...Object.keys(data.rates)])
       setUpCurrency(data.base)
       setDownCurrency(firstCurrency)
       //actually rate fron currency
       setRatExchange(data.rates[firstCurrency])
    })

  },[])
//change currency
useEffect(()=>{
  if(upCurrency != null && downCurrency!= null ){
    fetch(`${Currency_url}?base=${upCurrency}&symbols=${downCurrency}`)
        .then(res => res.json())
        .then(data => setRatExchange(data.rates[downCurrency]))
  }

},[upCurrency,downCurrency])

function handlerUpOptions(e){
setCalculate(e.target.value)
  setcalculateChange(true)

}
function handlerDownOptions(e){
setCalculate(e.target.value)
  setcalculateChange(false)

}

  return (
    <>
<h1>Convert</h1>
<Row  rowoptions={rowoptions}
chosenCurrency={upCurrency}
selectChange={e =>setUpCurrency(e.target.value)}
onchangenumber={handlerUpOptions}
calculate ={upCalculate}
/>


<div className= "equal" >=</div>

<Row
 rowoptions={rowoptions} 
chosenCurrency={downCurrency}
selectChange={e => setDownCurrency(e.target.value)}
onchangenumber={handlerDownOptions}
calculate={downCalculate}

/>
</>
    );
}

export default App;
