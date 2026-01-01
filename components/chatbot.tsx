"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState, useRef, useEffect } from "react"
import { Send, X, MessageSquare, Bot, Minus, Paperclip, CheckCircle2, Star, Search, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const FAQS = [
  {
    q: "What is CarConnect Ltd?",
    a: "CarConnect Ltd is Rwanda's leading smart mobility and logistics technology provider based in Kicukiro, Kigali.",
  },
  { q: "Who are the leaders?", a: "Our Managing Director is Promesse IRAKOZE and our CEO is John Mugiraneza." },
  {
    q: "How can I contact support?",
    a: "You can reach us at carconnectltd.rw@gmail.com or via WhatsApp at +250 780 114 522.",
  },
  {
    q: "When will the app be ready?",
    a: "Our mobile apps for Android and iOS are in the final stages of development and will be available very soon!",
  },
]

const CARCONNECT_INFO = {
  company: "CarConnect Ltd is Rwanda's premier smart mobility and logistics technology company, headquartered in Kicukiro, Kigali.",
  services: [
    "Mobility App - All-in-one platform for secure package delivery and vehicle management",
    "Delivery & Tracking - Real-time GPS tracking and end-to-end transparency",
    "Enterprise Solutions - Fleet management and digital tools for businesses"
  ],
  contact: {
    email: "carconnectltd.rw@gmail.com",
    whatsapp: "+250 780 114 522",
    location: "Kicukiro, Kigali – Rwanda"
  },
  leaders: {
    md: "Promesse IRAKOZE (Managing Director)",
    ceo: "John Mugiraneza (CEO)"
  }
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [isSending, setIsSending] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [interactionCount, setInteractionCount] = useState(0)
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [emailInput, setEmailInput] = useState("")
  const [questionForEmail, setQuestionForEmail] = useState("")
  const [autoCloseTimeout, setAutoCloseTimeout] = useState<NodeJS.Timeout | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const { sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: `${process.env.NEXT_PUBLIC_API_URL}/chat` }),
  })
  const isLoading = status === "streaming" || status === "submitted" || isTyping
  const scrollRef = useRef<HTMLDivElement>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const botName = "CarConnect Assistant"

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (interactionCount >= 6 && !showRating) {
      setTimeout(() => setShowRating(true), 2000)
    }
  }, [interactionCount, showRating])

  const handleRating = (stars: number) => {
    setRating(stars)
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: "assistant",
      content: `Thank you for rating us ${"⭐".repeat(stars)}! We're glad you enjoyed our service. Is there anything else we can help you with? 😊`
    }])
    setShowRating(false)
  }

  const handleEmailSubmit = async () => {
    if (!emailInput.trim() || !questionForEmail.trim()) return

    setIsSending(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Chatbot User",
          email: emailInput,
          message: `Question from chatbot: ${questionForEmail}`
        })
      })

      const data = await response.json()

      if (response.ok) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: "assistant",
          content: `📧 Perfect! I've sent your question to our support team. They'll get back to you at ${emailInput} within 24 hours. Is there anything else I can help you with in the meantime? 😊`
        }])
        setShowEmailForm(false)
        setEmailInput("")
        setQuestionForEmail("")
        setShowConfirmation(true)
        setTimeout(() => setShowConfirmation(false), 5000)
      } else {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: "assistant",
          content: `❌ Sorry, there was an issue sending your message. Please try again or contact us directly at carconnectltd.rw@gmail.com.`
        }])
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: `❌ Sorry, there was an issue sending your message. Please try again or contact us directly at carconnectltd.rw@gmail.com.`
      }])
    } finally {
      setIsSending(false)
    }
  }

  const handleGoodbye = () => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: "assistant",
      content: "Goodbye! 👋 It was great chatting with you. Feel free to come back anytime if you need help with CarConnect services! 🚗✨"
    }])

    // Auto-close with animation after 3 seconds
    setTimeout(() => {
      setIsOpen(false)
      setIsMinimized(false)
    }, 3000)
  }

  const handleFaqClick = (question: string, answer: string) => {
    // In a real implementation, we would append these to the UI messages
    sendMessage({ text: question })
  }

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/250780114522?text=Hello CarConnect Ltd, I have a question about your services.",
      "_blank",
    )
  }

  const extractName = (text: string): string | null => {
    const patterns = [
      /my name is (\w+)/i,
      /i am (\w+)/i,
      /call me (\w+)/i,
      /^(\w+)$/i,
      /it's (\w+)/i,
      /name: (\w+)/i
    ]
    for (const pattern of patterns) {
      const match = text.match(pattern)
      if (match && match[1]) return match[1]
    }
    return null
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMsg = { id: Date.now().toString(), role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsSending(true)
    setInteractionCount(prev => prev + 1)

    // Simulate typing indicator with variable delay
    const typingDelay = Math.random() * 2000 + 1000 // 1-3 seconds
    setIsTyping(true)
    setTimeout(() => setIsTyping(false), typingDelay)

    // Variable response delay
    const responseDelay = Math.random() * 2000 + 2000 // 2-4 seconds
    setTimeout(async () => {
      let reply = ""
      const q = text.toLowerCase().trim()

      // Name handling
      const extractedName = extractName(text)
      if (extractedName && !userName) {
        setUserName(extractedName)
        reply = `Nice to meet you, ${extractedName}! How can I help you today?`
      } else if (extractedName && userName && extractedName !== userName) {
        setUserName(extractedName)
        reply = `Got it, I'll call you ${extractedName} from now on! 😊`
      } else {
        // Small-talk responses
        if (/^(hi|hello|hey|yo|hi there|hey there|heyy|hii|good morning|morning|good afternoon|good evening|sup|what's up|wassup|wazzup|whassup|howdy)/.test(q) || q.includes("hi ") || q.includes("hello ")) {
          reply = userName ? `Hi there, ${userName}! How can I help you today? 🙂` : "Hi there! How can I help you today? 🙂"
        }
        else if (/how are you|how r u|how are ya|how's it going|how you doing|you good|r u good|how are things|everything good/.test(q)) {
          reply = userName ? `I'm doing great, thanks for asking! How about you, ${userName}? 🙂` : "I'm doing great, thanks for asking! How about you? 🙂"
        }
        else if (/i'm fine|i'm good|i'm okay|i'm alright|i'm great|all good|doing good|decent|chill/.test(q)) {
          reply = "That's great to hear! 😊"
        }
        else if (/not fine|not okay|i'm sad|i feel bad|i'm not good|i'm upset|i'm stressed|i'm depressed|i'm down/.test(q)) {
          reply = "I'm sorry to hear that. Do you want to talk about it? 💬"
        }
        else if (/thanks|thank you|thx|ty|appreciate it|thanks a lot|many thanks/.test(q)) {
          reply = "You're welcome! 😊"
        }
        else if (/bye|goodbye|cya|see ya|see you later|later|take care|i'm leaving|gtg|good night|gn/.test(q)) {
          reply = "Bye! Have a great day 👋"
          setTimeout(() => {
            setIsOpen(false)
            setMessages([])
            setInteractionCount(0)
            setShowRating(false)
          }, 2000)
        }
        else if (/what's your name|ur name|who are you|what are you|are you human|are you a bot|are you real/.test(q)) {
          reply = userName ? `My name is ${botName}. Nice to chat with you again, ${userName}! What's up? 🙂` : `My name is ${botName}. What's your name? 🙂`
        }
        else if (/what's my name|do you remember my name|what is my name/.test(q)) {
          if (userName) {
            reply = `Your name is ${userName} 🙂`
          } else {
            reply = "I don't think I've learned your name yet. What should I call you?"
          }
        }
        else if (/help|i need help|can you help me|please help|assist me|what can you do|how can you help/.test(q)) {
          reply = "Sure! Tell me what you need help with 🙂"
        }
        else if (/tell me a joke|make me laugh|joke please|something funny/.test(q)) {
          reply = "Sure 😄 Why don't scientists trust atoms? Because they make up everything!"
        }
        else if (/what are you doing|wyd|what u doing|bored|bored af|sup/.test(q)) {
          reply = "Just chatting with you 🙂 What's up?"
        }
        else if (/where are you from|where do you live|your location/.test(q)) {
          reply = "I live on the internet 😄"
        }
        else if (/how old are you|do you sleep|do you eat|do you have friends|are you alive/.test(q)) {
          reply = "I'm just software, so I don't have those things — but I'm here for you 🙂"
        }
        else if (/i like you|you're nice|you're cute|you're cool|you're smart/.test(q)) {
          reply = "Thank you! That's really kind of you 😊"
        }
        else if (/sorry|my bad|sry|apologies/.test(q)) {
          reply = "No worries at all 🙂"
        }
        else if (/you're stupid|bad bot|useless|shut up|i hate you/.test(q)) {
          reply = "I'm sorry you feel that way. I'm here to help if you need anything."
        }
        else if (/repeat|say again|what|huh|i didn't understand/.test(q)) {
          reply = "Sure! Could you say it again a different way? 🙂"
        }
        else if (/what can you do|your purpose|what are your abilities|what's your job|why are you here/.test(q)) {
          reply = "I can chat, answer questions, and try to help you 🙂"
        }
        else if (/^hi\?$|^yo\?$|^\?\?$/.test(q)) {
          reply = "Hi! How can I help you? 🙂"
        }
        else if (/happy morning|have a nice day|good to see you/.test(q)) {
          reply = "Thanks! Wishing you a great day too 😊"
        }
        else if (/i passed|i did it|good news|i'm happy/.test(q)) {
          reply = "That's awesome — congratulations! 🎉"
        }
        else if (/i love you|will you be my friend|do you like me/.test(q)) {
          reply = "I'm happy you feel that way 🙂 I'm here as your chatbot friend!"
        }
        else if (/are you there|you here|can you talk/.test(q)) {
          reply = "Yes, I'm here 🙂 What's up?"
        }
        else if (/what time is it|what day is it/.test(q)) {
          reply = "I might not always have the exact time, but how can I help you?"
        }
        else if (/yo bro|sup mate|hi dude|hello buddy/.test(q)) {
          reply = "Hey! What's going on? 🙂"
        }
        else {
          // CarConnect logic
          // Check for illegal/inappropriate content
          const illegalKeywords = ["hack", "illegal", "drugs", "violence", "porn", "sex", "kill", "steal", "fraud", "scam"]
          if (illegalKeywords.some(word => q.includes(word))) {
            reply = "Sorry, I can't help with that. 😔 If you have questions about CarConnect services, I'm here to help!"
          }
          // Goodbye detection
          else if (q.includes("bye") || q.includes("goodbye") || q.includes("see you") || q.includes("farewell") || q.includes("ciao")) {
            reply = "Goodbye! 👋 It was great chatting with you. Feel free to come back anytime! 😊"
            setTimeout(() => {
              setIsOpen(false)
              setMessages([])
              setInteractionCount(0)
              setShowRating(false)
            }, 2000) // Close after 2 seconds
          }
          // Greeting responses - more flexible
          else if (/^(hi|hello|hey|good morning|good afternoon|good evening|salut|salute|greetings|howdy|sup|yo)/.test(q) || q.includes("hi ") || q.includes("hello ")) {
            const greetings = [
              "Hello! 👋 Welcome to CarConnect Ltd. How can I assist you today? 😊",
              "Hi there! ✨ I'm here to help with anything about CarConnect. What can I do for you?",
              "Hey! 😄 Great to see you. How can I help you learn more about our services?",
              "Greetings! 🌟 Welcome to CarConnect. What would you like to know?"
            ]
            reply = greetings[Math.floor(Math.random() * greetings.length)]
            setSuggestions(["What services do you offer?", "Tell me about your app", "Who are your leaders?"])
          }
          // Company information
          else if ((q.includes("what") && q.includes("carconnect")) || q.includes("about carconnect") || q.includes("tell me about")) {
            reply = `${CARCONNECT_INFO.company} We specialize in smart mobility solutions for Rwanda's growing transportation needs. 🚗✨`
            setSuggestions(["What services do you offer?", "Who leads the company?", "How can I contact you?"])
          }
          else if ((q.includes("who") && (q.includes("leader") || q.includes("ceo") || q.includes("director"))) || q.includes("leadership") || q.includes("management")) {
            reply = `Our leadership team includes:\n• ${CARCONNECT_INFO.leaders.md}\n• ${CARCONNECT_INFO.leaders.ceo}\n\nThey're driving innovation in Rwandan mobility! 💪`
            setSuggestions(["What is CarConnect?", "Contact the leaders", "Company services"])
          }
          // Services
          else if (q.includes("service") || q.includes("what do you") || q.includes("offer") || q.includes("what can you do")) {
            reply = `We offer three main services:\n\n${CARCONNECT_INFO.services.map(s => `• ${s}`).join('\n')}\n\nWhich service interests you most? 🤔`
            setSuggestions(["Mobility App details", "Delivery & Tracking", "Enterprise Solutions"])
          }
          else if (q.includes("mobility app") || q.includes("app")) {
            reply = "Our Mobility App is a comprehensive platform for secure package delivery, real-time tracking, and vehicle management. It connects drivers, senders, and recipients seamlessly! 📱🚚"
            setSuggestions(["When will it launch?", "How does it work?", "App features"])
          }
          else if (q.includes("delivery") || q.includes("tracking") || q.includes("package")) {
            reply = "Our Delivery & Tracking service provides end-to-end transparency with real-time GPS tracking, automated notifications, and proof of delivery. Your packages are always safe! 📦📍"
            setSuggestions(["Delivery pricing", "Coverage areas", "How to send"])
          }
          else if (q.includes("enterprise") || q.includes("business") || q.includes("fleet") || q.includes("company")) {
            reply = "Our Enterprise Solutions include fleet management dashboards, advanced analytics, and custom digital tools for transportation businesses. Perfect for scaling operations! 🏢📊"
            setSuggestions(["Business pricing", "Case studies", "Get a demo"])
          }
          // Contact information
          else if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("whatsapp") || q.includes("reach")) {
            reply = `You can reach us through:\n• Email: ${CARCONNECT_INFO.contact.email}\n• WhatsApp: ${CARCONNECT_INFO.contact.whatsapp}\n• Location: ${CARCONNECT_INFO.contact.location}\n\nWe're always happy to help! 📞`
          }
          else if (q.includes("location") || q.includes("where") || q.includes("address") || q.includes("office")) {
            reply = `We're located in ${CARCONNECT_INFO.contact.location}. Feel free to visit us or contact us online! 🗺️`
          }
          // Web search assistance
          else if (q.includes("search") || q.includes("find") || q.includes("look up") || q.includes("google") || q.includes("web")) {
            const searchTerm = text.replace(/search|find|look up|google|web/gi, "").trim()
            if (searchTerm) {
              reply = `I can help you search for "${searchTerm}"! 🔍 Click here to search on Google: https://www.google.com/search?q=${encodeURIComponent(searchTerm)}\n\nOr let me know what specific information you're looking for about CarConnect.`
            } else {
              reply = "What would you like me to help you search for? 🔍 I can suggest Google searches or provide information about CarConnect services."
            }
          }
          else if (q.includes("help") || q.includes("assist") || q.includes("support")) {
            reply = "I'm here to help! I can answer questions about CarConnect, our services, provide contact information, or assist with general inquiries. What would you like to know? 🤝"
          }
          // Complex questions - offer email support
          else if (q.includes("partnership") || q.includes("investment") || q.includes("technical") || q.includes("api") || q.includes("integration") || q.length > 100 || q.includes("business opportunity")) {
            reply = "That sounds like a detailed inquiry! For complex questions about partnerships, technical details, or business opportunities, could you please provide your email address? I'll forward your question directly to our team. 📧"
            // In a real implementation, you'd collect email and send
          }
          // Default response - more helpful
          else {
            const defaultReplies = [
              "I'm not sure I understand that perfectly. Could you rephrase your question? I can help with CarConnect services, contact info, or general inquiries! 😊",
              "Hmm, let me think about that. For detailed inquiries about our services, partnerships, or technical questions, please contact our team at carconnectltd.rw@gmail.com or WhatsApp us at +250 780 114 522. We're here to help! 💪",
              "I want to make sure I give you the best answer! If this is about CarConnect, try asking about our services, leaders, or contact info. Otherwise, feel free to provide more details! 🤔"
            ]
            reply = defaultReplies[Math.floor(Math.random() * defaultReplies.length)]
          }
        }
      }

      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: reply, suggestions: suggestions || [] }])
      setSuggestions([]) // Clear suggestions after sending
      setIsSending(false)
    }, responseDelay)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const fileName = e.target.files[0].name
      handleSendMessage(`[Uploaded File: ${fileName}] I've received your file. Our team will review it and get back to you soon! 📎`)
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
          isOpen && !isMinimized ? "scale-100 opacity-100 animate-in fade-in slide-in-from-bottom-4" : "scale-0 opacity-0 pointer-events-none translate-y-20",
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
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Quick Questions</p>
                {FAQS.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(faq.q)}
                    className="text-left p-3 rounded-2xl bg-white border border-slate-100 text-xs text-brand-green font-medium hover:bg-slate-50 transition-all hover:scale-105 animate-in fade-in slide-in-from-left-2"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {faq.q}
                  </button>
                ))}
                <button
                  onClick={() => window.open("https://wa.me/250780114522?text=Hello CarConnect Ltd, I have a question about your services.", "_blank")}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 text-xs text-[#25D366] font-bold hover:bg-[#25D366]/20 transition-all hover:scale-105 animate-in fade-in slide-in-from-right-2"
                >
                  Ask on WhatsApp 💬
                </button>
              </div>
            </div>
          )}

          {showEmailForm && (
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 animate-in fade-in slide-in-from-bottom-2">
              <p className="text-sm font-bold text-slate-800 mb-3">📧 Please provide your email address</p>
              <p className="text-xs text-slate-600 mb-4">We'll forward your question to our specialized team and get back to you within 24 hours.</p>
              <div className="space-y-3">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleEmailSubmit}
                    disabled={!emailInput.trim()}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-xl"
                  >
                    Send Question 📤
                  </Button>
                  <Button
                    onClick={() => setShowEmailForm(false)}
                    variant="outline"
                    className="px-4 py-2 text-sm rounded-xl"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {showRating && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl border border-yellow-200 animate-in fade-in slide-in-from-bottom-2">
              <p className="text-sm font-bold text-slate-800 mb-3">How was our service? 🌟</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className="text-2xl hover:scale-125 transition-transform"
                  >
                    {star <= rating ? "⭐" : "☆"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, index) => (
            <div key={m.id}>
              <div
                className={cn(
                  "p-4 rounded-2xl text-sm shadow-sm animate-in fade-in slide-in-from-bottom-2 hover:scale-105 transition-transform duration-200",
                  m.role === "user"
                    ? "w-fit bg-[#30a648] text-white ml-auto rounded-tr-none animate-pulse"
                    : "max-w-[80%] bg-white text-slate-900 border border-slate-100 rounded-tl-none",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {m.content.split('\n').map((line: string, i: number) => (
                  <div key={i} className={i > 0 ? "mt-2" : ""}>{line}</div>
                ))}
              </div>
              {m.suggestions && m.suggestions.length > 0 && m.role === "assistant" && (
                <div className="flex flex-wrap gap-2 mt-2 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                  {m.suggestions.slice(0, 3).map((suggestion: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full transition-colors hover:scale-105"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isTyping && (
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
          className="p-4 border-t border-slate-100 flex gap-2 bg-white items-center relative"
        >
          {showConfirmation && (
            <div className="absolute -top-12 left-4 right-4 bg-green-50 text-green-700 text-[10px] py-2 px-3 rounded-xl border border-green-100 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
              <CheckCircle2 size={12} /> Message confirmed to carconnectltd.rw@gmail.com
            </div>
          )}
          <label className="cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileUpload} />
            <div className="p-2 text-slate-400 hover:text-[#30a648] transition-colors hover:scale-110">
              <Paperclip size={20} />
            </div>
          </label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about CarConnect... 😊"
            className="flex-1 bg-slate-50 border-none rounded-2xl px-4 h-12 text-sm focus:ring-2 focus:ring-[#30a648] outline-none transition-all"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isSending}
            className="bg-[#30a648] hover:bg-[#30a648]/90 rounded-2xl h-12 w-12 shrink-0 disabled:opacity-50 transition-all hover:scale-105"
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </>
  )
}
