import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth.slice';
import { groupsReducer } from './slices/group.slice';
import { categoriesReducer } from './slices/category.slice';
import { tasksReducer } from './slices/task.slice';
import { noteReducer } from './slices/note.slice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        groups:groupsReducer,
        categories: categoriesReducer,
        tasks: tasksReducer,
        note: noteReducer,
    }
})

export default store;