import React from 'react';
import { Tooltip } from 'react-bootstrap';

const getIconTooltip = (tooltipText) => {
  const IconTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipText}
    </Tooltip>
  );
  return IconTooltip;
};
export default getIconTooltip;
