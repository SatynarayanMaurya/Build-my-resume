import { Route, Routes } from 'react-router-dom'
import ResumeBuilder4 from './components/ResumeBuilder4'
import ResumeBuilderLanding from './components/ResumeBuilderLanding'

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<ResumeBuilderLanding/>}/>
        <Route path='/create-resume' element={<ResumeBuilder4/>}/>
      </Routes>
      
      
    </div>
  )
}

export default App
