import { useState } from 'react';

function CollapseButton() {
  const [isCollapsed, setIsCollapsed] = useState(true); // State to track collapse status

  // Toggle the collapse state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      {/* Collapse button */}
      <button onClick={toggleCollapse}>
        {isCollapsed ? 'Show More' : 'Show Less'}
      </button>

      {/* Collapsible content */}
      <div style={{ display: isCollapsed ? 'none' : 'block' }}>
        <p>This is some content that can be shown or hidden when the button is clicked.</p>
      </div>
    </div>
  );
}

export default CollapseButton;
