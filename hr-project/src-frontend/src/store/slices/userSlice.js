import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" },
        { id: 4, name: "Bob Brown" }
    ],
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
        },
        removeUser: (state, action) => {
            state = state.filter(user => user.id !== action.payload.id)
        }
    }
})

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
