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

const insertionSort= async ([arr,setArr],tempArr=null)=>{
  if(!tempArr) tempArr=[...arr];
  for(let i=0;i<tempArr.length;i++){
    let key=tempArr[i];
    let j=i-1;

    while(j>=0 && tempArr[j].val>key.val){
      tempArr[j+1]=tempArr[j];
      tempArr = tempArr.map((item,ind)=> ind===j+1? {...item,color:true}:{...item,color:false});
      setArr([...tempArr]);
      await new Promise(r=> setTimeout(r,20));
      j--;
    }
    tempArr[j+1]=key;
    tempArr = tempArr.map((item,ind)=> ind===j+1? {...item,color:true}:{...item,color:false});
    setArr([...tempArr]);
  }
  tempArr = tempArr.map((item,ind)=> ({...item,color:false}));
  setArr([...tempArr]);
}

const bogoSort=async ([arr,setArr],tempArr=null)=>{
  if(!tempArr) tempArr=[...arr];
  const isSorted=(tempArr)=>{
    let res=true;
    let i=0;
    while(res && i<tempArr.length-1){
      res = tempArr[i].val <= tempArr[i+1].val;
      i++;
    }
    return res;
  }
  const shuffle=(tempArr)=>{
    const res= new Array(tempArr.length);
    const exist = new Set();
    let i;
    tempArr.forEach((item,ind)=>{
      do{
        i=Math.floor(Math.random()*tempArr.length);
      }while(exist.has(i));
      exist.add(i);
      res[i]=item;
    })

    return res;
  }

  while(!isSorted(tempArr)){
    tempArr=shuffle(tempArr);
    setArr([...tempArr]);
    await new Promise(r=>setTimeout(r,100));
  }
}

const heapSort= async ([arr,setArr])=>{
  const siftUp= async ([arr,setArr],heap,i)=>{
    let parent = Math.floor((i-1)/2);
    while(parent>=0 && heap[i].val>heap[parent].val){
      [heap[i],heap[parent]]=[heap[parent],heap[i]];
      setArr([...heap]);
      i=parent;
      parent = Math.floor((i-1)/2);
      await new Promise(r=> setTimeout(r,20));
    }
    return heap;
  }
  const siftDown= async ([arr,setArr],heap,i,n=heap.length)=>{
    let child=null;
    if(i*2+1 < n) child = i*2+1;
    if(i*2+2 < n) child = (child  && heap[i*2+2].val>heap[child].val)? i*2+2:child;
    while(child  && heap[child].val>heap[i].val){
      [heap[child],heap[i]]=[heap[i],heap[child]];
      heap.forEach((item,ind)=> item.color= (ind===i || ind===n));
      setArr([...heap]);
      i = child; 
      child = null;
      if(i*2+1 < n) child = i*2+1;
      if(i*2+2 < n) child = (child  && heap[i*2+2].val>heap[child].val)? i*2+2:child;
      await new Promise(r=> setTimeout(r,31));
    }
    
    return heap;
  }
  const buildHeap= async ([arr,setArr],heap)=>{
    for(let i=Math.floor(heap.length / 2)-1;i>=0;i--) await siftDown([arr,setArr],heap,i);
    return heap;
  }

  let heap = await buildHeap([arr,setArr],[...arr]);
  for(let end=heap.length-1;end>0;end--){
    [heap[0],heap[end]]=[heap[end],heap[0]];
    
    heap = await siftDown([arr,setArr],heap,0,end);
    
  }
  heap.forEach((item,ind)=> item.color=false);
  setArr([...heap]);
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
              heapSort([arr1,setArr1]);
              mergeSort([arr2,setArr2]);
            }}
          > start sort 1</button>

        </div>
      <div className="sorting-container">
        <div className="sorting-container-ind">
          <h2>heap Sort</h2>
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
          <h2>merge Sort</h2>
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
