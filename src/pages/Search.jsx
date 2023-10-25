import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { fetchFromAPI } from '../utils/api'
import VideoSearch from '../components/video/VideoSearch';



const Search = () => {
    const { searchId } = useParams();
    const [ video, setVideo ] = useState([]);

    useEffect(() => {
        fetchFromAPI(`search?type=video&part=snippet&q=${searchId}`)
            .then((data) => setVideo(data.items))
    }, [searchId])
    // youtube API
    // useEffect(() => {
    //     fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=AIzaSyC9b5bs8bCs8sQZMMASU_lqR74VyTXr1VQ")
    //     .then(response => response.json())
    //     .then(result => {
    //         console.log(result.items);
    //         setVideo(result.items);

    //         result.items.forEach((video) => {
    //             video.snippet.publishedAt = formatDate(video.snippet.publishedAt);
    //         });
    //     })
    //     .catch(error => console.log(error))
    // }, [])
    return (
        <section id='searchPage'>
            <h2>{searchId}의 검색결과 영상입니다.</h2>
            <div className="video__inner search">
                <VideoSearch video={video} />
            </div>
        </section>
    )
}

export default Search