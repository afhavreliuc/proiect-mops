import { getDocs, collection, } from 'firebase/firestore'
import { db } from '../firebase/firebase';
const taskurile = collection(db, 'task')
const data = await getDocs(taskurile);
const filteredData = data.docs.map(doc => ({...doc.data(), id: doc.id}))
const initialState = filteredData;

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), text: action.payload.text, completed: false }];

    default:
      return state;
  }
};

export default tasksReducer;
