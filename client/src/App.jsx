import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import IdeaForm from './components/IdeaForm';
import IdeaCard from './components/IdeaCard';
import * as api from './services/api';

const App = () => {
  const [ideas, setIdeas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(() => {
    // Check local storage for theme preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    // Fallback to system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [editingIdea, setEditingIdea] = useState(null);

  useEffect(() => {
    // Fetch ideas on mount
    fetchIdeas();
  }, []);

  useEffect(() => {
    // Apply theme to document body
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const fetchIdeas = async () => {
    try {
      const data = await api.getIdeas();
      // Sort by newest first based on timestamp
      data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setIdeas(data);
    } catch (error) {
      console.error('Error fetching ideas:', error);
      // Fallback dummy data could be loaded here if backend fails
    }
  };

  const handleAddOrUpdateIdea = async (ideaData) => {
    try {
      if (editingIdea) {
        // Update
        const updated = await api.updateIdea(editingIdea.id, ideaData);
        setIdeas(ideas.map(i => (i.id === updated.id ? updated : i)));
        setEditingIdea(null);
      } else {
        // Create
        const created = await api.createIdea(ideaData);
        setIdeas([created, ...ideas]);
      }
    } catch (error) {
      console.error('Error saving idea:', error);
    }
  };

  const handleDeleteIdea = async (id) => {
    if (!window.confirm('Are you sure you want to delete this idea?')) return;
    try {
      await api.deleteIdea(id);
      setIdeas(ideas.filter(i => i.id !== id));
    } catch (error) {
      console.error('Error deleting idea:', error);
    }
  };

  const handleEditIdea = (idea) => {
    setEditingIdea(idea);
    // Scroll to top where form is
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const filteredIdeas = ideas.filter(idea =>
    idea.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="main-content">
        <IdeaForm 
          onSubmit={handleAddOrUpdateIdea} 
          defaultIdea={editingIdea} 
          onCancel={() => setEditingIdea(null)}
        />
        
        <div className="ideas-wrapper">
          <div className="ideas-header">
            <h2>Your Ideas {ideas.length > 0 && `(${ideas.length})`}</h2>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          
          {filteredIdeas.length > 0 ? (
            <div className="ideas-grid">
              {filteredIdeas.map(idea => (
                <IdeaCard 
                  key={idea.id} 
                  idea={idea} 
                  onEdit={handleEditIdea}
                  onDelete={handleDeleteIdea}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              {searchQuery ? 'No ideas match your search.' : 'You have no ideas yet. Add one above!'}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
