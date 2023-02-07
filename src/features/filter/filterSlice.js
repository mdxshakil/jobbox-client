const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    filter: ''
}
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        sortByLastAdded: (state, action) => {
            state.filter = action.payload
        },
        sortByFirstAdded: (state, action) => {
            state.filter = action.payload
        }
    }
})
export const { sortByLastAdded, sortByFirstAdded } = filterSlice.actions;
export default filterSlice.reducer;