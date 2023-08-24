import  { useState, useEffect } from 'react';
import Ideas from './Ideas';
import Form from './Form'

import './App.css';

function App(){
  const dummyIdeas = [
        { id: 101, title: 'Prank Travis', description: 'Stick googly eyes on all his stuff' },
        { id: 102, title: 'Make a secret password app', description: 'So you and your rideshare driver can both know neither one of you is lying' },
        { id: 103, title: 'Learn a martial art', description: 'To exact vengeance upon my enemies' },
    ]
  const [ideas, setIdeas] = useState(dummyIdeas)
  const [error, setError] = useState('')

  function addIdea(newIdea) {
    fetch('http://localhost:3001/api/v1/ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: newIdea.id,
        title: newIdea.title,
        description: newIdea.description
      }), 
    })
    .then(response => response.json())
    .then(data => setIdeas([...ideas, data]))
    .catch(error => setError(error.message)) 
  }

  function getIdeas() {
    fetch('http://localhost:3001/api/v1/ideas')
    .then(response => response.json())
    .then(data => setIdeas([...ideas, ...data]))
    .catch(error => setError(error.message))
  }

  useEffect(() => {
    getIdeas();
  }, [])

  function deleteIdea(id){
    fetch(`http://localhost:3001/api/v1/ideas/${id}`, { method: 'DELETE' })
    .then(response => {
      const filteredIdea = ideas.filter(idea => idea.id !== id)
      setIdeas(filteredIdea)
    })
    .catch(error => setError(error.message))
  }
  return(
    <main className='App'>
        <h1>IdeaBox</h1>
        <Form addIdea={addIdea}/>
        {error && <h2>{error}</h2>}
        <Ideas ideas={ideas} deleteIdea={deleteIdea}/>
    </main>
  )
}

export default App;
