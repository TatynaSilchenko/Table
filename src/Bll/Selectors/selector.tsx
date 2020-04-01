export const getSortColomn=(state:any)=>{
    return  state.users.sort((a:any,b:any)=>a.id>b.id?1:-1)
};