import React from 'react';

type LoadingScreenProps = {
  progress?: {
    loaded: number;
    total: number;
  };
};

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  const percentage = progress ? Math.round((progress.loaded / (progress.total || 1)) * 100) : 0;
  // Assume numbers greater than 10000 indicate byte-based progress
  const isByteProgress = progress ? progress.total > 10000 : false;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        gap: '20px',
        zIndex: 1000
      }}
      className="dark:bg-opacity-90 dark:bg-black"
    >
      {/* <div 
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
        className="dark:border-gray-600 dark:border-t-blue-500"
      /> */}
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          color: '#333',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          textAlign: 'center'
        }}
        className="dark:text-gray-200"
      >
        <span>Loading Population Data</span>
        <div
          style={{
            width: '200px',
            height: '4px',
            background: 'rgba(52, 152, 219, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
            margin: '8px 0'
          }}
          className="dark:bg-blue-900/20"
        >
          {progress && (
            <div
              style={{
                width: `${percentage}%`,
                height: '100%',
                background: '#3498db',
                transition: 'width 0.1s ease'
              }}
              className="dark:bg-blue-500"
            />
          )}
        </div>
        <span 
          style={{
            fontSize: '14px',
            color: '#666',
            fontStyle: 'italic'
          }}
          className="dark:text-gray-400"
        >
          {progress ? `${percentage}% complete` : 'Please wait...'}
        </span>
        <div
          style={{
            marginTop: '20px',
            padding: '15px 25px',
            background: 'rgba(52, 152, 219, 0.1)',
            borderRadius: '12px',
            maxWidth: '300px',
            border: '1px solid rgba(52, 152, 219, 0.2)'
          }}
          className="dark:bg-blue-900/20 dark:border-blue-800/30"
        >
          <span 
            style={{
              fontSize: '14px',
              color: '#2980b9',
              fontWeight: 600,
              display: 'block',
              marginBottom: '4px'
            }}
            className="dark:text-blue-400"
          >
            Did you know?
          </span>
          <span
            style={{
              fontSize: '13px',
              color: '#444',
              lineHeight: '1.5'
            }}
            className="dark:text-gray-300"
          >
            Kerala packs in over 860 people per square kilometer—more than double India's average!
          </span>
        </div>
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
