import './dashboardPage.css'

const DashboardPage  = () => {
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
            <div className="formContainer"><form >
                <input type="text" placeholder='Ask me anything...' />
                <button>
                    <img src="arrow.png" alt="" />
                </button>
                
                </form></div>
        </div>
    )
}

export default  DashboardPage