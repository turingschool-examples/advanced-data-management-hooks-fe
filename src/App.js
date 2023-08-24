import  { useState, useEffect } from 'react';
import Ideas from './Ideas';
import Form from './From'

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
    setIdeas([...ideas, newIdea])
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
    const filteredIdea = ideas.filter(idea => idea.id !== id)
    setIdeas(filteredIdea)
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
