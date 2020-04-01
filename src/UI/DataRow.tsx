import React from "react";
import style from "./Table.module.css"

interface IProps {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone:string,
    getRowData:Function
}

const DataRow:React.FC<IProps> =({id, firstName,
                                     lastName,email,phone,...props})=>{
    return(
        <>
            <tr onClick={()=>{props.getRowData({id,firstName,lastName,email,phone})}}>
                <td className={style.dataRow}>{id}</td>
                <td className={style.dataRow}>{firstName}</td>
                <td className={style.dataRow}>{lastName}</td>
                <td className={style.dataRow}>{email}</td>
                <td className={style.dataRow}>{phone}</td>
            </tr>
        </>
    )
}
export default DataRow