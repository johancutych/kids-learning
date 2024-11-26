import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const colors = ['#000000', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6'];

const LetterLearningApp = () => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [touchStart, setTouchStart] = useState<null | number>(null);
  const [touchEnd, setTouchEnd] = useState<null | number>(null);
  const letterScrollRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentLetterIndex < alphabet.length - 1) {
      setCurrentLetterIndex(prev => prev + 1);
    }
    if (isRightSwipe && currentLetterIndex > 0) {
      setCurrentLetterIndex(prev => prev - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const nextLetter = () => {
    if (currentLetterIndex < alphabet.length - 1) {
      setCurrentLetterIndex(prev => prev + 1);
    }
  };

  const previousLetter = () => {
    if (currentLetterIndex > 0) {
      setCurrentLetterIndex(prev => prev - 1);
    }
  };

  const scrollLetters = (direction: number) => {
    if (letterScrollRef.current) {
      const scrollAmount = 200;
      letterScrollRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  React.useEffect(() => {
    if (letterScrollRef.current) {
      const selectedButton = letterScrollRef.current.children[currentLetterIndex];
      selectedButton?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentLetterIndex]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Main letter container */}
      <div 
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          height: '80vh',
          minHeight: '500px',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button 
          onClick={previousLetter}
          disabled={currentLetterIndex === 0}
          style={{
            position: 'absolute',
            left: '2rem',
            padding: '0.5rem',
            opacity: currentLetterIndex === 0 ? 0.3 : 1,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <ChevronLeft size={48} />
        </button>
        
        <div style={{
          textAlign: 'center',
          maxHeight: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 4rem',
        }}>
          <h1 
            style={{ 
              color: selectedColor,
              fontSize: 'min(80vw, 80vh)',
              fontWeight: 'bold',
              transition: 'color 0.3s',
              userSelect: 'none',
              lineHeight: 1,
              margin: 0,
            }}
          >
            {alphabet[currentLetterIndex]}
          </h1>
        </div>

        <button 
          onClick={nextLetter}
          disabled={currentLetterIndex === alphabet.length - 1}
          style={{
            position: 'absolute',
            right: '2rem',
            padding: '0.5rem',
            opacity: currentLetterIndex === alphabet.length - 1 ? 0.3 : 1,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <ChevronRight size={48} />
        </button>
      </div>

      {/* Controls section */}
      <div style={{
        width: '100%',
        backgroundColor: 'white',
        padding: '1rem',
        boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          {/* Color selection */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1rem',
          }}>
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  backgroundColor: color,
                  border: color === '#000000' ? '2px solid #e5e5e5' : 'none',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>

          {/* Letter selection */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {/* Left arrow */}
            <button 
              onClick={() => scrollLetters(-1)}
              style={{
                display: window.innerWidth > 640 ? 'block' : 'none',
                position: 'absolute',
                left: 0,
                zIndex: 10,
                padding: '0.5rem',
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <div 
              ref={letterScrollRef}
              style={{
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                margin: '0 auto',
                width: '100%',
              }}
            >
              <div style={{
                display: 'flex',
                gap: '0.25rem',
                paddingBottom: '0.5rem',
                minWidth: 'min-content',
                scrollBehavior: 'smooth',
              }}>
                {alphabet.map((letter, index) => (
                  <button
                    key={letter}
                    onClick={() => setCurrentLetterIndex(index)}
                    style={{
                      flexShrink: 0,
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      border: 'none',
                      backgroundColor: currentLetterIndex === index ? '#3b82f6' : 'white',
                      color: currentLetterIndex === index ? 'white' : '#374151',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Right arrow */}
            <button 
              onClick={() => scrollLetters(1)}
              style={{
                display: window.innerWidth > 640 ? 'block' : 'none',
                position: 'absolute',
                right: 0,
                zIndex: 10,
                padding: '0.5rem',
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterLearningApp;
