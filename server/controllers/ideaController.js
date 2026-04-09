import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/ideas.json');

// Helper function to read ideas
const readIdeas = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
};

// Helper function to write ideas
const writeIdeas = (ideas) => {
  fs.writeFileSync(dataPath, JSON.stringify(ideas, null, 2), 'utf8');
};

// @desc    Get all ideas
// @route   GET /api/ideas
export const getIdeas = (req, res) => {
  try {
    const ideas = readIdeas();
    res.status(200).json(ideas);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ideas' });
  }
};

// @desc    Create an idea
// @route   POST /api/ideas
export const createIdea = (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    
    const ideas = readIdeas();
    const newIdea = {
      id: Date.now().toString(),
      title,
      description,
      timestamp: new Date().toISOString()
    };
    
    ideas.push(newIdea);
    writeIdeas(ideas);
    
    res.status(201).json(newIdea);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create idea' });
  }
};

// @desc    Update an idea
// @route   PUT /api/ideas/:id
export const updateIdea = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    const ideas = readIdeas();
    const ideaIndex = ideas.findIndex(idea => idea.id === id);
    
    if (ideaIndex === -1) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    
    ideas[ideaIndex] = {
      ...ideas[ideaIndex],
      title: title || ideas[ideaIndex].title,
      description: description || ideas[ideaIndex].description,
    };
    
    writeIdeas(ideas);
    
    res.status(200).json(ideas[ideaIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update idea' });
  }
};

// @desc    Delete an idea
// @route   DELETE /api/ideas/:id
export const deleteIdea = (req, res) => {
  try {
    const { id } = req.params;
    
    const ideas = readIdeas();
    const filteredIdeas = ideas.filter(idea => idea.id !== id);
    
    if (ideas.length === filteredIdeas.length) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    
    writeIdeas(filteredIdeas);
    
    res.status(200).json({ message: 'Idea deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete idea' });
  }
};
