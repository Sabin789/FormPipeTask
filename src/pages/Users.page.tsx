import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Collapse,
  Group,
  Image,
  Paper,
  Radio,
  Select,
  Stack,
  TextInput,
  Title,
  Pagination,
  Table
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import "../CSS/Users.css"

export type User = {
  id: string;
  name: string;
  avatar: string;
  gender: 'female' | 'male';
  hair: 'black' | 'brown' | 'blonde' | 'red' | 'grey';
  eyes: 'brown' | 'blue' | 'green';
  glasses: boolean;
  roles:string[]
};

/**
 * The UsersPage contacts the mock web server to fetch the list of users and displays them in a grid.
 */
export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [opened, { toggle }] = useDisclosure(false);

  const [nameFilter, setNameFilter] = useState('');
  const [hairFilter, setHairFilter] = useState<string | null>(null);
  const [eyeFilter, setEyeFilter] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [glassesFilter, setGlassesFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string[]>([]);

  const [sortKey, setSortKey] = useState<keyof User | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  let [table,setTable]=useState(false)
  const navigate=useNavigate()

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
        setFilteredUsers(data);});
      
      
  }, []);

  useEffect(() => {
    let filtered = [...users];

    if (nameFilter) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    if (hairFilter) {
      filtered = filtered.filter((user) => user.hair === hairFilter.toLowerCase());
    }
    if (eyeFilter) {
      filtered = filtered.filter((user) => user.eyes === eyeFilter.toLowerCase());
    }
    if (genderFilter) {
      filtered = filtered.filter((user) => user.gender === genderFilter.toLowerCase());
    }
    if (roleFilter.length > 0) {
      filtered = filtered.filter((user) =>
        user.roles.some((role) => roleFilter.includes(role))
      )
    }
    if (glassesFilter === 'glasses') {
      filtered = filtered.filter((user) => user.glasses)
    } else if (glassesFilter === 'no-glasses') {
      filtered = filtered.filter((user) => !user.glasses)
    }


    if (sortKey) {
      users.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      })
    }

    
    setFilteredUsers(filtered);
  }, [nameFilter, hairFilter, eyeFilter, genderFilter,roleFilter, glassesFilter, users, sortKey, sortOrder]);

  const handleRoleChange = (value: string[]) => {
    setRoleFilter(value);  
  }

  const resetFilters=()=>{
    setNameFilter("")
    setHairFilter("")
    setEyeFilter("")
    setGenderFilter("")
    setRoleFilter([])
    setGlassesFilter("all")
  }

  const tableToggle=()=>{
    if(table===false){
      setTable(true)
    }else{
      setTable(false)
    }
  }

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  

  return (
    <>{!table?
      <div>
      <Title order={1}>Users</Title>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button my={'md'} onClick={toggle}>
          {opened ? 'Hide filters' : 'Show Filters'}
        </Button>
        <Button my={'md'} onClick={tableToggle}>
           {false ? 'Hide table' : 'Show table'}
        </Button>
      </div>

      <Collapse in={opened}>
        <Paper shadow="sm" p={'lg'} mb="md" withBorder bg={'gray.1'} miw={600}>
          <Stack gap={10}>
            <Group grow wrap={'wrap'}>
              <TextInput label="Name" placeholder="Enter user's name to filter list"
              onChange={(e) => setNameFilter(e.currentTarget.value)} />
              <Select
                label="Hair Colour"
                placeholder="Pick hair colour"
                value={hairFilter || ''}
                onChange={(value) => setHairFilter(value || null)}
                data={['Black', 'Brown', 'Blonde', 'Red', 'Grey']}
              />
              <Select
                label="Eye Colour"
                placeholder="Pick eye colour"
                value={eyeFilter || ''}
                onChange={(value) => setEyeFilter(value || null)}
                data={['Brown', 'Blue', 'Green', 'Grey']}
              />
              <Select label="Gender" placeholder="Pick gender"
              value={genderFilter || ''}
              onChange={(value) => setGenderFilter(value || null)}
               data={['Male', 'Female']} />
               <Select
                 multiple
                 label="Role"
                 placeholder="Pick role"
                //  value={roleFilter} 
                 onChange={(val)=>{handleRoleChange(val ? [val] : [])}} 
                 data={[
                   { value: '1', label: 'Standard User' },
                   { value: '2', label: 'Administrator' },
                   { value: '3', label: 'Super User' },
                   { value: '4', label: 'Guest User' }
                 ]}
                 />
            </Group>

            <Radio.Group label="Glasses?"
             defaultValue="all"
             value={glassesFilter}
              onChange={(value) => setGlassesFilter(value)}>
              <Group>
                <Radio label="All" value="all" />
                <Radio label="Glasses" value="glasses" />
                <Radio label="No Glasses" value="no-glasses" />
              </Group>
            </Radio.Group>
            <Radio.Group label="Reset">
            <Group>
                <Radio label="Resest filters" onClick={resetFilters}></Radio>
            </Group>
            </Radio.Group>
          </Stack>
        </Paper>
      </Collapse>

      <Group miw={600}>
        {filteredUsers.map((user, index) => (
          <Card radius={'md'} withBorder key={index} w={238}>
            <Card.Section>
              {/* We know where the images are, so we just grab the file based on the filename associated with the user */}
              <Image src={`/uploads/${user.avatar}`} alt={`Avatar for ${user.name}`} />
            </Card.Section>
            <Title my={'md'} order={4}>
              {user.name}
            </Title>
            <Button
              size={'xs'}
              fullWidth
              variant={'outline'}
              color={'grape'}
              component={'a'}
              href={`/users/view/${user.id}`}
            >
              View
            </Button>
          </Card>
        ))}
      </Group>
      </div>:
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button my={'md'} onClick={toggle}>
          {opened ? 'Hide filters' : 'Show Filters'}
        </Button>
         <Button my={'md'} onClick={tableToggle}>
            {true ? 'Hide table' : 'Show table'}
          </Button>
        </div>
        <Collapse in={opened}>
        <Paper shadow="sm" p={'lg'} mb="md" withBorder bg={'gray.1'} miw={600}>
          <Stack gap={10}>
            <Group grow wrap={'wrap'}>
              <TextInput label="Name" placeholder="Enter user's name to filter list"
              onChange={(e) => setNameFilter(e.currentTarget.value)} />
              <Select
                label="Hair Colour"
                placeholder="Pick value to filter list"
                value={hairFilter || ''}
                onChange={(value) => setHairFilter(value || null)}
                data={['Black', 'Brown', 'Blonde', 'Red', 'Grey']}
              />
              <Select
                label="Eye Colour"
                placeholder="Pick value"
                value={eyeFilter || ''}
                onChange={(value) => setEyeFilter(value || null)}
                data={['Brown', 'Blue', 'Green', 'Grey']}
              />
              <Select label="Gender" placeholder="Pick value"
              value={genderFilter || ''}
              onChange={(value) => setGenderFilter(value || null)}
               data={['Male', 'Female']} />
               <Select
                 multiple
                 label="Role"
                 placeholder="Pick role"
                //  value={roleFilter} 
                onChange={(val)=>{handleRoleChange(val ? [val] : [])}} 
                 data={[
                   { value: '1', label: 'Standard User' },
                   { value: '2', label: 'Administrator' },
                   { value: '3', label: 'Super User' },
                   { value: '4', label: 'Guest User' }
                 ]}
                 />
            </Group>

            <Radio.Group label="Glasses?"
             defaultValue="all"
             value={glassesFilter}
              onChange={(value) => setGlassesFilter(value)}>
              <Group>
                <Radio label="All" value="all" />
                <Radio label="Glasses" value="glasses" />
                <Radio label="No Glasses" value="no-glasses" />
              </Group>
            </Radio.Group>
            <Radio.Group label="Reset">
            <Group>
                <Radio label="Resest filters" onClick={resetFilters}></Radio>
            </Group>
            </Radio.Group>
          </Stack>
        </Paper>
      </Collapse>
      <Table className="my-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Hair</th>
            <th>Eyes</th>
            <th>Glasses</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <td onClick={()=>{navigate("/users/view/"+user.id)}}>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.hair}</td>
              <td>{user.eyes}</td>
              <td>{user.glasses ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        value={currentPage}
        onChange={setCurrentPage}
        total={Math.ceil(filteredUsers.length / itemsPerPage)}
        mt="md"
      />
      </div>}
    </>
  );
}
