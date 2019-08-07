export const state = () => {
    return {
        history: []
    }
}

export const mutations = {
    setHistory(state, arr) {
        state.history = arr
    }
}