import { atom } from 'recoil';

  export const courseState = atom({
    key: 'courseState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });

  export const handlePurchasingState = atom({
    key: "handlePurchasingState",
    default: () => {}, // Empty function as the initial value
  });

  export const purchasedCoursesState = atom({
    key: "purchasedCoursesState",
    default: [], // Initialize with an empty array
  });