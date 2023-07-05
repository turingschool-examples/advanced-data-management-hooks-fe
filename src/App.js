import  { useState } from 'react';
import Ideas from './Ideas';
import Form from './From'

import './App.css';

function App(){
  const dummyIdeas = [
        { id: 1, title: 'Prank Travis', description: 'Stick googly eyes on all his stuff' },
        { id: 2, title: 'Make a secret password app', description: 'So you and your rideshare driver can both know neither one of you is lying' },
        { id: 3, title: 'Learn a martial art', description: 'To exact vengeance upon my enemies' },
    ]
  const [ideas, setIdeas] = useState(dummyIdeas)

  function addIdea (newIdea) {
    setIdeas([...ideas, newIdea])
  }

  function deleteIdea(id){
    const filteredIdea = ideas.filter(idea => idea.id !== id)
    setIdeas(filteredIdea)
  }
  return(
    <main className='App'>
        <h1>IdeaBox</h1>
        <Form addIdea={addIdea}/>
        <Ideas ideas={ideas} deleteIdea={deleteIdea}/>
    </main>
  )
}

export default App;
