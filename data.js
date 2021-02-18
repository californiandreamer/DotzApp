export const defaultLocation = [21.110343099999998, 52.2428017];

export const activities = [
  {
    id: 1,
    name: 'Running',
    image: require('./assets/icons/activities/running.png'),
  },
  {
    id: 2,
    name: 'Hiking',
    image: require('./assets/icons/activities/hiking.png'),
  },
  {
    id: 3,
    name: 'Skateboard',
    image: require('./assets/icons/activities/skateboard.png'),
  },
  {
    id: 4,
    name: 'Bike',
    image: require('./assets/icons/activities/bike.png'),
  },
  {
    id: 5,
    name: 'Motor Bike',
    image: require('./assets/icons/activities/motor-bike.png'),
  },
  {
    id: 6,
    name: 'Scooter',
    image: require('./assets/icons/activities/scooter.png'),
  },
  {
    id: 7,
    name: 'Car',
    image: require('./assets/icons/activities/car.png'),
  },
  {
    id: 8,
    name: 'Walking',
    image: require('./assets/icons/activities/walking.png'),
  },
  {
    id: 9,
    name: 'Rollerskate',
    image: require('./assets/icons/activities/rollerskate.png'),
  },
  {
    id: 10,
    name: 'Snowboarding',
    image: require('./assets/icons/activities/snowboarding.png'),
  },
];

export const errorsContent = {
  avoidPicture: {
    title: 'Picture error',
    text: 'Upload profile photo',
  },
  invalidEmail: {
    title: 'Email error',
    text: 'Your email is invalid',
  },
  invalidPassword: {
    title: 'Password error',
    text: 'Your password have to contain at least 8 symbols',
  },
  invalidCheckPassword: {
    title: 'Password error',
    text: 'Passwords do not match',
  },
  termsUnaccepted: {
    title: 'Is necessary to proceed',
    text: 'Need to accept the Terms of Service',
  },
  invalidName: {
    title: 'User name error',
    text: 'Nickname is required and must contain at least 3 symbols',
  },
  invalidCity: {
    title: 'City error',
    text: 'City is required',
  },
  invalidActivities: {
    title: 'Activities error',
    text: 'Choose at least one activity',
  },
  registrationError: {
    title: 'Registration error',
    text: 'Something went wrong. Check your values and try again.',
  },
};

export const privacyBubbleContent = {
  title: 'Set up your Privacy Bubble',
  text:
    'You will not be tracked or displayed while you presenting in that area',
};
