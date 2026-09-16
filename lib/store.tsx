'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export interface CartLine {
  id: string
  name: string
  meta?: string
  unitPrice: number
  quantity: number
  image?: string
}

export interface Order {
  id: string
  date: string
  items: CartLine[]
  total: number
  mode: 'livraison' | 'collect'
  address?: string
  restaurant: string
  paymentMethod: string
  status: 'Commande reçue' | 'Cuisine en préparation' | 'Commande prête' | 'Livreur en route' | 'Livrée'
}

export interface Reservation {
  id: string
  restaurant: string
  date: string
  time: string
  guests: number
  type: string
  name: string
  status: 'Confirmée' | 'En attente'
}

interface AccountUser {
  name: string
  phone: string
  email: string
}

interface AccountState {
  user: AccountUser | null
  points: number
  orders: Order[]
  reservations: Reservation[]
  favorites: number[]
  coupons: string[]
}

const CART_KEY = 'placali:cart'
const ACCOUNT_KEY = 'placali:account'

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable */
  }
}

// ---------- Cart ----------

interface CartContextValue {
  items: CartLine[]
  addItem: (item: Omit<CartLine, 'quantity'> & { quantity?: number }) => void
  updateQuantity: (id: string, delta: number) => void
  removeItem: (id: string) => void
  clear: () => void
  count: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setItems(readStorage(CART_KEY, [] as CartLine[]))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) writeStorage(CART_KEY, items)
  }, [items, hydrated])

  const addItem = useCallback((item: Omit<CartLine, 'quantity'> & { quantity?: number }) => {
    setItems((current) => {
      const existing = current.find((line) => line.id === item.id)
      if (existing) {
        return current.map((line) => (line.id === item.id ? { ...line, quantity: line.quantity + (item.quantity ?? 1) } : line))
      }
      return [...current, { ...item, quantity: item.quantity ?? 1 }]
    })
  }, [])

  const updateQuantity = useCallback((id: string, delta: number) => {
    setItems((current) => {
      const next = current
        .map((line) => (line.id === id ? { ...line, quantity: line.quantity + delta } : line))
        .filter((line) => line.quantity > 0)
      return next
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((line) => line.id !== id))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const count = useMemo(() => items.reduce((sum, line) => sum + line.quantity, 0), [items])
  const subtotal = useMemo(() => items.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0), [items])

  const value = useMemo(
    () => ({ items, addItem, updateQuantity, removeItem, clear, count, subtotal }),
    [items, addItem, updateQuantity, removeItem, clear, count, subtotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

// ---------- Account (mock auth + loyalty) ----------

export type LoyaltyTier = 'Abouré Bronze' | 'Abouré Silver' | 'Abouré Gold' | 'Abouré VIP'

export function tierForPoints(points: number): LoyaltyTier {
  if (points >= 7000) return 'Abouré VIP'
  if (points >= 3000) return 'Abouré Gold'
  if (points >= 1000) return 'Abouré Silver'
  return 'Abouré Bronze'
}

export function nextTierThreshold(points: number) {
  if (points < 1000) return 1000
  if (points < 3000) return 3000
  if (points < 7000) return 7000
  return null
}

interface AccountContextValue extends AccountState {
  isAuthenticated: boolean
  tier: LoyaltyTier
  login: (user: AccountUser) => void
  logout: () => void
  addPoints: (amount: number) => void
  addOrder: (order: Order) => void
  updateOrderStatus: (id: string, status: Order['status']) => void
  addReservation: (reservation: Reservation) => void
  toggleFavorite: (id: number) => void
  redeemCoupon: (code: string) => void
}

const AccountContext = createContext<AccountContextValue | null>(null)

const defaultAccountState: AccountState = { user: null, points: 0, orders: [], reservations: [], favorites: [], coupons: [] }

function AccountProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccountState>(defaultAccountState)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setState(readStorage(ACCOUNT_KEY, defaultAccountState))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) writeStorage(ACCOUNT_KEY, state)
  }, [state, hydrated])

  const login = useCallback((user: AccountUser) => {
    setState((current) => ({ ...current, user }))
  }, [])

  const logout = useCallback(() => setState((current) => ({ ...current, user: null })), [])

  const addPoints = useCallback((amount: number) => {
    setState((current) => ({ ...current, points: Math.max(0, current.points + amount) }))
  }, [])

  const addOrder = useCallback((order: Order) => {
    setState((current) => ({ ...current, orders: [order, ...current.orders] }))
  }, [])

  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setState((current) => ({ ...current, orders: current.orders.map((order) => (order.id === id ? { ...order, status } : order)) }))
  }, [])

  const addReservation = useCallback((reservation: Reservation) => {
    setState((current) => ({ ...current, reservations: [reservation, ...current.reservations] }))
  }, [])

  const toggleFavorite = useCallback((id: number) => {
    setState((current) => ({
      ...current,
      favorites: current.favorites.includes(id) ? current.favorites.filter((favId) => favId !== id) : [...current.favorites, id],
    }))
  }, [])

  const redeemCoupon = useCallback((code: string) => {
    setState((current) => (current.coupons.includes(code) ? current : { ...current, coupons: [...current.coupons, code] }))
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      isAuthenticated: !!state.user,
      tier: tierForPoints(state.points),
      login,
      logout,
      addPoints,
      addOrder,
      updateOrderStatus,
      addReservation,
      toggleFavorite,
      redeemCoupon,
    }),
    [state, login, logout, addPoints, addOrder, updateOrderStatus, addReservation, toggleFavorite, redeemCoupon],
  )

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

export function useAccount() {
  const ctx = useContext(AccountContext)
  if (!ctx) throw new Error('useAccount must be used within AccountProvider')
  return ctx
}

// ---------- Checkout draft (bridges /commander -> /paiement) ----------

export interface CheckoutDraft {
  mode: 'livraison' | 'collect'
  restaurant: string
  address: string
  instructions: string
  tip: number
  promoCode: string
  promoDiscount: number
}

const defaultDraft: CheckoutDraft = { mode: 'livraison', restaurant: 'cocody', address: '', instructions: '', tip: 0, promoCode: '', promoDiscount: 0 }

interface CheckoutContextValue {
  draft: CheckoutDraft
  setDraft: (patch: Partial<CheckoutDraft>) => void
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null)

function CheckoutProvider({ children }: { children: ReactNode }) {
  const [draft, setDraftState] = useState<CheckoutDraft>(defaultDraft)
  const setDraft = useCallback((patch: Partial<CheckoutDraft>) => setDraftState((current) => ({ ...current, ...patch })), [])
  const value = useMemo(() => ({ draft, setDraft }), [draft, setDraft])
  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext)
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider')
  return ctx
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AccountProvider>
      <CartProvider>
        <CheckoutProvider>{children}</CheckoutProvider>
      </CartProvider>
    </AccountProvider>
  )
}
