import './App.css';
import { useLoadCommits } from './custom-hooks/useLoadCommits';
import React from 'react';
import { AppForm } from './components/app-form';
import { CommitList } from './components/commit-list/CommitList';

function App() {
  const [formData, setFormData] = React.useState({});
  const [data={}, setRefreshData] = useLoadCommits(formData);
  const {loading, commitData, errorState} = data
  console.log(commitData ,errorState);
  
  const handleRefesh  = () => {
    setRefreshData({})
  }
  

  if(loading) {
    return <div>loading . . .</div>
  }

  if(errorState) {
    return <div>something went wrong</div>
  }
  
  const actionsPanel = <div className='app-actionpanel'>
    <button className='refresh-btn' onClick={handleRefesh}>Refresh</button>
  </div>
  
  
  let commitsConatiner = loading ? <div>loading . . .</div> : Object.keys(commitData).length>0 && commitData.map((elem) => {
    return <CommitList key={elem.sha} commitData={elem}/>
  })

  return (
    <div className="App">
        <AppForm setFormData={setFormData}/>
        {actionsPanel}
        {commitsConatiner}
    </div>
  );
}

export default App;
