import { useEffect, useState } from "react";


// Create a single AudioContext outside the sort
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const playBeep = (frequency = 440, duration = 100, volume = 0.5, type = 'square') => {
  const oscillator = audioCtx.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration / 1000);
};

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
        [tempArr[i],tempArr[i+1]]=[tempArr[i+1],tempArr[i]];
        
        tempArr=tempArr.map((item,ind)=>ind===i? {...item,color:'red'}:{...item,color:'var(--bar-color)'});
        setArr([...tempArr]);
        const freq = 200 + (tempArr[i].val / 800) * 800;
        playBeep(freq, 30, 0.3, 'square');
        await new Promise(resolve=> setTimeout(resolve,20));
      }
      
    }
  }while(swaped)
  
  setArr(tempArr.map(item=>({...item,color:'var(--bar-color)'})));
  return [...tempArr];
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
      merged = merged.map((item,ind)=> ind===k? {...item,color:'red'}:{...item,color:'var(--bar-color)'});
      setArr([...merged]);
      const freq = 200 + (tempArr[i].val / 800) * 800;
      playBeep(freq, 30, 0.3, 'square');
      await new Promise(resolve => setTimeout(resolve,20));

    }
    while(i<mid){
      merged[k++]=tempArr[i++];
      setArr([...merged]);
      const freq = 200 + (tempArr[i].val / 800) * 800;
      playBeep(freq, 30, 0.3, 'square');
      await new Promise(resolve => setTimeout(resolve,20));
    }
    while(j<right){
      merged[k++]=tempArr[j++];
      setArr([...merged]);
      const freq = 200 + (tempArr[i].val / 800) * 800;
      playBeep(freq, 30, 0.3, 'square');
      await new Promise(resolve => setTimeout(resolve,20));
    }
    for(let t=left;t<right;t++) tempArr[t]=merged[t];
    return [...tempArr];
  }
}

const quickSort= async ([arr,setArr],tempArr=null,low=0,high=arr.length-1)=>{
  if(!tempArr) {
    tempArr=[...arr]
    setTimeout(() => playBeep(200+(10/800)*800, 30, 0.3, 'square'), 0);
  };
  if(low<high){
    const pivot = tempArr[high].val;
    let i=low-1;
    for(let j=low;j<high;j++){
      if(tempArr[j].val<pivot){
        i++;
        const freq = 200 + (tempArr[i].val / 800) * 800;
        setTimeout(() => playBeep(freq, 30, 0.3, 'square'), 0);
        [tempArr[i],tempArr[j]]=[tempArr[j],tempArr[i]];
        tempArr.forEach((item,ind) => item.color= ind===j? 'red':'var(--bar-color)');
        setArr([...tempArr]);
        await new Promise(resolve=> setTimeout(resolve,20));
      }
    }
    [tempArr[i+1],tempArr[high]]=[tempArr[high],tempArr[i+1]];
    tempArr.forEach((item,ind) => item.color= ind===i+1? 'red':'var(--bar-color)');
    tempArr.forEach((item,ind) => item.color= ind===i+1? 'red':'var(--bar-color)');
    setArr([...tempArr]);
    await new Promise(resolve=> setTimeout(resolve,20));
    let pi= i+1;
    
    await quickSort([arr,setArr],tempArr,low,pi-1);
    await quickSort([arr,setArr],tempArr,pi+1,high);
    tempArr.forEach((item)=> item.color='var(--bar-color)');
    setArr([...tempArr]);
    return [...tempArr];
  }
}

