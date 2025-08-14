"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { handleRagQuery } from "@/app/actions";
import type { RagMessage } from "@/lib/types";
import { Bot, User, Send, Loader2, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function RagChat() {
  const [messages, setMessages] = useState<RagMessage[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: RagMessage = { id: Date.now().toString(), type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    startTransition(async () => {
      const aiResponse = await handleRagQuery(input);
      const aiMessage: RagMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        text: aiResponse.answer,
        sources: aiResponse.sources,
      };
      setMessages((prev) => [...prev, aiMessage]);
    });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to bottom of the scroll area viewport
        const viewport = scrollAreaRef.current.children[0];
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  return (
    <Card className="h-[80vh] md:h-[75vh] flex flex-col">
      <CardHeader>
        <CardTitle>RAG Chat</CardTitle>
        <CardDescription>
          Ask questions about building procedures and specifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-4 pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.type === "user" ? "justify-end" : ""
                }`}
              >
                {message.type === "ai" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-md rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  {message.sources && message.sources.length > 0 && (
                     <div className="mt-2 border-t pt-2">
                        <h4 className="text-xs font-semibold mb-1">Sources:</h4>
                        <ul className="space-y-1">
                            {message.sources.map((source, index) => (
                                <li key={index} className="text-xs flex items-center gap-1.5">
                                    <FileText className="h-3 w-3" />
                                    <span>{source}</span>
                                </li>
                            ))}
                        </ul>
                     </div>
                  )}
                </div>
                {message.type === "user" && (
                   <Avatar className="h-8 w-8">
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isPending && (
                <div className="flex items-start gap-3">
                   <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                  <div className="max-w-md rounded-lg p-3 bg-muted flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., What is the maintenance schedule for HVAC unit 1?"
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
