import './dashboardPage.css'

const DashboardPage  = () => {

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const text = e.target.text.value
        if(!text) return

        await fetch("http://localhost:3000/api/chats", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({text})

        });

    };
    return(
        <div className='dashboardPage'>
            <div className="texts">
                <div className="logo">
                    <img src="/logo1.png" alt="" />
                    <h1>SmartTalk-AI</h1>
                </div>
                <div className="options">
                    <div className="option">
                        <img src="chat.png" alt="" />
                        <span>Start a new Chat</span>
                    </div>
                    <div className="option">
                        <img src="image.jpg" alt="" />
                        <span>Analyze Documents & Images</span>
                    </div>
                    <div className="option">
                        <img src="code.png" alt="" />
                        <span>Help me with my code</span>
                    </div>
                </div>
            </div>
            <div className="formContainer">
                <form onSubmit={handleSubmit} >
                <input type="text" name ="text" placeholder='Ask me anything...' />
                <button>
                    <img src="arrow.png" alt="" />
                </button>
                
                </form></div>
        </div>
    )
}

export default  DashboardPage