const insertionSort= async ([arr,setArr],tempArr=null)=>{
  if(!tempArr) tempArr=[...arr];
  for(let i=0;i<tempArr.length;i++){
    let key=tempArr[i];
    let j=i-1;

    while(j>=0 && tempArr[j].val>key.val){
      const freq = 200 + (tempArr[j].val / 1500) * 800;
      setTimeout(() => playBeep(freq, 30, 0.3, 'square'), 0);
      tempArr[j+1]=tempArr[j];
      tempArr = tempArr.map((item,ind)=> ind===j+1? {...item,color:'red'}:{...item,color:'var(--bar-color)'});
      setArr([...tempArr]);
      await new Promise(r=> setTimeout(r,20));
      j--;
    }
    tempArr[j+1]=key;
    tempArr = tempArr.map((item,ind)=> ind===j+1? {...item,color:'red'}:{...item,color:'var(--bar-color)'});
    setArr([...tempArr]);
  }
  tempArr = tempArr.map((item,ind)=> ({...item,color:'var(--bar-color)'}));
  setArr([...tempArr]);
  return [...tempArr];
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
      const freq = 200 + (heap[i].val / 1000) * 800;
      playBeep(freq, 30, 0.3, 'square');
      heap.forEach((item,ind)=> item.color= (ind===i || ind===n)? 'red':'var(--bar-color)');
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
  heap.forEach((item,ind)=> item.color='var(--bar-color)');
  setArr([...heap]);
  return [...heap];
}

const radixSort= async ([arr,setArr])=>{
  const countSort= async (tempArr,exp)=>{
    const length = tempArr.length;
    const output = new Array(length).fill(0).map(item=> ({val:-1,color:'var(--bar-color)'}));
    const count = new Array(10).fill(0);

    tempArr.forEach(item=> count[Math.floor(item.val/exp)%10]+=1);
    for(let i=1;i<10;i++) count[i]+=count[i-1];
    for(let i=length-1;i>=0;i--){
      const digit = Math.floor(tempArr[i].val/exp)%10;
      output[count[digit] - 1]=tempArr[i];
      count[digit]-=1;
      const freq = 200 + (tempArr[i].val / 800) * 800;
      setTimeout(() => playBeep(freq, 30, 0.3, 'square'), 0);
      setArr(output.map((item,ind)=> (
        item.val!=-1? 
          ind===count[digit]-1?
          {...item,color:'red'}:item
        :{...tempArr[ind],color:'var(--bar-color)'}
      )));
      await new Promise(r=> setTimeout(r,20));
    }
    return output;
  }
  const maxNum=Math.max(...arr.map(item=>item.val));
  let tempArr=[...arr];
  for(let exp=1; Math.floor(maxNum/exp)>0;exp*=10){
    tempArr = await countSort(tempArr,exp);
  }
  setArr([...tempArr].map(item=>({...item,color:'var(--bar-color)'})));
  return [...tempArr];

}

const finishSort= async ([arr,setArr],tempArr)=>{
  for(let i=0;i<tempArr.length;i++){
    tempArr[i].color='var(--bar-finish-sort)';
    const freq = 200 + (tempArr[i].val / 800) * 800;
    setTimeout(() => playBeep(freq, 30, 0.3, 'square'), 0);
    setArr([...tempArr]);
    await new Promise(r=> setTimeout(r,10));
  }
}

const randArr=(n)=>{
  const arr=[];
  for(let i=0;i<n;i++){
    arr.push({val:Math.floor(Math.random()*1000),color:'var(--bar-color)'});
  }
  return arr;
}

function App() {
  
  const [arr1,setArr1]=useState(randArr(100));
  const [arr2,setArr2]=useState(arr1.map(item=>item));
  return (
    <div className="App">
      <div className="start-btn-conatiner">
        <button 
          className="start-sort"
          onClick={async ()=>{ 
            await finishSort([arr1,setArr1],await mergeSort([arr1,setArr1]));
          }}
        > start sort</button>

      </div>
      <div className="sorting-container center">
        <div className="sorting-container-ind center">
          <h2>quick Sort</h2>
          <ul className="sorting">
            {arr1.map((item,ind)=>(
              <li 
                className="sort-item"
                key={`sort1-${ind}`}
                style={{
                  backgroundColor:item.color,
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
