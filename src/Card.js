
function Card({ title, description, id, deleteIdea }){
  console.log(deleteIdea)
    return (
      <div className='card'>
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={() => deleteIdea(id)}>🗑</button>
      </div>
    )
  }
  export default Card;
