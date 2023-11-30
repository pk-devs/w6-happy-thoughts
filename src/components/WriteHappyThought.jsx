import { useState } from "react"

export const WriteHappyThought = () => {
    const [happyThought, setHappyThought] = useState("")

    const handleHappyThought = (event) => {
        setHappyThought(event.target.value)
    }

  

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ message: happyThought })
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("No connection")
            }
            return response.json()
        })
        .then(() => {
            alert("Your good vibe was sent")
            setHappyThought("")
        })
        .catch(error => console.error("Error:", error))
    }
   
    return (
    <div className="write-happy-t">
        <h2>What is making you happy right now?</h2>
        
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="writeHappyThought" 
            id="writeHappyThought" 
            placeholder="'Spread the good vibes!'"
            minLength="5"
            maxLength="140"
            value={happyThought}
            onChange={handleHappyThought} 
            />
            <span className="char" id="charCount">{`${happyThought.length}/140`}</span>

            <button type="submit">
                <span className="emoji" aria-label="heart emoji">❤️</span>Send Happy Thought and Good Vibe!<span className="emoji" aria-label="heart emoji">❤️</span>
            </button>
        </form>
    </div>
  )
}
