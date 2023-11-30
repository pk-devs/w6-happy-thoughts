import { useEffect } from "react"
import { useState } from "react"
import { format } from "date-fns"
// import { formatRelative } from "date-fns"

export const DisplayHappyThought = () => {
  
  const apiUrl = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts"

  const [displayAllThoughts, setDisplayAllThoughts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if(!response.ok) {
          throw new Error("No connection")
        }
        return response.json()
      })
      .then(data => {
        setDisplayAllThoughts(data)
        setIsLoading(false) 
        console.log(data)  
      })
      .catch(error => {
        console.error("Error:", error)
      })
  },[])

  const updateHearts = (id) => {
    fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${id}/like`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
    .then(response => {
      if(!response.ok) {
        throw new Error("No connection")
      }
      return response.json()
    })
    .then(updatedThought => {
      const updatedThoughts = displayAllThoughts.map((thought) => {
        if(thought._id === updatedThought._id) {
          return {...thought, hearts: updatedThought.hearts}
        }
        return thought
      })
      setDisplayAllThoughts(updatedThoughts)
   })
    .catch(error => console.error("Error:", error))
  }

  return (
    <div className="parent-display">
        {isLoading ? <p>Loading...</p> : displayAllThoughts.map((thought) => (
          <div className="individual-happy-thought" key={thought._id}>
            <p>{thought.message}</p>
            <div className="parent-heart-time">
              <div className="heart-date">
                <button onClick={() => updateHearts(thought._id)}>❤️</button>
                <p>x {thought.hearts}</p>
              </div>
              
              {/* <div>{formatRelative(thought.createdAt, new Date())}</div> */}
              <div>{format(new Date(thought.createdAt), 'yyyy-MM-dd, HH:mm')}</div>
            </div>
          </div>
        ))}
    </div>
  )
}
