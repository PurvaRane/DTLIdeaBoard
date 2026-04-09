import React, { useState, useEffect } from 'react';
import { PlusCircle, Save, X } from 'lucide-react';
import '../styles/form.css';

const IdeaForm = ({ onSubmit, defaultIdea, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (defaultIdea) {
      setTitle(defaultIdea.title);
      setDescription(defaultIdea.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [defaultIdea]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onSubmit({ title, description });
    if (!defaultIdea) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        {defaultIdea ? <Save size={20}/> : <PlusCircle size={20} />}
        <span>{defaultIdea ? 'Edit Idea' : 'New Idea'}</span>
      </div>
      <form onSubmit={handleSubmit} className="idea-form">
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Idea Title e.g. Smart Coffee Mug"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-textarea"
            placeholder="Describe your idea in a few sentences..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            maxLength={500}
          />
        </div>
        <div className="form-actions">
          {defaultIdea && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {defaultIdea ? 'Update Idea' : 'Add Idea'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IdeaForm;
