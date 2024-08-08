import { FormEvent, useEffect, useState } from "react";
import { User } from "./Users.page";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mantine/core";
import '../CSS/EditForm.css'
export function UserEditPage(){


    const [user, setUser]=useState<User| null>(null)
    const [name, setName]=useState("")
    const [gender,setGender]=useState("")
    const [hair,setHair]=useState("")
    const [eyes,setEyes]=useState("")
    const [glasses,setGlasses]=useState("")
    const [roles, setRoles] = useState<string[]>([])
    const [avatar, setAvatar] = useState<File | null>(null);

    const { id } = useParams<{ id: string }>()
    const navigate=useNavigate()
    const [isSelectVisible, setIsSelectVisible] = useState(false); 

    let body={
        name,
        gender,
        hair,
        eyes,
        glasses,
        roles
    } 


    const toggleSelectVisibility = () => {
      setIsSelectVisible(prev => !prev); 
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files && e.target.files[0];
        if (image) {
          setAvatar(image);
        }
      }


     const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

      const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
      setRoles(selectedOptions);
    };

    const userEdit=async()=>{
        try {
            await fetch('http://localhost:3000/users/'+id,{
            method:"PATCH",
            headers:{
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit=async(e: FormEvent)=>{
        e.preventDefault()
        const formData = new FormData();  
        if (avatar) formData.append('avatar', avatar);
        try {
            if(!avatar){
            userEdit()
        navigate("/users/view/"+id)
        }else{
            userEdit()
            await fetch('http://localhost:3000/users/' + id, {
            method: "PATCH",
            body: formData,
            })
        navigate("/users/view/"+id)
        }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetch('http://localhost:3000/users/'+id)
          .then((response) => response.json())
          .then((data) => {setUser(data);
            setName(data.name);
            setGender(data.gender);
            setHair(data.hair);
            setEyes(data.eyes);
            setGlasses(data.glasses)
            setRoles(data.role)});
            
      }, [id]);
    return ( 
        <>
        {!user?<p>Loading...</p>:
          <div className="form-container">
          {!user ? (
            <p className="loading-text">Loading...</p>
          ) : (
            <form onSubmit={handleEdit}>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={val => setName(val.currentTarget.value)}
              />
    
              <label>Gender</label>
              <input
                value={gender}
                type="text"
                onChange={val => setGender(val.currentTarget.value)}
              />
    
              <label>Hair</label>
              <input
                value={hair}
                type="text"
                onChange={val => setHair(val.currentTarget.value)}
              />
    
              <label>Eyes</label>
              <input
                value={eyes}
                type="text"
                onChange={val => setEyes(val.currentTarget.value)}
              />
    
              <label>Glasses</label>
              <select
                value={glasses}
                onChange={val => setGlasses(val.currentTarget.value)}
              >
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
    
              <label>Roles</label>
              <div>
                <div className="toggle-button" onClick={toggleSelectVisibility}>
                  {isSelectVisible ? "Hide Options" : "Show Options"}
                </div>
    
                {isSelectVisible && (
                  <select
                    multiple
                    value={roles}
                    onChange={handleChange}
                  >
                    <option value="1">Standard User</option>
                    <option value="2">Administrator</option>
                    <option value="3">Super User</option>
                    <option value="4">Guest User</option>
                  </select>
                )}
              </div>
              <label>File Upload</label>
              <input
              type="file"
              onChange={handleFileChange}
              />
              <Button type="submit">Submit</Button>
            </form>
          )}
        </div>}
        </>
     );
}

