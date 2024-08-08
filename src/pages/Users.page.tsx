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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

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

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
        setFilteredUsers(data);});
      
      
  }, []);

  useEffect(() => {
    let filtered = users;

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
    if (glassesFilter === 'glasses') {
      filtered = filtered.filter((user) => user.glasses);
    } else if (glassesFilter === 'no-glasses') {
      filtered = filtered.filter((user) => !user.glasses);
    }

    setFilteredUsers(filtered);
  }, [nameFilter, hairFilter, eyeFilter, genderFilter, glassesFilter, users]);

  return (
    <>
      <Title order={1}>Users</Title>

      <Button my={'md'} onClick={toggle}>
        {opened ? 'Hide filters' : 'Show Filters'}
      </Button>

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
    </>
  );
}
