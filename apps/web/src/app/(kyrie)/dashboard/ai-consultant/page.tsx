"use client";

import { useState } from "react";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { api } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "agent";
  content: string;
}

export default function AIConsultantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content: "Olá! Sou o seu **Analista Sênior**. Posso gerar relatórios executivos sobre seus projetos e métricas. Qual tópico você gostaria de abordar hoje?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (topic: string) => {
    if (!topic.trim()) return;

    // 1. Add User Message
    const userMsg: Message = { role: "user", content: topic };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // 2. Call API
      const data = await api.generateReport(topic);
      
      // 3. Add Agent Response
      const agentMsg: Message = { role: "agent", content: data.report };
      setMessages((prev) => [...prev, agentMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = { 
        role: "agent", 
        content: "❌ Desculpe, encontrei um erro ao processar sua solicitação. Por favor, tente novamente." 
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-zinc-950 text-white overflow-hidden">
      
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="p-2 bg-purple-500/10 rounded-lg ring-1 ring-purple-500/20">
          <Bot className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Consultor IA</h1>
          <p className="text-xs text-gray-400">Analista Sênior • Gemini 1.5 Flash</p>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex w-full gap-4 max-w-3xl mx-auto",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              
              {/* Avatar (Agent) */}
              {msg.role === "agent" && (
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-purple-400" />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={cn(
                  "relative px-5 py-3.5 rounded-2xl max-w-[85%] text-sm sm:text-base shadow-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-white/5 border border-white/5 text-gray-100 rounded-bl-none"
                )}
              >
                {msg.role === "agent" ? (
                  <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>

              {/* Avatar (User) */}
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex w-full gap-4 max-w-3xl mx-auto justify-start"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/10  flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
            <div className="px-5 py-3.5 rounded-2xl bg-white/5 border border-white/5 text-gray-400 text-sm italic flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
        <PromptInputBox 
          onSend={(message: string) => handleSendMessage(message)} 
          isLoading={isLoading} 
          placeholder="Ex: Gere um relatório de progresso do projeto Loja Virtual..."
        />
      </div>
    </div>
  );
}
