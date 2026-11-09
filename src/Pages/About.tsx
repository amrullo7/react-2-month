import { dataatom, deleteatom } from "@/store/atomtodo"
import { useAtomValue, useSetAtom } from "jotai"

const About = () => {
  let data=useAtomValue(dataatom)
  let deleteUser=useSetAtom(deleteatom)
  return (
    <div>
      {data.map((el)=>{
        return <div className="">

          <h1>{el.name}</h1>
          <button onClick={()=>deleteUser(el.id)}>Delete</button>
        </div>
      })}
    </div>
  )
}

export default About