'ues client';
import { useContext } from 'react';
import { UserContext } from '@/app/context/UserContext';

import { Avatar, AvatarFallback, AvatarImage } from './Avatar.js';

const getFirstLetters = (string) => {
  return string
    ?.split(' ')
    .map((i) => i[0])
    .join(',')
    .replace(',', '')
    .toUpperCase();
};

const StringDP = () => {
  const { userData } = useContext(UserContext);
  return (
    <>
      <Avatar className="h-6 w-6 mr-2">
        <AvatarImage src="/placeholder-avatar.jpg" alt="@johndoe" />
        <AvatarFallback>
          {getFirstLetters(userData?.name ? userData.name : 'User')}
        </AvatarFallback>
      </Avatar>
    </>
  );
};

export default StringDP;
