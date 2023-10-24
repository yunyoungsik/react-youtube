import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/api'
import ReactPlayer from 'react-player'
import { AiOutlineLike } from 'react-icons/ai';
import { BsPlay } from 'react-icons/bs';
import { BiCommentDetail } from 'react-icons/bi';

// 단위 구분
const formatCount = (count) => {
    return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Video = () => {
    const { videoId } = useParams()
    const [videoDetail, setVideoDetail] = useState(null)
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`)
            .then((data) => {
                setVideoDetail(data.items[0])
                // console.log(data)
            })

         // YouTube 동영상 댓글 가져오기
         const apiKey = process.env.REACT_APP_RAPID_API_KEY;
         const requestOptions = {
             method: 'GET',
             headers: {
                 'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
                 'X-RapidAPI-Key': apiKey,
             },
         };
 
         fetch(`https://youtube-v31.p.rapidapi.com/commentThreads?videoId=${videoId}`, requestOptions)
             .then((response) => response.json())
             .then((data) => {
                 setComments(data.items);
                 console.log(data);
             })
             .catch((error) => {
                 console.error(error);
             });
    }, [videoId])

    

    return (
        <section id='videoView'>
            {videoDetail && (
                <div className='video__view'>
                    <div className='video__play'>
                        <ReactPlayer
                            playing={true}
                            url={`https://www.youtube.com/watch?v=${videoId}`}
                            width='100%'
                            height='100%'
                            // style={{position: 'absolute', top:0, left:0}}
                        />
                    </div>
                    <div className='video__info'>
                        <h2 className='video__title'>{videoDetail.snippet.title}</h2>
                        <div className='video__channel'>
                            <div className='id'>
                                <Link to={`/channel/${videoDetail.snippet.channelId}`}>
                                    {videoDetail.snippet.channelTitle}
                                </Link>
                            </div>
                            <div className='count'>
                                <div className='view'><BsPlay /><span>{formatCount(videoDetail.statistics.viewCount)}</span></div>
                                <div className='like'><AiOutlineLike /><span className='like'>{formatCount(videoDetail.statistics.likeCount)}</span></div>
                                <div className='comment'><BiCommentDetail /><span className='comment'>{formatCount(videoDetail.statistics.commentCount)}</span></div>
                            </div>
                        </div>
                        <div className="desc">
                            <span>{videoDetail.snippet.description}</span>
                        </div>
                        <div className='comment'>
                            <ul>
                                {comments.map((comment) => (
                                    <li key={comment.id}>
                                        <h3>{comment.snippet.topLevelComment.snippet.authorDisplayName}</h3>
                                        <span>{comment.snippet.topLevelComment.snippet.textOriginal}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Video