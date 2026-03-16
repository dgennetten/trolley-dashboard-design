import { useState } from 'react'
import type {
  Message,
  NewMessageData,
  MessageRecipientType,
} from '@/../product/sections/authentication-and-member-portal/types'
import {
  MessageSquare,
  Send,
  X,
  Plus,
  Inbox,
  CheckCheck,
  Eye,
  Clock,
} from 'lucide-react'

export interface MessagesPageProps {
  messages: Message[]
  onSendMessage?: (data: NewMessageData) => void
  onNavigate?: (href: string) => void
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatTime(d: string) {
  return new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

const STATUS_CONFIG: Record<string, { icon: typeof Clock; label: string; classes: string }> = {
  sent: { icon: Clock, label: 'Sent', classes: 'text-stone-400 dark:text-stone-500' },
  read: { icon: Eye, label: 'Read', classes: 'text-blue-500 dark:text-blue-400' },
  replied: { icon: CheckCheck, label: 'Replied', classes: 'text-emerald-600 dark:text-emerald-400' },
}

export function MessagesPage({ messages, onSendMessage }: MessagesPageProps) {
  const [composeOpen, setComposeOpen] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [newMsg, setNewMsg] = useState<NewMessageData>({
    recipientType: 'admin',
    subject: '',
    body: '',
  })

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    onSendMessage?.(newMsg)
    setNewMsg({ recipientType: 'admin', subject: '', body: '' })
    setComposeOpen(false)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center ring-1 ring-emerald-100 dark:ring-emerald-900/40">
            <Inbox className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
              Messages
            </h1>
            <p className="text-xs text-stone-400 dark:text-stone-500">
              {messages.length} sent message{messages.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <button
          onClick={() => setComposeOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Compose
        </button>
      </div>

      {/* Message list */}
      {messages.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 p-12 text-center">
          <MessageSquare className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-4" strokeWidth={1} />
          <h2 className="text-lg font-semibold text-stone-700 dark:text-stone-300 font-['DM_Sans']">
            No messages yet
          </h2>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            Send a message to the membership admin or your volunteer group lead.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 overflow-hidden divide-y divide-stone-100 dark:divide-stone-800">
          {messages.map((msg) => {
            const status = STATUS_CONFIG[msg.status] || STATUS_CONFIG.sent
            const StatusIcon = status.icon
            const isExpanded = expandedId === msg.id

            return (
              <div
                key={msg.id}
                className="cursor-pointer hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : msg.id)}
              >
                <div className="px-5 py-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0 mt-0.5">
                      <MessageSquare className="w-4 h-4 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                          {msg.subject}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${status.classes}`}>
                          <StatusIcon className="w-3 h-3" strokeWidth={2} />
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-stone-400 dark:text-stone-500">
                          To: {msg.recipientName}
                        </span>
                        <span className="text-stone-300 dark:text-stone-600">·</span>
                        <span className="text-xs text-stone-400 dark:text-stone-500">
                          {formatDate(msg.sentAt)} at {formatTime(msg.sentAt)}
                        </span>
                      </div>
                    </div>
                    <span className={`
                      text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
                      ${msg.recipientType === 'admin'
                        ? 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                        : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'
                      }
                    `}>
                      {msg.recipientType}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 ml-12 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                      <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-wrap">
                        {msg.body}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Compose modal */}
      {composeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setComposeOpen(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800">
            <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                New Message
              </h2>
              <button onClick={() => setComposeOpen(false)} className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={handleSend} className="p-6 space-y-5">
              <div>
                <label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">To</label>
                <div className="flex gap-3">
                  {(['admin', 'lead'] as MessageRecipientType[]).map((type) => (
                    <label
                      key={type}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-all ${
                        newMsg.recipientType === type
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-200 dark:ring-emerald-800'
                          : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="recipientType"
                        value={type}
                        checked={newMsg.recipientType === type}
                        onChange={() => setNewMsg((p) => ({ ...p, recipientType: type }))}
                        className="sr-only"
                      />
                      {type === 'admin' ? 'Membership Admin' : 'Role Lead'}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5 block">Subject</label>
                <input
                  type="text"
                  required
                  value={newMsg.subject}
                  onChange={(e) => setNewMsg((p) => ({ ...p, subject: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5 block">Message</label>
                <textarea
                  required
                  rows={4}
                  value={newMsg.body}
                  onChange={(e) => setNewMsg((p) => ({ ...p, body: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none"
                  placeholder="Type your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" strokeWidth={1.5} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
