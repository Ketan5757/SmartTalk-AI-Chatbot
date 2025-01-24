import { Link } from 'react-router-dom';
import './homepage.css'

const Homepage  = () => {
    return(
        <div className='homepage'>
            <img src="/orbital.png" alt="" className="orbital"/>
            <div className="left">
                <h1>SmartTalk-AI</h1>
                <h2>Transform the Way You Work and Think</h2>
                <h3>Your gateway to smarter ideas, faster solutions, and limitless creativity—all powered by SmartTalk, the most powerful AI for your needs</h3>
                <Link to= "/dashboard">Get Started</Link>
            </div>
            <div className="right">
                <div className="imgContainer">
                    <div className="bgContainer">
                        <div className="bg"></div>
                    </div>
                    <img src="/chatbots.png" alt="" className="bot" />
                </div>
            </div>


        </div>
              
    )
}

export default  Homepage;