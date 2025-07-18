'use client'
import { Provider } from "react-redux"
import { store } from "./store"

export default function ReduduxProvider({ children }) {
    return (
        <Provider store={store}>{children}</Provider>
    )
}