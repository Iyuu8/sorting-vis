import { color } from "framer-motion";
import { useEffect, useState } from "react";

const bubbleSort= async (arrStuff)=>{
  const [arr,setArr]=arrStuff;
  let tempArr=[...arr];
  let swaped;
  let c=0;
  do{
    c++;
    swaped = false;
    for(let i=0;i<arr.length-c;i++){
      if(tempArr[i].val>tempArr[i+1].val){
        swaped=true;
        [tempArr[i],tempArr[i+1]]=[tempArr[i+1],tempArr[i]]
        tempArr=tempArr.map((item,ind)=>ind===i? {...item,color:true}:{...item,color:false})
        setArr([...tempArr]);
        await new Promise(resolve=> setTimeout(resolve,20));
      }
    }
  }while(swaped)
  
  setArr(tempArr.map(item=>({...item,color:false})));
}

const mergeSort= async ([arr,setArr],tempArr=null,left=0,right=null)=>{
  if(!right) right = arr.length;
  if(!tempArr) tempArr=[...arr];

  if(right-left<=1) return;
  else{
    let mid = Math.floor((left+right)/2);
    await mergeSort([arr,setArr],tempArr,left,mid);
    await mergeSort([arr,setArr],tempArr,mid,right);

    let i=left;
    let j=mid;
    let k=left;
    let merged=[...tempArr];
    while(i<mid && j<right){
      if(tempArr[i].val < tempArr[j].val) merged[k++]=tempArr[i++];
      else merged[k++]=tempArr[j++];
      merged = merged.map((item,ind)=> ind===k? {...item,color:true}:{...item,color:false});
      setArr([...merged]);
      await new Promise(resolve => setTimeout(resolve,20));

    }
    while(i<mid){
      merged[k++]=tempArr[i++];
      setArr([...merged]);
      await new Promise(resolve => setTimeout(resolve,20));
    }
    while(j<right){
      merged[k++]=tempArr[j++];
      setArr([...merged]);
      await new Promise(resolve => setTimeout(resolve,20));
    }
    for(let t=left;t<right;t++) tempArr[t]=merged[t];
  }
}

const quickSort= async ([arr,setArr],tempArr=null,low=0,high=arr.length-1)=>{
  if(!tempArr) tempArr=[...arr];
  const partition= async ([arr,setArr],tempArr,low,high)=>{
    const pivot = tempArr[high].val;
    let i=low-1;
    for(let j=low;j<high;j++){
      if(tempArr[j].val<pivot){
        i++;
        [tempArr[i],tempArr[j]]=[tempArr[j],tempArr[i]];
        tempArr.forEach((item,ind) => item.color= ind===j);
        setArr([...tempArr]);
        await new Promise(resolve=> setTimeout(resolve,20));
      }
    }
    [tempArr[i+1],tempArr[high]]=[tempArr[high],tempArr[i+1]];
    tempArr.forEach((item,ind) => item.color= ind===i+1);
    tempArr.forEach((item,ind) => item.color= ind===i+1);
    setArr([...tempArr]);
    await new Promise(resolve=> setTimeout(resolve,20));
    return i+1;
  }

  if(low<high){
    let pi= await partition([arr,setArr],tempArr,low,high);
    await quickSort([arr,setArr],tempArr,low,pi-1);
    await quickSort([arr,setArr],tempArr,pi+1,high);
    tempArr.forEach(item => item.color=false);

  }
}

const randArr=(n)=>{
  const arr=[];
  for(let i=0;i<n;i++){
    arr.push({val:Math.floor(Math.random()*1000),color:false});
  }
  return arr;
}

function App() {
  const [arr1,setArr1]=useState(randArr(100));
  const [arr2,setArr2]=useState([...arr1]);
  return (
    <div className="App">
        <div className="start-btn-conatiner">
          <button 
            className="start-sort"
            onClick={async ()=>{ 
              //bubbleSort([arr1,setArr1]);
              quickSort([arr1,setArr1])
              mergeSort([arr2,setArr2]);
            }}
          > start sort 1</button>

        </div>
      <div className="sorting-container">
        <div className="sorting-container-ind">
          <h2>Quick Sort</h2>
          <ul className="sorting">
            {arr1.map((item,ind)=>(
              <li 
                className="sort-item"
                key={`sort1-${ind}`}
                style={{
                  backgroundColor:item.color? "red":"var(--bar-color)",
                  width:`${Math.floor(item.val/3)}px`,
                  height: `calc(100% / ${arr1.length})`,
                  borderTop:'1px solid var(--text-color)'
                }}
              ></li>
            ))}
          </ul>
          
        </div>
        <div className="sorting-container-ind">
          <h2>Merge Sort</h2>
          <ul className="sorting" style={{alignItems:'end'}}>
            {arr2.map((item,ind)=>(
              <li 
                className="sort-item"
                key={`sort2-${ind}`}
                style={{
                  backgroundColor:item.color? "red":"var(--bar-color)",
                  width:`${Math.floor(item.val/3)}px`,
                  height: `calc(100% / ${arr1.length})`,
                  borderTop:'1px solid var(--text-color)'
                }}
              ></li>
            ))}

          </ul>

        </div>
      </div>
      
    </div>
  );
}

export default App;
