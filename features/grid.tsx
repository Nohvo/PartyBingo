import { createSlice } from '@reduxjs/toolkit'
import { storeData } from '../store/store'

export type GridContainer = {
    id:number,
    name:string,
    grid:Item[]
}
export type Item = {
    text:string,
    value:boolean
}

export const gridSlice = createSlice({
    name: "grids",
    initialState: {
        grids: []
    },
    reducers: {
        add_grid: (state, action) => {
            state.grids.push(action.payload)
            storeData(state);
        },
        setInitialState: (state, action) => {

            action.payload.map(item => {
                state.grids.push(item)
            })
        }}

    
});

export const {add_grid, setInitialState} = gridSlice.actions


export default gridSlice.reducer;