import  { useState, useEffect } from 'react';
import Ideas from './Ideas';
import Form from './Form'

import './App.css';

function App(){
  const [ideas, setIdeas] = useState([])
  const [error, setError] = useState('')

  function getIdeas() {
    fetch('http://localhost:3001/api/v1/ideas')
    .then(response => response.json())
    .then(data => setIdeas([...ideas, ...data]))
    .catch(error => setError(error.message))
  }

  useEffect(() => {
    getIdeas();
  }, [])

  function addIdea(newIdea) {
    fetch('http://localhost:3001/api/v1/ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIdea), 
    })
    .then(response => response.json())
    .then(data => setIdeas([...ideas, data]))
    .catch(error => setError(error.message)) 
  }


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
