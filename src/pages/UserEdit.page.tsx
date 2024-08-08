import { useEffect, useState } from "react";
import { User } from "./Users.page";
import { useParams } from "react-router-dom";

export function UserEditPage(){


    const [user, setUser]=useState<User| null>(null)
    const [name, setName]=useState("")
    const [gender,setGender]=useState("")
    const [hair,setHair]=useState("")
    const [eyes,setEyes]=useState("")
    const [glasses,setGlasses]=useState("")

    const { id } = useParams<{ id: string }>()
    useEffect(() => {
        fetch('http://localhost:3000/users/'+id)
          .then((response) => response.json())
          .then((data) => {setUser(data);
            setName(data.name);
            setGender(data.gender);
            setHair(data.hair);
            setEyes(data.eyes);
            setGlasses(data.glasses)});
      }, []);
    return ( 
        <>
        {!user?"Loading":
          <form action="">
            <label>Name</label>
            <input 
              type="text"
              value={name}
              onChange={val=>setName(val.currentTarget.value)}
            />

            <label>Gender</label>
            <input 
              value={gender}
              type="text"
              onChange={val=>setGender(val.currentTarget.value)}
            />

            <label>Hair</label>
            <input 
              value={hair}
              type="text"
              onChange={val=>setHair(val.currentTarget.value)}
            />

            <label>Eyes</label>
            <input 
              value={eyes}
              type="text"
              onChange={val=>setEyes(val.currentTarget.value)}
            />

            <label>Glasses</label>
            <select
             value={glasses}
             onChange={val=>setGlasses(val.currentTarget.value)}>
               <option value="True">True</option>
               <option value="Flase">False</option>
          </select>
          </form>}
        </>
     );
}
 
