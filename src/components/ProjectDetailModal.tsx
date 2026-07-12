import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: any;
  readme: string;
}

export function ProjectDetailModal({ isOpen, onClose, metadata, readme }: ProjectDetailModalProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-text-primary/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 pointer-events-none z-[101] flex items-end md:items-center justify-center sm:p-4">
            <motion.div
              initial={{ y: "100%", opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring" as any, damping: 25, stiffness: 300 }}
              className="w-full md:w-[800px] max-h-[90vh] md:max-h-[85vh] bg-surface md:rounded-[24px] rounded-t-[24px] pointer-events-auto flex flex-col shadow-2xl relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-[24px] border-b border-border-primary">
                <div>
                  <h3 className="text-[1.5rem] font-bold text-text-primary leading-tight">
                    {metadata?.title}
                  </h3>
                  <div className="flex gap-2 mt-2">
                    {metadata?.technologies?.map((tech: string, i: number) => (
                      <span key={i} className="text-[0.75rem] bg-background-secondary text-text-secondary border border-border-primary px-2 py-1 rounded-md font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-background-secondary text-text-secondary flex items-center justify-center hover:bg-border-primary hover:text-text-primary transition-colors shrink-0"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {/* Content */}
              <div className="p-[24px] overflow-y-auto custom-scrollbar">
                <div className="prose max-w-none prose-headings:font-bold prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-primary prose-strong:text-text-primary prose-ul:text-text-secondary prose-ol:text-text-secondary prose-li:text-text-secondary prose-img:rounded-xl prose-code:text-text-primary prose-pre:bg-background-secondary prose-pre:text-text-secondary prose-blockquote:text-text-secondary prose-blockquote:border-border-primary">
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {readme || "*No README available for this project.*"}
                  </Markdown>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
