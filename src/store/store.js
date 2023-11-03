import {create} from 'zustand'

const useUserStore = create((set) => ({
    hasAuth: false,
    username: '',
    token: '',
    collapsed: false,
    rememberMe: false,
    updateAuthState: t => set(() => ({hasAuth: t})),
    updateUsername: (t) => set(() => ({username: t})),
    updateToken: t => set(() => ({token: t})),
    updateCollapsed: () => set(t => ({collapsed: !t.collapsed})),
    updateRememberMe: t => set(() => ({rememberMe: t}))
}));

export default useUserStore;

