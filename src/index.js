import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import StartingScreen from './startingScreen';
import NameScreenPlayer from './nameScreenPlayer';
import NameScreenCoach from './nameScreenCoach';
import PlayerSchedule from './playerSchedule';
import CoachSchedule from './coachSchedule';
import ThankYou from './thank_you';



function App() {
  const [currentScreen, setCurrentScreen] = useState('StartingScreen')

  const renderScreen = () => {
    switch (currentScreen){
      case 'StartingScreen':
        return <StartingScreen 
          onPlayer={() => setCurrentScreen('NameScreenPlayer')}
          onCoach={() => setCurrentScreen('NameScreenCoach')}
          />
      case 'NameScreenPlayer':
        return <NameScreenPlayer 
          onBack={() => setCurrentScreen('StartingScreen')}
          onContinue={(name) => {
            setCurrentScreen('PlayerSchedule');
            
          }} 
          />
      case 'NameScreenCoach':
        return <NameScreenCoach
          onBack={() => setCurrentScreen('StartingScreen')}
          onContinue={(name) => {
            setCurrentScreen('CoachSchedule');
            
          }} 
          />
      case 'PlayerSchedule':
        return <PlayerSchedule onBack={
          () => {setCurrentScreen('NameScreenPlayer');}
        }
        onSubmit={() => setCurrentScreen('ThankYou')}
        />
      case 'CoachSchedule':
        return <CoachSchedule onBack={
          () => {setCurrentScreen('NameScreenCoach')}
        }
        />
      case 'ThankYou':
        return <ThankYou/>
      default:
        return <h1>YFYFC</h1>
    }
  };

  return(
    <div>
      {renderScreen()}
    </div>
  )
  
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

