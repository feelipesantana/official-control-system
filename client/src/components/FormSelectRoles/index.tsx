import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useControlModal from "../../hooks/useControlModal";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../service/api";
interface FormSelectRolesProps{
  value?:number;
  name:string;
  register:any
}
export function FormSelectRoles({name,value, register}:FormSelectRolesProps){

  const {data: dataRoles, isLoading, isError} = useQuery(['search-roles'], async () =>{
    const response: any = await api.get("/search-roles")
    return response.data.values
  })

  const activeModal = useControlModal((state) => state.activeModal)
  const setTypeModal = useControlModal((state) => state.setTypeModal)
  
  const handleActiveModa = () => {
    setTypeModal("createRole")
    activeModal()
  }

  const optionSelect = dataRoles?.map((res:any) =>{
    return (
        <option key={res.id} value={res.id}>{res.name}</option>
    )
})
  return (
    <div className="flex flex-col w-[40%]">
      <label className="flex flex-col" htmlFor="role"> Cargo:
        <div className="flex items-center justify-between">
          <select   className="w-52  h-6 rounded border border-gray-700" {...register(name)} defaultValue={value}>
              {optionSelect}
          </select>

           <IconButton onClick={handleActiveModa}> <AddCircleOutlineIcon /> </IconButton>
        </div>
      </label>
    </div>
  )
}