import React from 'react';
import styles from './app-form.module.scss'

export function AppForm({setFormData}) {

    const [formState, setFormState] = React.useState({
        owner: '',
        repo: '',
        public_access_key: ''
    })

    
    const handleFormChange = (e) => {
        setFormState((prevFormState) => {
            return {
                ...prevFormState,
                [e.target.name] : e.target.value
            }

        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormData({...formState});
    }
    
    return (
        <form onSubmit={handleFormSubmit} className={styles.formContainer}>
            <div>
                <label htmlFor="owner" className={styles.label}>Owner</label>
                <input name='owner' onChange={handleFormChange}></input>
            </div>
            <div>
                <label htmlFor="repo" className={styles.label}>Repo Name</label>
                <input name='repo' onChange={handleFormChange}></input>
            </div>
            
            <div>
                <label htmlFor="public_access_key" className={styles.label}>Public Access Key</label>
                <input name='public_access_key' onChange={handleFormChange}></input>
            </div>
            
            <button type='submit'>Submit</button>
        </form>
    )

}