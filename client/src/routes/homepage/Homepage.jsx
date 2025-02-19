import { Link } from 'react-router-dom';
import './homepage.css'
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';

const Homepage = () => {

    const[typingStatus,SetTypingStatus] =useState("Human1");
    
    return (
        <div className='homepage'>
            <img src="/orbital.png" alt="" className="orbital" />
            <div className="left">
                <h1>SmartTalk-AI</h1>
                <h2>Transform the way you Work and Think</h2>
                <h3>Your gateway to smarter ideas, faster solutions, and limitless creativity—all powered by SmartTalk, the most powerful AI for your needs</h3>
                <Link to="/dashboard">Get Started</Link>
            </div>
            <div className="right">
                <div className="imgContainer">
                    <div className="bgContainer">
                        <div className="bg"></div>
                    </div>
                    <img src="/chatbots.png" alt="" className="bot" />
                    <div className="chat">
                        <img src={typingStatus === "Human1" ? "/human01.jpeg" : typingStatus === "Human2" ? "/human02.jpeg" : "bot01.jpeg"} alt="" />
                        <TypeAnimation
                            sequence={[
                                'Human 1: We produce food for Mice',
                                2000, ()=>{
                                    SetTypingStatus("Bot");

                                },
                                'Bot: We produce food for Hamsters',
                                2000,()=>{
                                    SetTypingStatus("Human2");

                                },
                                'Human 2: We produce food for Guinea Pigs',
                                2000,()=>{
                                    SetTypingStatus("Bot");

                                },
                                'Bot : We produce food for Chinchillas',
                                2000,()=>{
                                    SetTypingStatus("Human1");

                                },
                            ]}
                            wrapper="span"
                            repeat={Infinity}
                            cursor={true}
                            omitDeletionAnimation={true}
                        />
                    </div>
                </div>
            </div>
            <div className="terms">
                <img src="/logo1.png" alt="" />
                <div className="links">
                    <Link to ="">Terms of Services</Link>
                    <span>|</span>
                    <Link to ="">Privacy Policy</Link>
                    
                </div>
            </div>


        </div>

    )
}

export default Homepage;