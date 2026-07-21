import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingProvider } from './state/OnboardingContext';
import { Welcome } from './screens/onboarding/Welcome';
import { SkinType } from './screens/onboarding/SkinType';
import { Skill } from './screens/onboarding/Skill';
import { Profession } from './screens/onboarding/Profession';
import { Camera } from './screens/onboarding/Camera';
import { Occasion } from './screens/onboarding/Occasion';
import { PlaceholderNext } from './screens/PlaceholderNext';

function App() {
  return (
    <BrowserRouter>
      <OnboardingProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding" element={<Welcome />} />
          <Route path="/onboarding/skin-type" element={<SkinType />} />
          <Route path="/onboarding/skill" element={<Skill />} />
          <Route path="/onboarding/profession" element={<Profession />} />
          <Route path="/onboarding/camera" element={<Camera />} />
          <Route path="/onboarding/occasion" element={<Occasion />} />
          <Route path="/looks/finding" element={<PlaceholderNext />} />
        </Routes>
      </OnboardingProvider>
    </BrowserRouter>
  );
}

export default App;
