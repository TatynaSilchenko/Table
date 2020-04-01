import React from "react";
import style from "./Table.module.css"
import DataRow from "./DataRow";
import {setUsers, setVisibleUsers} from "../Bll/TableReducer";
import {connect} from "react-redux";

interface IProps {
    visibleUsers: any,
    setUsers: Function,
    users: any,
    setVisibleUsers: Function
}

interface IState {
    sorted: any
}


class Table extends React.Component<IProps, IState> {
    constructor(props:any) {
        super(props);
    }
    componentDidMount(): void {
        this.setState({
            sorted: {id: true, firstName: true, lastName: true, email: true, phone: true}
        })
    }

    sort = (type: any) => {
        debugger
        const isSorted = this.state.sorted[type]
        let direction = isSorted ? 1 : -1;
        const sortedData = [...this.props.users].sort((a, b) => {
            if (a[type] === b[type]) return 0
            return a[type] > b[type] ? direction : direction * -1

        })
        this.state.sorted[type] = !isSorted;
        this.props.setUsers(sortedData)
        this.props.setVisibleUsers()
    }

    render() {
        const dataRow = this.props.visibleUsers.map((item: any, index: any) =>
            <DataRow id={item.id} firstName={item.firstName} lastName={item.lastName} email={item.email}
                     phone={item.phone}/>)
        return (
            <div className={style.background}>

                <table className={style.tableView}>
                    <tr>
                        <th className={style.tableHeader}
                            onClick={() => this.sort('id')}>id </th>
                        <th className={style.tableHeader}
                            onClick={() => this.sort('firstName')}>firstName <span>\/</span></th>
                        <th className={style.tableHeader} onClick={() => this.sort('lastName')}>lastName <span>\/</span>
                        </th>
                        <th className={style.tableHeader} onClick={() => this.sort('email')}> email <span>\/</span></th>
                        <th className={style.tableHeader} onClick={() => this.sort('phone')}> phone <span>\/</span></th>
                    </tr>
                    {dataRow}
                </table>
            </div>
        )
    }
}

export default connect(null, {setUsers, setVisibleUsers})(Table)