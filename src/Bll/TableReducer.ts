import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";
import {dataApi} from "../Dal/apiSdk";

const SET_USERS='TABLE/SET_USERS'
const SET__VISIBLE_USERS='TABLE/SET_VISIBLE_USERS'
const SET__ACTIVE_PAGE='TABLE/SET__ACTIVE_PAGE'
const SET_IS_LOADING='TABLE/SET_IS_LOADING'
const SET_FILTER='TABLE/SET_FILTER'

export interface IDataObject {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone:string,
    activePage:number,
    isLoading:boolean,
    itemsCountPerPage:number

}
export interface IInitialState extends Array<IDataObject>{}
const initialState:any={
   users: [
        {id:69,firstName:'Tanya',lastName:"Anastasiades",email:"PAnderson@scelerisque.ly",phone:"(658)949-6297"},
       { id: 101, firstName: 'Sue', lastName: 'Corson', email: 'DWhalley@in.gov', phone: '(612)211-6296'},
       {id:691,firstName:"Maribel",lastName:"Sari",email:"CTupper@adipiscing.org",phone:"(736)139-1230"}
        ],
    activePage:1,
    visibleUsers:[],
    isLoading:true,
    itemsCountPerPage:50,
    search:''
}


const TableReducer=(state=initialState,action:any)=>{

switch (action.type) {
    case SET_USERS:
        return {...state,users:action.users}
    case SET_IS_LOADING:
        return {...state,isLoading:action.isLoad}
    case SET__ACTIVE_PAGE:
        return {...state,activePage:action.page}
    case SET__VISIBLE_USERS:
        return {...state,visibleUsers:
                state.users.filter((el:any,i:any)=>i>=(state.activePage-1)*state.itemsCountPerPage&&
               i<=state.activePage*state.itemsCountPerPage-1)}
    case SET_FILTER:
        return {...state,search:action.search}
    default:{
        return state;
    }
}
}
export const getDataUser=()=>async (disputch:ThunkDispatch<AppStateType,{},any>)=>{
    try{
        const data:any=await dataApi.getUser();
        data.map((u:any)=>({id:u.id, firstName:u.firstName,lastName:u.lastName,email:u.email,phone:u.phone}))
        disputch(setisLoading(true))
        disputch(setUsers(data))
        disputch(setVisibleUsers())
        disputch(setisLoading(false))
    }
    catch (e){
        console.log('Error!', e)
    }

}

export const setUsers=(users:any)=>({type:SET_USERS,users})
export const setActivePage=(page:number)=>({type:SET__ACTIVE_PAGE,page})
export const setVisibleUsers=()=>({type:SET__VISIBLE_USERS})
export const setisLoading=(isLoad:boolean)=>({type:SET_IS_LOADING,isLoad})
export const setFilter=(search:any)=>({type:SET_FILTER,search})
export default TableReducer