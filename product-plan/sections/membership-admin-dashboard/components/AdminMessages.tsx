import { useState } from 'react'
import type {
  AdminMessage,
  MemberListItem,
  NewMessageData,
} from '../types'
import {
  Mail,
  Send,
  Inbox,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  X,
  Check,
  Plus,
  Search,
} from 'lucide-react'

interface AdminMessagesProps {
  messages: AdminMessage[]
  members: MemberListItem[]
  onSendMessage?: (message: NewMessageData) => void
  onMarkMessageRead?: (messageId: string) => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function AdminMessages({
  messages,
  members,
  onSendMessage,
  onMarkMessageRead,
}: AdminMessagesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showCompose, setShowCompose] = useState(false)
  const [composeToId, setComposeToId] = useState('')
  const [composeSubject, setComposeSubject] = useState('')
  const [composeBody, setComposeBody] = useState('')
  const [memberSearch, setMemberSearch] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  function showToastMsg(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const sorted = [...messages].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const unreadCount = messages.filter((m) => m.status === 'unread').length

  const filteredMembers = memberSearch
    ? members.filter((m) =>
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(memberSearch.toLowerCase())
      )
    : members

  function handleSend() {
    if (!composeToId || !composeSubject.trim() || !composeBody.trim()) return
    onSendMessage?.({ toMemberId: composeToId, subject: composeSubject, body: composeBody })
    setShowCompose(false)
    setComposeToId('')
    setComposeSubject('')
    setComposeBody('')
    setMemberSearch('')
    showToastMsg('Message sent')
  }

  function toggleExpand(msg: AdminMessage) {
    if (expandedId === msg.id) {
      setExpandedId(null)
    } else {
      setExpandedId(msg.id)
      if (msg.status === 'unread') {
        onMarkMessageRead?.(msg.id)
      }
    }
  }

  const selectedMember = members.find((m) => m.id === composeToId)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] tracking-tight">
            Messages
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            {messages.length} message{messages.length !== 1 ? 's' : ''}
            {unreadCount > 0 && (
              <span className="ml-1 text-amber-600 dark:text-amber-400 font-medium">
                ({unreadCount} unread)
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => setShowCompose(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Compose
        </button>
      </div>

      {/* Message List */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
        {sorted.length === 0 ? (
          <div className="py-12 text-center">
            <Mail className="w-8 h-8 text-stone-300 dark:text-stone-600 mx-auto mb-2" />
            <p className="text-sm text-stone-500 dark:text-stone-400">No messages yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-stone-100 dark:divide-stone-800">
            {sorted.map((msg) => {
              const isExpanded = expandedId === msg.id
              const isUnread = msg.status === 'unread'
              const contactName =
                msg.direction === 'received' ? msg.fromMemberName : msg.toMemberName

              return (
                <li key={msg.id}>
                  <button
                    onClick={() => toggleExpand(msg)}
                    className={`w-full text-left px-5 py-3 flex items-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors ${
                      isUnread ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''
                    }`}
                  >
                    {/* Direction icon */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      msg.direction === 'received'
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-stone-100 text-stone-500 dark:bg-stone-700 dark:text-stone-400'
                    }`}>
                      {msg.direction === 'received' ? (
                        <Inbox className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {isUnread && (
                          <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        )}
                        <span className={`text-sm truncate ${
                          isUnread
                            ? 'font-semibold text-stone-900 dark:text-stone-100'
                            : 'font-medium text-stone-700 dark:text-stone-300'
                        }`}>
                          {msg.subject}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        {msg.direction === 'received' ? 'From' : 'To'}: {contactName}
                      </p>
                    </div>

                    <span className="text-[11px] text-stone-400 dark:text-stone-500 shrink-0 whitespace-nowrap">
                      {formatDate(msg.timestamp)}
                    </span>

                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-4 pt-0 ml-11">
                      <div className="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700">
                        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-wrap">
                          {msg.body}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 dark:bg-black/60">
          <div className="bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-700 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-700">
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                New Message
              </h3>
              <button
                onClick={() => setShowCompose(false)}
                className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Recipient */}
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                  To
                </label>
                {composeToId && selectedMember ? (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                      {selectedMember.firstName[0]}{selectedMember.lastName[0]}
                    </div>
                    <span className="text-sm text-stone-900 dark:text-stone-100">
                      {selectedMember.firstName} {selectedMember.lastName}
                    </span>
                    <button
                      onClick={() => { setComposeToId(''); setMemberSearch('') }}
                      className="ml-auto p-0.5 rounded text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      placeholder="Search members..."
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
                    />
                    {memberSearch && (
                      <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                        {filteredMembers.slice(0, 8).map((m) => (
                          <button
                            key={m.id}
                            onClick={() => {
                              setComposeToId(m.id)
                              setMemberSearch('')
                            }}
                            className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-stone-50 dark:hover:bg-stone-700 text-sm text-stone-800 dark:text-stone-200 transition-colors"
                          >
                            <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-[9px] font-bold text-emerald-700 dark:text-emerald-400">
                              {m.firstName[0]}{m.lastName[0]}
                            </div>
                            {m.firstName} {m.lastName}
                          </button>
                        ))}
                        {filteredMembers.length === 0 && (
                          <p className="px-3 py-2 text-xs text-stone-500">No members found</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  placeholder="Message subject"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                  Message
                </label>
                <textarea
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors resize-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 rounded-b-xl">
              <button
                onClick={() => setShowCompose(false)}
                className="px-4 py-2 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={!composeToId || !composeSubject.trim() || !composeBody.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-300 dark:disabled:bg-stone-700 text-white disabled:text-stone-500 text-sm font-medium transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
