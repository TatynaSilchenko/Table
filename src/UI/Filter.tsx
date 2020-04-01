import React, {useState} from "react";
import styles from "./Filter.module.css"

interface IProps {
    onSearch:any
}

const FilterTable:React.FC<IProps>=({onSearch, ...props})=>{
const [value,setValue]=useState('')

const changeValueHandler=(e:any)=>{
    setValue(e.currentTarget.value)
}

return <div className={styles.filterTable}>
    <input type="text" onChange={changeValueHandler} value={value}/>
    <button onClick={()=>{onSearch(value)}}> Найти</button>
</div>
}

export default FilterTable