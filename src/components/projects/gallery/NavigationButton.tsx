
import { memo } from "react";

interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: (e: React.MouseEvent) => void;
}

const NavigationButton = memo(({ direction, onClick }: NavigationButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`absolute ${direction === 'prev' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg`}
    >
      {direction === 'prev' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      )}
    </button>
  );
});

NavigationButton.displayName = 'NavigationButton';
export default NavigationButton;
