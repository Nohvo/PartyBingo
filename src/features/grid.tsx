import { createSlice } from '@reduxjs/toolkit'
import { storeData } from '../store/store'

export type GridContainer = {
    id: number,
    name: string,
    grid: Item[]
}
export type Item = {
    text: string,
    value: boolean
}

export const reduxInitialState = { grids: [] }

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
            if (action.payload) {
                action.payload.map(item => {
                    // Don't push duplicates or items with same id
                    if (state.grids.find((grid) => { return grid.id === item.id }) === undefined)
                        state.grids.push(item)
                })
            }
        },
        setClearState: (state) => {
            state.grids.length = 0;
        },
        setReduxGrid: (state, action) => {
            state.grids = action.payload
            console.log("PAYLOAD", action.payload)
            storeData(state)
        }
    }


});

export const { add_grid, setInitialState, setClearState, setReduxGrid } = gridSlice.actions


export default gridSlice.reducer;