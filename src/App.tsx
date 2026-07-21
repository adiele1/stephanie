import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingProvider } from './state/OnboardingContext';
import { SessionProvider } from './state/SessionContext';
import { Welcome } from './screens/onboarding/Welcome';
import { SkinType } from './screens/onboarding/SkinType';
import { Skill } from './screens/onboarding/Skill';
import { Profession } from './screens/onboarding/Profession';
import { Camera } from './screens/onboarding/Camera';
import { Occasion } from './screens/onboarding/Occasion';
import { Finding } from './screens/looks/Finding';
import { Grid } from './screens/looks/Grid';
import { Detail } from './screens/looks/Detail';
import { Steps } from './screens/looks/Steps';
import { Completion } from './screens/looks/Completion';

function App() {
  return (
    <BrowserRouter>
      <OnboardingProvider>
        <SessionProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/onboarding" replace />} />
            <Route path="/onboarding" element={<Welcome />} />
            <Route path="/onboarding/skin-type" element={<SkinType />} />
            <Route path="/onboarding/skill" element={<Skill />} />
            <Route path="/onboarding/profession" element={<Profession />} />
            <Route path="/onboarding/camera" element={<Camera />} />
            <Route path="/onboarding/occasion" element={<Occasion />} />
            <Route path="/looks/finding" element={<Finding />} />
            <Route path="/looks/grid" element={<Grid />} />
            <Route path="/looks/detail" element={<Detail />} />
            <Route path="/looks/steps" element={<Steps />} />
            <Route path="/looks/completion" element={<Completion />} />
          </Routes>
        </SessionProvider>
      </OnboardingProvider>
    </BrowserRouter>
  );
}

export default App;
