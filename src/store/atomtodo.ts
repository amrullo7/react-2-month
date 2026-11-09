import {atom} from  "jotai"
export const cntatom=atom<number>(0)
interface IData{
    name:string,
    id:number,
}
export let dataatom=atom<IData[]>([
    {name:"Abdullo",id:1},
    {name:"Qadam",id:2},
    {name:"Qurbon",id:3},
])
export let deleteatom=atom(
    null,
    (get,set,id:number)=>{
        set(
            dataatom,
            get(dataatom).filter((el)=>el.id!=id)
        )
    }
)
