import React from "react";
import style from "./Table.module.css"
import DataRow from "./DataRow";
import {setUsers, setVisibleUsers} from "../Bll/TableReducer";
import {connect} from "react-redux";

interface IProps {
    visibleUsers: any,
    setUsers: Function,
    users: any,

}

interface IState {
    sorted: any,
    currentRow: any,
    iscurrentRow: boolean
}


class Table extends React.Component<IProps, IState> {
    state: any = {
        sorted: {id: true, firstName: true, lastName: true, email: true, phone: true},
        currentRow: null,
        iscurrentRow: false
    }

    sort = (type: any) => {
        const isSorted = this.state.sorted[type]
        let direction = isSorted ? 1 : -1;
        const sortedData = [...this.props.users].sort((a, b) => {
            if (a[type] === b[type]) return 0
            return a[type] > b[type] ? direction : direction * -1

        })
        this.state.sorted[type] = !isSorted;
        this.props.setUsers(sortedData)
    }
    getRowData = (data: any) => {
        this.setState({
            currentRow: data,
            iscurrentRow: true
        })

    }


    render() {
        const dataRow = this.props.visibleUsers.map((item: any, index: any) =>
            <DataRow id={item.id} firstName={item.firstName} lastName={item.lastName} email={item.email}
                     phone={item.phone} getRowData={this.getRowData}/>)
        return (
            <div className={style.background}>
                <table className={style.tableView}>
                    <tr>
                        <th className={style.tableHeader}
                            onClick={() => this.sort('id')}>id
                            {this.state.sorted.id ? <span>/\</span> : <span>\/</span>}</th>
                        <th className={style.tableHeader}
                            onClick={() => this.sort('firstName')}>firstName
                            {this.state.sorted.firstName ? <span>/\</span> : <span>\/</span>}</th>
                        <th className={style.tableHeader} onClick={() => this.sort('lastName')}>lastName
                            {this.state.sorted.lastName ? <span>/\</span> : <span>\/</span>}
                        </th>
                        <th className={style.tableHeader} onClick={() => this.sort('email')}> email
                            {this.state.sorted.email ? <span>/\</span> : <span>\/</span>}</th>
                        <th className={style.tableHeader} onClick={() => this.sort('phone')}> phone
                            {this.state.sorted.phone ? <span>/\</span> : <span>\/</span>}</th>
                    </tr>
                    {dataRow}
                </table>
                {this.state.iscurrentRow && <div className={style.infoBlock}>
                    <div> <span>id:</span>{this.state.currentRow.id}</div>
                    <div> <span>firstName:</span>{this.state.currentRow.firstName}</div>
                    <div> <span>lastName:</span>{this.state.currentRow.lastName}</div>
                    <div> <span>email:</span>{this.state.currentRow.email}</div>
                    <div> <span>phone:</span>{this.state.currentRow.phone}</div>
                </div>}
            </div>
        )
    }
}

export default Table