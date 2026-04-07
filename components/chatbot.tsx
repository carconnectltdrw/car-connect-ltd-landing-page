"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageSquare, Bot, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FAQS } from "@/components/faq-data"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string; kind?: "reaction"; reaction?: { alt: string; srcWebp: string; src: string; width: number; height: number }; id?: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [showGoodbyeEmoji, setShowGoodbyeEmoji] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim()

  const findFAQAnswer = (message: string) => {
    const normalized = normalizeText(message)
    if (!normalized) return null

    let bestMatch = null
    let bestScore = 0

    for (const faq of FAQS) {
      for (const keyword of faq.q) {
        const normalizedKeyword = normalizeText(keyword)
        if (!normalizedKeyword) continue

        // Improved matching: partial matches with scoring
        if (normalized.includes(normalizedKeyword) || normalizedKeyword.includes(normalized)) {
          const score = Math.min(normalizedKeyword.length, normalized.length) / Math.max(normalizedKeyword.length, normalized.length)
          if (score > bestScore && score > 0.3) { // Minimum 30% match
            bestMatch = faq.a
            bestScore = score
          }
        }
      }
    }

    return bestMatch
  }

  const findClosestFAQ = (message: string) => {
    // Return any FAQ that has partial keyword matches
    const normalized = normalizeText(message)
    if (!normalized) return null

    for (const faq of FAQS) {
      for (const keyword of faq.q) {
        const normalizedKeyword = normalizeText(keyword)
        if (!normalizedKeyword) continue

        if (normalized.includes(normalizedKeyword) || normalizedKeyword.includes(normalized)) {
          return faq.a
        }
      }
    }

    // If no matches, return first FAQ as general help
    return FAQS.length > 0 ? FAQS[0].a : null
  }

  const isGoodbyeMessage = (text: string) => {
    const normalized = normalizeText(text)
    if (!normalized) return false

    const goodbyeKeywords = ["bye", "goodbye", "see you", "later", "bye bye", "byee"]
    return goodbyeKeywords.some((keyword) => normalized.includes(normalizeText(keyword)))
  }

  const detectReactionEmoji = (text: string) => {
    const normalized = normalizeText(text)
    if (!normalized) return null

    const positiveKeywords = /thank|thanks|ty|appreciate|awesome|great|good job|well done|nice/i
    const loveKeywords = /love|luv|heart|romantic|adorable/i
    const birthdayKeywords = /birthday|bday|happy birthday|cake/i
    const sadKeywords = /sad|depressed|unhappy|lonely|heartbroken|broken heart|cry/i
    const jokeKeywords = /joke|lol|haha|funny|laugh/i
    const saluteKeywords = /salute|respect|sir|ma'am|maam|saluting/i
    const badWords = /fuck|shit|damn|bastard|idiot|stupid|trash/i

    if (loveKeywords.test(text)) {
      return {
        alt: "❤",
        srcWebp: "https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.webp",
        src: "https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.gif",
        width: 32,
        height: 32,
      }
    }

    if (birthdayKeywords.test(text)) {
      return {
        alt: "🎂",
        srcWebp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f382/512.webp",
        src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f382/512.gif",
        width: 32,
        height: 32,
      }
    }

    if (sadKeywords.test(text)) {
      return {
        alt: "🥺",
        srcWebp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f97a/512.webp",
        src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f97a/512.gif",
        width: 32,
        height: 32,
      }
    }

    if (jokeKeywords.test(text)) {
      return {
        alt: "😜",
        srcWebp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f61c/512.webp",
        src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f61c/512.gif",
        width: 32,
        height: 32,
      }
    }

    if (badWords.test(text)) {
      return {
        alt: "😳",
        srcWebp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f633/512.webp",
        src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f633/512.gif",
        width: 32,
        height: 32,
      }
    }

    if (saluteKeywords.test(text)) {
      return {
        alt: "🫡",
        srcWebp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1fae1/512.webp",
        src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1fae1/512.gif",
        width: 32,
        height: 32,
      }
    }

    if (positiveKeywords.test(text)) {
      const positiveEmojis = [
        {
          alt: "👏",
          srcWebp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f44f/512.webp",
          src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f44f/512.gif",
          width: 32,
          height: 32,
        },
        {
          alt: "🤙",
          srcWebp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f919/512.webp",
          src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f919/512.gif",
          width: 32,
          height: 32,
        },
        {
          alt: "👌",
          srcWebp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f44c/512.webp",
          src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f44c/512.gif",
          width: 32,
          height: 32,
        },
        {
          alt: "🤝",
          srcWebp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f91d/512.webp",
          src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f91d/512.gif",
          width: 32,
          height: 32,
        },
      ]
      return positiveEmojis[Math.floor(Math.random() * positiveEmojis.length)]
    }

    if (text.match(/\?/g)?.length || /many questions|many things|ask many|asking many|lots of questions/.test(text)) {
      return {
        alt: "🫩",
        srcWebp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1fae9/512.webp",
        src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1fae9/512.gif",
        width: 32,
        height: 32,
      }
    }

    if (/not concern|doesn?t concern|not about|unrelated|other topic|irrelevant/.test(text)) {
      return {
        alt: "🤔",
        srcWebp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/512.webp",
        src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/512.gif",
        width: 32,
        height: 32,
      }
    }

    return null
  }

  const fetchAI = async (message: string, history: { role: string; content: string }[]) => {
    try {
      console.log("fetchAI called with:", { message, history })

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      })

      console.log("API response status:", res.status)

      if (!res.ok) {
        const errorText = await res.text()
        console.error("API error response:", errorText)
        throw new Error(`API failed with status ${res.status}: ${errorText}`)
      }

      const data = await res.json()
      console.log("API response data:", data)

      // Accept reply, content, or message fields
      const responseText = data?.reply || data?.content || data?.message || data?.response

      if (!responseText || typeof responseText !== 'string') {
        console.warn("No valid response text found in:", data)
        throw new Error("Invalid response format")
      }

      return responseText.trim()
    } catch (error) {
      console.error("fetchAI error:", error)
      throw error // Re-throw to be handled by caller
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const typeMessage = (text: string, onUpdate: (output: string) => void, onComplete: () => void) => {
    // Validate input
    if (!text || typeof text !== 'string') {
      console.warn("typeMessage received invalid text:", text)
      onComplete()
      return
    }

    // Ensure text is not too long (prevent hanging)
    const safeText = text.length > 10000 ? text.substring(0, 10000) + "..." : text

    let i = 0
    let output = ""
    let timeoutId: NodeJS.Timeout

    const interval = setInterval(() => {
      try {
        if (i < safeText.length) {
          output += safeText[i]
          onUpdate(output)
          i++
        } else {
          clearInterval(interval)
          if (timeoutId) clearTimeout(timeoutId)
          onComplete()
        }
      } catch (error) {
        console.error("Error in typeMessage interval:", error)
        clearInterval(interval)
        if (timeoutId) clearTimeout(timeoutId)
        onComplete()
      }
    }, 15)

    // Safety timeout - complete after 30 seconds max
    timeoutId = setTimeout(() => {
      console.warn("typeMessage timeout reached")
      clearInterval(interval)
      onUpdate(safeText)
      onComplete()
    }, 30000)
  }

  const handleRating = (stars: number) => {
    setRating(stars)
    setMessages(prev => [...prev, {
      role: "assistant",
      content: `Thank you for rating us ${"⭐".repeat(stars)}! We're glad you enjoyed our service. Is there anything else we can help you with? 😊`
    }])
    setShowRating(false)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAttachedFile(e.target.files[0])
    }
  }

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    let messageWithFile = trimmed
    if (attachedFile) {
      messageWithFile = `${trimmed} (User uploaded file: ${attachedFile.name})`
    }

    const userMessage = { role: "user" as const, content: messageWithFile }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setAttachedFile(null)
    setLoading(true)
    setError(false)

    const reaction = detectReactionEmoji(trimmed)
    if (reaction) {
      const reactionId = `${Date.now()}-${Math.random()}`
      const reactionMessage = {
        id: reactionId,
        role: "assistant" as const,
        content: "",
        kind: "reaction" as const,
        reaction,
      }
      setMessages(prev => [...prev, reactionMessage])
      
      // Wait for emoji to display for 6 seconds
      await new Promise((resolve) => setTimeout(resolve, 6000))
      
      // Remove the emoji and continue with text response
      setMessages(prev => prev.filter((message) => message.id !== reactionId))
    }

    if (isGoodbyeMessage(trimmed)) {
      setMessages(prev => [...prev, { role: "assistant", content: "Goodbye! 👋" }])
      setShowGoodbyeEmoji(true)
      setIsClosing(true)

      setTimeout(() => {
        setShowGoodbyeEmoji(false)
        setIsClosing(false)
        setIsOpen(false)
        setIsMinimized(false)
        setMessages([])
      }, 5000)

      setLoading(false)
      return
    }

    let responseText: string = ""

    try {
      const history = [...messages, userMessage].slice(-10)

      const faqAnswer = findFAQAnswer(trimmed)
      if (faqAnswer) {
        responseText = faqAnswer
      } else {
        try {
          responseText = await fetchAI(messageWithFile, history)
        } catch (aiError) {
          console.error("AI failed, trying FAQ fallback:", aiError)
          const fallbackFAQ = findClosestFAQ(trimmed)
          if (fallbackFAQ) {
            responseText = `${fallbackFAQ}\n\n💡 This might help answer your question! If you need more specific assistance, feel free to ask. 😊`
          } else {
            responseText = "I'm here to help with CarConnect services! Could you tell me more about what you're looking for? I can assist with our mobility app, delivery services, or general questions. 🚗✨"
          }
        }
      }

      if (!responseText || typeof responseText !== 'string') {
        console.error("Invalid responseText:", responseText)
        responseText = "I apologize, but I'm having trouble processing your request right now. Please try again in a moment. 😊"
      }

      setMessages(prev => [...prev, { role: "assistant", content: "" }])

      typeMessage(responseText, (output) => {
        setMessages(prev => {
          const newMessages = [...prev]
          if (newMessages.length > 0) {
            newMessages[newMessages.length - 1] = { role: "assistant", content: output }
          }
          return newMessages
        })
      }, () => {
        setLoading(false)
      })

    } catch (error) {
      console.error("Critical error in handleSendMessage:", error)
      setError(true)
      const emergencyMessage = "Oops! Something went wrong on my end. I'm here to help though - feel free to ask me about CarConnect services anytime! 😊"

      setMessages(prev => [...prev, { role: "assistant", content: "" }])

      typeMessage(emergencyMessage, (output) => {
        setMessages(prev => {
          const newMessages = [...prev]
          if (newMessages.length > 0) {
            newMessages[newMessages.length - 1] = { role: "assistant", content: output }
          }
          return newMessages
        })
      }, () => {
        setLoading(false)
        setError(false)
      })
    }
  }

  return (
    <>
      <div
        onClick={() => {
          if (isOpen) setIsMinimized(false)
          else setIsOpen(true)
        }}
        className={cn(
          "fixed bottom-8 right-8 w-16 h-16 bg-[#30a648] rounded-full shadow-2xl flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-all z-[100] hover:rotate-12 animate-bounce",
          isOpen && !isMinimized && "scale-0 opacity-0 pointer-events-none",
        )}
      >
        <MessageSquare size={28} />
        {messages.length > 0 && !isMinimized && !isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </div>

      <div
        className={cn(
          "fixed bottom-8 right-8 w-[calc(100vw-4rem)] md:w-[420px] h-[650px] max-h-[calc(100vh-8rem)] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col z-[100] border border-slate-100 overflow-hidden transition-all duration-500 transform origin-bottom-right",
          isClosing
            ? "scale-0 opacity-0 transition-all duration-500"
            : isOpen && !isMinimized
            ? "scale-100 opacity-100 animate-in fade-in slide-in-from-bottom-4"
            : "scale-0 opacity-0 pointer-events-none translate-y-20",
        )}
      >
        <div className="p-6 bg-[#30a648] text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm animate-pulse">
              <Bot size={28} />
            </div>
            <div>
              <h4 className="font-bold text-lg">CarConnect Assistant</h4>
              <p className="text-xs text-white/70">Always online to help you ✨</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(true)}
              className="text-white hover:bg-white/10 rounded-full"
            >
              <Minus size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 rounded-full"
            >
              <X size={20} />
            </Button>
          </div>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm text-slate-700 text-sm leading-relaxed">
                Hello! 👋 I'm the CarConnect Assistant. I can help you with information about our services, answer questions about CarConnect, or assist with general inquiries. How can I help you today? 😊
              </div>
              <div className="grid gap-2">
                <button
                  onClick={() => window.open("https://wa.me/250780114522?text=Hello CarConnect Ltd, I have a question about your services.", "_blank")}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 text-xs text-[#25D366] font-bold hover:bg-[#25D366]/20 transition-all hover:scale-105 animate-in fade-in slide-in-from-right-2"
                >
                  Ask on WhatsApp 💬
                </button>
              </div>
            </div>
          )}

          {messages.map((m, index) => (
            <div key={m.id ?? index}>
              {m.kind === "reaction" && m.reaction ? (
                <div
                  className={cn(
                    "p-3 rounded-3xl text-sm shadow-sm animate-in fade-in slide-in-from-bottom-2 transition-transform duration-200 bg-white border border-slate-100",
                    "max-w-fit",
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="reaction-bubble">
                    <picture>
                      <source srcSet={m.reaction.srcWebp} type="image/webp" />
                      <img src={m.reaction.src} alt={m.reaction.alt} width={m.reaction.width} height={m.reaction.height} />
                    </picture>
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    "p-4 rounded-2xl text-sm shadow-sm animate-in fade-in slide-in-from-bottom-2 hover:scale-105 transition-transform duration-200",
                    m.role === "user"
                      ? "w-fit bg-[#30a648] text-white ml-auto rounded-tr-none"
                      : "max-w-[80%] bg-white text-slate-900 border border-slate-100 rounded-tl-none",
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {m.content.split('\n').map((line: string, i: number) => (
                    <div key={i} className={i > 0 ? "mt-2" : ""}>{line}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-slate-400 text-xs w-fit animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#30a648] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-[#30a648] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-[#30a648] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                <span className="ml-2 text-[#30a648] font-medium">CarConnect Assistant is typing...</span>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage(input)
            setInput("")
          }}
          className="p-4 border-t border-slate-100 flex gap-2 bg-white items-center"
        >
          <label className="cursor-pointer">
            <input type="file" onChange={handleFile} className="hidden" />
            <div className="p-2 text-slate-400 hover:text-[#30a648] transition-colors hover:scale-110">
              📎
            </div>
          </label>
          {attachedFile && (
            <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
              {attachedFile.name}
            </div>
          )}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about CarConnect... 😊"
            className="flex-1 bg-slate-50 border-none rounded-2xl px-4 h-12 text-sm focus:ring-2 focus:ring-[#30a648] outline-none transition-all"
            disabled={loading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading || !input.trim()}
            className="bg-[#30a648] hover:bg-[#30a648]/90 rounded-2xl h-12 w-12 shrink-0 disabled:opacity-50 transition-all hover:scale-105"
          >
            <Send size={18} />
          </Button>
        </form>
      </div>

      {showGoodbyeEmoji && (
        <div className="goodbye-emoji">
          <picture>
            <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.webp" type="image/webp" />
            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif" alt="👋" width="64" height="64" />
          </picture>
        </div>
      )}

      <style jsx>{`
        .reaction-bubble {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 9999px;
          background: rgba(48, 166, 72, 0.12);
          border: 1px solid rgba(48, 166, 72, 0.22);
          box-shadow: 0 10px 30px rgba(48, 166, 72, 0.12);
          animation: reaction-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, reaction-fade 0.5s ease-in 2.4s forwards;
        }

        @keyframes reaction-pop {
          0% {
            transform: scale(0.2);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          75% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes reaction-fade {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.85);
          }
        }

        .goodbye-emoji {
          position: fixed;
          right: 2.5rem;
          bottom: 22rem;
          z-index: 110;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: zoom-in 0.35s ease-out forwards, fade-out 1s ease-out 4s forwards;
        }

        @keyframes zoom-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fade-out {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.9);
          }
        }
      `}</style>
    </>
  )
}
