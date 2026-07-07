import { type ReactNode } from 'react';

type ChatBubbleProps = {
  role: 'user' | 'isaak';
  children: ReactNode;
};

export function ChatBubble({ role, children }: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:text-[15px] ${
          isUser
            ? 'rounded-br-sm bg-isaak-blue text-cream'
            : 'rounded-bl-sm border border-camel/30 bg-cream text-chocolate'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
