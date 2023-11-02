import {create} from 'zustand'

const useUserStore = create((set) => ({
    hasAuth: false,
    username: '',
    token: '',
    collapsed: false,
    updateAuthState: (state) => set(() => ({hasAuth: state})),
    updateUsername: (uname) => set(() => ({username: uname})),
    updateToken: (token) => set(() => ({token: token})),
    updateCollapsed: () => set(t => ({collapsed: !t.collapsed}))
}));

export default useUserStore;

