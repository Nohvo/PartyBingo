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
        removeGrid : (state, action) => {
            console.log("REMOVED", state.grids.splice(state.grids.findIndex((item) => action.payload === item.id), 1))
            console.log(state.grids)
            //storeData(state);
        },
        setInitialState: (state, action) => {
            if (action.payload) {
                action.payload.map(item => {
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

export const { add_grid, setInitialState, setClearState, removeGrid, setReduxGrid } = gridSlice.actions


export default gridSlice.reducer;