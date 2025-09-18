import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: []
}

const subdomainSlice = createSlice({
  name: 'subdomain',
  initialState,
  reducers: {
    addSubdomain: (state, action) => {
      state.list.push(action.payload)
    },
    setSubdomains: (state, action) => {
      state.list = action.payload
    },
    clearSubdomains: (state) => {
      state.list = []
    }
  }
})

export const { addSubdomain, setSubdomains, clearSubdomains } = subdomainSlice.actions
export default subdomainSlice.reducer
