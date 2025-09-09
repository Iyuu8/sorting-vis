import { useEffect, useState } from "react";

const bubbleSort= async (arrStuff)=>{
  const [arr,setArr]=arrStuff;
  const tempArr=[...arr];
  let swaped;
  let c=0;
  do{
    c++;
    swaped = false;
    for(let i=0;i<arr.length-c;i++){
      if(tempArr[i]>tempArr[i+1]){
        swaped=true;
        [tempArr[i],tempArr[i+1]]=[tempArr[i+1],tempArr[i]]
        setArr([...tempArr]);
        await new Promise(resolve=> setTimeout(resolve,10));
      }
    }
  }while(swaped)
}


const randArr=(n)=>{
  const arr=[];
  for(let i=0;i<n;i++){
    arr.push(Math.floor(Math.random()*1000));
  }
  return arr;
}

function App() {
  const [arr,setArr]=useState(randArr(100));
  return (
    <div className="App">
      <div className="sorting-container">
        <div className="sorting-container-1">
          <ul className="sorting-1">
            {arr.map((item,ind)=>(
              <li 
                className="sort-item"
                key={`sort1-${ind}`}
                style={{
                  backgroundColor:"green",
                  width:`${Math.floor(item/3)}px`,
                  height: '6px'
                }}
              ></li>
            ))

            }
          </ul>
          <button 
            className="start-sort"
            onClick={async ()=> bubbleSort([arr,setArr])}
          > start sort 1</button>
        </div>
        <div className="sorting-container-2">
          <ul className="sorting-2">

          </ul>
          <button className="start-sort"></button>

        </div>
      </div>
      
    </div>
  );
}

export default App;
