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

    const { id } = useParams<{ id: string }>()
    const navigate=useNavigate()
    useEffect(() => {
        fetch('http://localhost:3000/users/'+id)
          .then((response) => response.json())
          .then((data) => setUser(data));
      }, [id]);
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
 
