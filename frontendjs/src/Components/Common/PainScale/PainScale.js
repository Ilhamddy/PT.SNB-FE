import React, { useState } from 'react';
import './PainScale.scss'
function PainScale() {
    const [painLevel, setPainLevel] = useState(null);
  
    const handlePainLevelChange = (level) => {
      setPainLevel(level);
    };
  
    return (
      <div>
        <h1>Pain Measurement Scale</h1>
        <p>Select your pain level:</p>
        <div className="pain-buttons">
          <button
            className={painLevel === 1 ? 'selected' : ''}
            onClick={() => handlePainLevelChange(1)}
          >
            1
          </button>
          <button
            className={painLevel === 2 ? 'selected' : ''}
            onClick={() => handlePainLevelChange(2)}
          >
            2
          </button>
          {/* Add more buttons for other pain levels */}
        </div>
        {painLevel && <p>Your pain level is: {painLevel}</p>}
      </div>
    );
  }
  
  export default PainScale;
  
