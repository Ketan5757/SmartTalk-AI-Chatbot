import './chatPage.css'
import NewPrompt from '../../components/newPrompt/NewPrompt';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';

const ChatPage  = () => {

    const path = useLocation().pathname
    const chatId = path.split("/").pop()

    const { isPending, error, data } = useQuery({
        queryKey: ["chat",chatId],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
            credentials:"include"
          }).then((res) =>
            res.json(),
          ),
      });

      console.log(data)


    return(
        <div className='chatPage'>
            <div className="wrapper">
                <div className="chat">
                    {isPending
                     ? "Loading..." 
                     : error 
                     ?  "Something went wrong!" 
                     : data?.history?.map((message,i) => (
                        <div className='message user' key={i}>
                            <Markdown>{message.parts[0].text}</Markdown>
                            
                            </div>

                    ))}
                     
                    <NewPrompt/>
                    
                </div>
            </div>
        </div>

    )
}

export default  ChatPage;