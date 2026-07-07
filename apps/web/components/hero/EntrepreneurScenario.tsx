'use client';

import { motion } from 'framer-motion';
import { hero } from '@isaak/content';
import { ChatBubble } from '@/components/ui/ChatBubble';
import { GlassCard } from '@/components/ui/GlassCard';

export function EntrepreneurScenario() {
  return (
    <GlassCard className="mx-auto w-full max-w-md space-y-3 p-4">
      <ChatBubble role="user">{hero.demoPrompt}</ChatBubble>

      <div className="space-y-1.5 rounded-2xl rounded-bl-sm border border-camel/30 bg-cream px-4 py-3">
        {hero.demoAnswerLines.map((line, index) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.35 }}
            className="text-sm text-chocolate"
          >
            <span className="mr-2 text-isaak-blue">•</span>
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 + hero.demoAnswerLines.length * 0.35 + 0.3 }}
        className="flex justify-center pt-1"
      >
        <span className="rounded-full bg-chocolate px-4 py-1.5 text-xs font-medium tracking-wide text-cream">
          {hero.seal}
        </span>
      </motion.div>
    </GlassCard>
  );
}
