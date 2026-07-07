'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { demoSection } from '@isaak/content';
import { ChatBubble } from '@/components/ui/ChatBubble';
import { IsaakButton } from '@/components/ui/IsaakButton';
import { IsaakCharacter, type IsaakCharacterState } from '@/components/hero/IsaakCharacter';
import { ActionPreparedPanel } from './ActionPreparedPanel';

type DemoChatContent = {
  prompt: string;
  answerIntro: string;
  answerItems: { label: string; detail: string }[];
  answerClosing: string;
  actionButton: string;
};

type ActionData = {
  dataUsed?: string[];
  source?: string;
  nextStep?: string;
};

type IsaakDemoChatProps = {
  content?: DemoChatContent;
  actionData?: ActionData;
};

export function IsaakDemoChat({ content = demoSection, actionData }: IsaakDemoChatProps) {
  const [showAction, setShowAction] = useState(false);
  const [characterState, setCharacterState] = useState<IsaakCharacterState>('listening');

  useEffect(() => {
    const toPreparing = setTimeout(() => setCharacterState('preparing'), 350);
    const toIdle = setTimeout(
      () => setCharacterState('idle'),
      350 + content.answerItems.length * 150 + 700,
    );
    return () => {
      clearTimeout(toPreparing);
      clearTimeout(toIdle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-4 rounded-3xl border border-camel/30 bg-cream/70 p-6 shadow-glass sm:p-8">
        <div className="flex justify-center">
          <IsaakCharacter size={84} state={showAction ? 'connecting' : characterState} />
        </div>

        <ChatBubble role="user">{content.prompt}</ChatBubble>

        <div className="space-y-2 rounded-2xl rounded-bl-sm border border-camel/30 bg-cream px-5 py-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-medium text-chocolate"
          >
            {content.answerIntro}
          </motion.p>
          <ol className="space-y-1.5 pl-1">
            {content.answerItems.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + index * 0.15 }}
                className="text-sm text-chocolate/85"
              >
                <span className="font-semibold text-copper">{item.label}:</span> {item.detail}
              </motion.li>
            ))}
          </ol>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + content.answerItems.length * 0.15 + 0.2 }}
            className="pt-1 text-sm italic text-chocolate/60"
          >
            {content.answerClosing}
          </motion.p>
        </div>

        <div className="flex justify-center pt-1">
          <IsaakButton onClick={() => setShowAction((v) => !v)} variant="secondary">
            {content.actionButton}
          </IsaakButton>
        </div>
      </div>

      <AnimatePresence>
        {showAction && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <ActionPreparedPanel {...actionData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
