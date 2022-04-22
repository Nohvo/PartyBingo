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
        grids: [
            {
                id:0,
                name: "Tehtävät",
                 grid: [
                    { text: "1", value:false },
                    { text: "2", value:false },
                    { text: "3", value:false },
                    { text: "4", value:false },
                    { text: "5", value:false },
                    { text: "6", value:false },
                    { text: "7", value:false },
                    { text: "8", value:false },
                    { text: "9", value:false },
                ]
            }
        ]
    },
    reducers: {
        add_grid: (state, action) => {
            state.grids.push(action.payload)
            storeData(state);
        }
    }
});

export const {add_grid} = gridSlice.actions


export default gridSlice.reducer;