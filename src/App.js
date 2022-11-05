import './App.css';
import { useLoadCommits } from './custom-hooks/useLoadCommits';
import React from 'react';
import { AppForm } from './components/app-form';
import { CommitList } from './components/commit-list/CommitList';

function App() {
  const [formData, setFormData] = React.useState({});

  const {loading, commitData, error} = useLoadCommits(formData);
  console.log(commitData);
  let commitsConatiner = Object.keys(commitData).length>0 && commitData.map((elem) => {
    return <CommitList key={elem.sha} commitData={elem}/>
  })
  
  
  if(loading) {
    return <div>loading . . .</div>
  }
  
  return (
    <div className="App">
        <AppForm setFormData={setFormData}/>
        {commitsConatiner}
    </div>
  );
}

export default App;
