'use client'

import { useState } from 'react'
import { ArrowUp, Check, Plus, Sparkles, X } from 'lucide-react'
import { askAboure, type AssistantReply } from '@/lib/assistant'
import { formatFCFA } from '@/lib/format'
import { useCart } from '@/lib/store'

interface Message {
  role: 'bot' | 'user'
  text: string
  dishes?: AssistantReply['dishes']
}

const starterSuggestions = ['Je veux quelque chose de pas trop épicé', 'Je suis 8 personnes, que me conseillez-vous ?', 'Vos horaires ?', 'Comment réserver une table ?']

export function AIAssistant() {
  const { addItem } = useCart()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Bonjour, je suis Abouré, votre assistant. Demandez-moi un plat, une réservation ou nos promotions du moment.' },
  ])
  const [input, setInput] = useState('')
  const [addedIds, setAddedIds] = useState<number[]>([])

  function addDish(id: number, name: string, price: number, image: string) {
    addItem({ id: `dish-${id}`, name, unitPrice: price, image })
    setAddedIds((current) => [...current, id])
  }

  function send(text: string) {
    if (!text.trim()) return
    const reply = askAboure(text)
    setMessages((current) => [...current, { role: 'user', text }, { role: 'bot', text: reply.text, dishes: reply.dishes }])
    setInput('')
  }

  return (
    <>
      {!open && (
        <button className="ai-launcher" onClick={() => setOpen(true)}>
          <Sparkles size={18} />
          <span>Demandez à Abouré</span>
        </button>
      )}
      {open && (
        <div className="ai-panel" role="dialog" aria-label="Assistant Abouré">
          <div className="ai-head">
            <div>
              <strong>Demandez à Abouré</strong>
              <small>Assistant IA · réponse instantanée</small>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Fermer l’assistant" style={{ background: 'none', border: 0, color: '#fff' }}>
              <X size={19} />
            </button>
          </div>
          <div className="ai-body">
            {messages.map((message, index) => (
              <div key={index} className={`ai-msg ${message.role}`}>
                <p style={{ margin: 0 }}>{message.text}</p>
                {message.dishes && message.dishes.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
                    {message.dishes.map((dish) => {
                      const added = addedIds.includes(dish.id)
                      return (
                        <button
                          key={dish.id}
                          onClick={() => !added && addDish(dish.id, dish.name, dish.price, dish.image)}
                          style={{ alignItems: 'center', background: '#fff', border: '1px solid var(--line)', display: 'flex', gap: 8, justifyContent: 'space-between', padding: '8px 10px', textAlign: 'left' }}
                        >
                          <span>{dish.name}</span>
                          <span style={{ alignItems: 'center', display: 'flex', gap: 8, flexShrink: 0 }}>
                            <strong>{formatFCFA(dish.price)}</strong>
                            {added ? <Check size={14} style={{ color: 'var(--forest)' }} /> : <Plus size={14} style={{ color: 'var(--terracotta)' }} />}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
          {messages.length <= 2 && (
            <div className="ai-suggestions">
              {starterSuggestions.map((suggestion) => (
                <button key={suggestion} onClick={() => send(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <form
            className="ai-form"
            onSubmit={(event) => {
              event.preventDefault()
              send(input)
            }}
          >
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Écrivez votre question…" aria-label="Votre question" />
            <button type="submit" aria-label="Envoyer">
              <ArrowUp size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
