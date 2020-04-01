import React from 'react';
import Table from "./Table";
import Pagination from "react-js-pagination";
import {AppStateType} from "../Bll/store";
import {connect} from "react-redux";
import {getDataUser, setActivePage, setFilter, setUsers, setVisibleUsers} from "../Bll/TableReducer";
import Preloader from "../common/Preloader/Preloader";
import FilterTable from "./Filter";

class Main extends React.Component <any, { activePage: number }> {
    componentDidMount(): void {
        this.props.getDataUser()
    }

    handlePageChange(pageNumber: any) {
        this.props.setActivePage(pageNumber)
        this.props.setVisibleUsers()
    }

    searchHandler = (search: any) => {
        this.props.setFilter(search)

    }

    // visiblePageHandler(data:any){
    //     return data.filter((el:any,i:any)=>i>=(this.props.activePage-1)*this.props.itemsCountPerPage&&
    //         i<=this.props.activePage*this.props.itemsCountPerPage-1)
    // }
    getFilteredData() {
        const {users, search} = this.props

        if (!search) {
            return users
        }

        return users.filter((item: any) => {
            return item['firstName'].toLowerCase().includes(search.toLowerCase())
                || item['lastName'].toLowerCase().includes(search.toLowerCase())
                || item['email'].toLowerCase().includes(search.toLowerCase())
        })
    }

    render() {
        const filteredData = this.getFilteredData()
           const visibleUsers = filteredData.filter((el: any, i: any) => i >= (this.props.activePage - 1) * this.props.itemsCountPerPage &&
            i <= this.props.activePage * this.props.itemsCountPerPage - 1)


        return <div>
            {this.props.isLoading ? <Preloader/> :
                <>
                    <FilterTable onSearch={this.searchHandler}/>
                    <Table users={this.props.users} visibleUsers={visibleUsers} setUsers={this.props.setUsers}/>
                    <Pagination
                        activePage={this.props.activePage}
                        itemsCountPerPage={this.props.itemsCountPerPage}
                        totalItemsCount={filteredData.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </>
            }
        </div>
    }
}

const mapStateToPropd = (state: AppStateType) => ({
    activePage: state.table.activePage,
    users: state.table.users,
    isLoading: state.table.isLoading,
    itemsCountPerPage: state.table.itemsCountPerPage,
    visibleUsers: state.table.visibleUsers,
    search: state.table.search
})
export default connect(mapStateToPropd, {setActivePage, setVisibleUsers, getDataUser, setUsers, setFilter})(Main);