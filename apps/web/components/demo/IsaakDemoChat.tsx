'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { demoSection } from '@isaak/content';
import { ChatBubble } from '@/components/ui/ChatBubble';
import { IsaakButton } from '@/components/ui/IsaakButton';
import { ActionPreparedPanel } from './ActionPreparedPanel';

export function IsaakDemoChat() {
  const [showAction, setShowAction] = useState(false);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-4 rounded-3xl border border-camel/30 bg-cream/70 p-6 shadow-glass sm:p-8">
        <ChatBubble role="user">{demoSection.prompt}</ChatBubble>

        <div className="space-y-2 rounded-2xl rounded-bl-sm border border-camel/30 bg-cream px-5 py-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-medium text-chocolate"
          >
            {demoSection.answerIntro}
          </motion.p>
          <ol className="space-y-1.5 pl-1">
            {demoSection.answerItems.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + index * 0.15 }}
                className="text-sm text-chocolate/85"
              >
                <span className="font-semibold text-isaak-blue">{item.label}:</span>{' '}
                {item.detail}
              </motion.li>
            ))}
          </ol>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + demoSection.answerItems.length * 0.15 + 0.2 }}
            className="pt-1 text-sm italic text-chocolate/60"
          >
            {demoSection.answerClosing}
          </motion.p>
        </div>

        <div className="flex justify-center pt-1">
          <IsaakButton onClick={() => setShowAction((v) => !v)} variant="secondary">
            {demoSection.actionButton}
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
            <ActionPreparedPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
