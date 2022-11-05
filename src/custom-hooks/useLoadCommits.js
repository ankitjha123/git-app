import React from "react"

export const useLoadCommits = (formData) => {
    const [data, setData] = React.useState({
        loading: false,
        commitData: {},
        errorState: false
    });
    const [refreshData, setRefreshData] = React.useState({})

    React.useEffect(() => {
        let { owner ='',
        repo = '',
        public_access_key = localStorage.getItem('token') || ''} = formData;
        if(!public_access_key) public_access_key = localStorage.getItem('token');
        else localStorage.setItem("token", public_access_key);
        if(owner) {
            setData((prevData) => {return {...prevData, loading: true }});
            fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
                headers: {
                    "Accept": "application/vnd.github+json",
                    "Authorization": `Bearer ${public_access_key}`
                }
            }).then((res) => {
                return res.json()
            }).then((data) => {
                let res = [];
                if(data && data.length>0) {
                    res = data.map((elem) => {
                        return {
                            sha : elem.sha,
                            url : elem.url,
                            author: elem.commit.author.name,
                            date: elem.commit.author.date,
                            message: elem.commit.message
                        }
                    })
                }

                setData((prevData) => {return {...prevData, loading: false, commitData: [...res], errorState: false}});
                return data
            }).catch((err) => {
                console.log(err);
                setData((prevData) => {return {...prevData, loading: false, commitData: [], errorState: true}});
            })
        }
    },[formData, refreshData])

    return [data, setRefreshData];
}