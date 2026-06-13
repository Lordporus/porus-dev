import { useState } from 'react';

function generateHash(): string {
  const chars = 'abcdef0123456789';
  let hash = '';
  for (let i = 0; i < 7; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

export default function Footer() {
  const [buildHash] = useState(generateHash);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bg-border py-8 px-6">
      <div className="max-w-7xl mx-auto text-center space-y-1">
        <p className="font-code text-sm text-text-muted">
          {' > built_by_porus © '}{year}
        </p>
        <p className="font-code text-xs text-text-muted/50">
          {' > powered by: react + framer-motion + caffeine'}
        </p>
        <p className="font-code text-[10px] text-text-muted/30">
          deploy@{buildHash}
        </p>
      </div>
    </footer>
  );
}