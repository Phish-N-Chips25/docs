import { useContext } from 'react'
import { SlideDeckContext } from './SlideDeckContext'

export function useSlideDeck() {
  const ctx = useContext(SlideDeckContext)
  if (!ctx) throw new Error('useSlideDeck must be used inside SlideDeckProvider')
  return ctx
}
