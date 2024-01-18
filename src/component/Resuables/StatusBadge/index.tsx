import { Tag } from 'antd';

const StatusBadge = ({ status }: { status: string }) => {
  let color, text;

  switch (status.toLowerCase()) {
    case 'draft':
      color = '#007BFF';
      text = 'Draft';
      break;
    case 'in_progress':
      color = '#FFC107';
      text = 'In Progress';
      break;
    case 'sent':
      color = '#28A745';
      text = 'Sent';
      break;
    case 'archive':
      color = '#6C757D';
      text = 'Archive';
      break;
    case 'partially_paid':
      color = '#2db7f5';
      text = 'Partially Paid';
      break;
    case 'paid':
      color = '#87d068';
      text = 'Paid';
      break;
    default:
      return null;
  }

  return (
    <Tag color={color} className="rounded-full py-1 px-4">
      {text}
    </Tag>
  );
};

export default StatusBadge;
