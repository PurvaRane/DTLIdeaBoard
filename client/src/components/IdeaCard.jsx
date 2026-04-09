import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import '../styles/card.css';

const IdeaCard = ({ idea, onEdit, onDelete }) => {
  const formattedDate = new Date(idea.timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="idea-card">
      <div className="card-header">
        <h3 className="card-title">{idea.title}</h3>
        <div className="card-actions">
          <button className="action-btn edit" onClick={() => onEdit(idea)} aria-label="Edit">
            <Edit2 size={16} />
          </button>
          <button className="action-btn delete" onClick={() => onDelete(idea.id)} aria-label="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p className="card-description">{idea.description}</p>
      <div className="card-footer">
        <span>Added {formattedDate}</span>
      </div>
    </div>
  );
};

export default IdeaCard;
