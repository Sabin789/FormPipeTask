import {
    Button,
    Card,
    Image,
    Title,
  } from '@mantine/core';
import { useEffect, useState } from "react";
import { User } from "./Users.page";
import { useNavigate, useParams } from "react-router-dom";

export function UserPage(){

    const [user, setUser]=useState<User>()
    const [roles, setRoles] = useState<any[]>([])

    const { id } = useParams<{ id: string }>()
    const navigate=useNavigate()

    let pronoun:string
    let number:string
    const getUser = async () => {
        try {
                const response = await fetch(`http://localhost:3000/users/${id}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
    const fetchRoles=async()=>{
        try {
            if (user) {
                const roleRequests = user?.roles.map(roleId => 
                    fetch(`http://localhost:3000/roles/${roleId}`).then(response => response.json())
                )
                const roles = await Promise.all(roleRequests);
                setRoles(roles)
            }
            console.log(roles)
        } catch (error) {
            console.log(error)
        }
    }

    const getPronoun = (gender: 'female' | 'male') => {
        return gender === 'female' ? 'Her' : 'His';
    };

    
    const getPluralPhrase = (roles: any[]) => {
        return roles.length === 1 ? 'role is' : 'roles are';
    };

    const formatRoles = (roles: any[]) => {
        if (roles.length === 0) return '';
        if (roles.length === 1) return roles[0].description;
    
        const allButLast = roles.slice(0, -1).map(role => role.description).join(', ');
        const lastRole = roles[roles.length - 1].description;
    
        return `${allButLast} and ${lastRole}`;
    }


    useEffect(() => {
        getUser();
    }, [id]);

    useEffect(() => {
        if (user) {
         fetchRoles()
        }
    }, [user]);
    return (
        <>{!user?<p>Loading...</p>:
          <Card radius={'md'} withBorder key={user?.id} w={238}>
            <Card.Section>
              {/* We know where the images are, so we just grab the file based on the filename associated with the user */}
              <Image src={`/uploads/${user?.avatar}`} alt={`Avatar for ${user?.name}`} />
            </Card.Section>
            <Title my={'md'} order={4}>
              {user?.name}
            </Title>
            <p>
            {`${getPronoun(user.gender)} ${getPluralPhrase(roles)} ${formatRoles(roles)}`}
            </p>
            <Button
             onClick={()=>{navigate("/users/edit/"+user?.id)}}
             size={'xs'}
             fullWidth
             variant={'outline'}
             color={'grape'}
             component={'a'}>Edit
             </Button>
          </Card>
         }
        </>
      );
}
 
