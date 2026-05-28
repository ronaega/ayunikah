"use client";

import { useEffect } from 'react';

const BADGE_TEXT = 'edit with base 44';

export const Base44BadgeRemover = () => {
  useEffect(() => {
    const removeBadge = () => {
      const candidates = Array.from(document.querySelectorAll('a, button, div, iframe'));

      candidates.forEach((element) => {
        const text = element.textContent?.trim().toLowerCase() ?? '';
        const src = element.getAttribute('src')?.toLowerCase() ?? '';
        const href = element.getAttribute('href')?.toLowerCase() ?? '';
        const label = element.getAttribute('aria-label')?.toLowerCase() ?? '';

        if (
          text.includes(BADGE_TEXT) ||
          src.includes('base44') ||
          href.includes('base44') ||
          label.includes(BADGE_TEXT)
        ) {
          element.remove();
        }
      });
    };

    removeBadge();
    const observer = new MutationObserver(removeBadge);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default Base44BadgeRemover;
