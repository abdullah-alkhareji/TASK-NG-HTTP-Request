export interface Pet {
  id: number;
  name: string;
  type: string;
  adopted: number;
  image: string;
}

export interface PetForm {
  name: string;
  type: string;
  image: string;
}

export const pets = [
  {
    id: 1,
    name: 'Cleocatra',
    type: 'Cat',
    adopted: 0,
    image: 'https://i.ibb.co/HBRR9sp/cat-kitty-1.png',
  },
  {
    id: 2,
    name: 'Lucifurr',
    type: 'Cat',
    adopted: 0,
    image: 'https://i.ibb.co/P6VJ4pZ/smile-cat-1.png',
  },
  {
    id: 3,
    name: 'Hani',
    type: 'Dog',
    adopted: 0,
    image: 'https://i.ibb.co/DtzyPvk/dog-petting-1.png',
  },
  {
    id: 4,
    name: 'Subwoofer',
    type: 'Dog',
    adopted: 0,
    image: 'https://i.ibb.co/C0rwwRn/pet-dog-1.png',
  },
  {
    id: 5,
    name: 'Santa Claws',
    type: 'Cat',
    adopted: 0,
    image: 'https://i.ibb.co/2ZzG5pj/kitten-love-1.png',
  },
  {
    id: 6,
    name: 'George',
    type: 'Rabbit',
    adopted: 0,
    image: 'https://i.ibb.co/drbJRPQ/918f1b2c568be3d77a7c29d682be874c-1.png',
  },
];
