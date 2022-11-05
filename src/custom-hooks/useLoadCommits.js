import React from "react"

export const useLoadCommits = (formData) => {
    const [data, setData] = React.useState({
        loading: false,
        commitData: {},
        errorState: false
    });


    React.useEffect(() => {
        const { owner ='',
        repo = '',
        public_access_key = ''} = formData
        if(owner) {
            setData((prevData) => {return {...prevData, loading: true }});
            fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
                headers: {
                    "Accept": "application/vnd.github+json",
                    "Authorization": `Bearer ${public_access_key} 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`
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
    },[formData])

    return data;
}