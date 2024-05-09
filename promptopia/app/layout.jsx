import "@styles/globals.css"
import Nav from '@components/Nav';
import Provider from "@components/Provider";

export const metadata={
    title: 'Promptopia',
    description: 'Discover the best prompts for your next writing session.',
    keywords: 'AI,Prompt,Writing',
}

const layout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default layout