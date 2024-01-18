import { Typography } from 'antd';
import { useState } from 'react';

const ExpandableText = ({ text }: { text: string }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const handleExpand = () => setExpand(true);
  const handleCollapse = () => setExpand(false);

  if (expand) {
    return (
      <Typography.Paragraph className="cursor-pointer text-left" onClick={handleCollapse}>
        {text}
      </Typography.Paragraph>
    );
  } else {
    return (
      <Typography.Paragraph
        className="cursor-pointer text-left"
        onClick={handleExpand}
        ellipsis={{
          rows: 2,
          expandable: false,
          tooltip: 'click to expand',
        }}
      >
        {text}
      </Typography.Paragraph>
    );
  }
};

export default ExpandableText;
