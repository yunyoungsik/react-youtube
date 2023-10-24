import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/api';
import { AiOutlineBell } from 'react-icons/ai';
import { BsPlay } from 'react-icons/bs';
import { BiVideo } from 'react-icons/bi';

// 단위 구분
const formatCount = (count) => {
    return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 날짜 변경
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const Channel = () => {
    const { channelId } = useParams();
    const [ channelDetail, setchannelDetail ] = useState();

    useEffect(() => {
        const fetchResults = async() => {
            try {
                const data = await fetchFromAPI(`channels?part=snippet&id=${channelId}`)
                // console.log(data.items[0])
                setchannelDetail(data.items[0])
            } catch(error) {
                console.log("Error fetching data", error)
            }
        }
        fetchResults();
    }, [channelId])

    const [latestVideos, setLatestVideos] = useState([]);

    useEffect(() => {
        const fetchLatestVideos = async () => {
            try {
                const data = await fetchFromAPI(`search?type=video&part=snippet&channelId=${channelId}&order=date&maxResults=5`)
                setLatestVideos(data.items);
            } catch(error) {
                console.log("Error fetching data", error)
            }
        }
        fetchLatestVideos();
    }, [channelId])

    return (
        <section id='channel'>
            {channelDetail && (
                <div className='channel__inner'>
                    <div className='channel__header' style={{ backgroundImage: `url(${channelDetail.brandingSettings.image.bannerExternalUrl})` }}>
                        <div className='circle'>
                            <img src={channelDetail.snippet.thumbnails.high.url} alt={channelDetail.brandingSettings.channel.title} />
                        </div>
                    </div>
                    <div className='channel__info'>
                        <h3 className='title'>{channelDetail.snippet.title}</h3>
                        <p className='desc'>{channelDetail.snippet.description}</p>
                        <div className='info'>
                            <div><AiOutlineBell /><span>{formatCount(channelDetail.statistics.subscriberCount)}</span></div>
                            <div><BiVideo /><span>{formatCount(channelDetail.statistics.videoCount)}</span></div>
                            <div><BsPlay /><span>{formatCount(channelDetail.statistics.viewCount)}</span></div>
                        </div>
                    </div>
                    <div className='channel__video video__inner'>
                        {latestVideos.map((video, key) => (
                            <div className='video'>
                                <div className="video__thumb play__icon">
                                    <Link to={`/video/${video.id.videoId}`} style={{ backgroundImage: `url(${video.snippet.thumbnails.high.url})` }}>
                                        
                                    </Link>
                                </div>
                                <div className="video__info">
                                    <h3 className="title">
                                        <Link to={`/channel/${video.id.videoId}`}>
                                            {video.snippet.title}
                                        </Link>
                                    </h3>
                                    <p className="desc">
                                        {video.snippet.description}
                                    </p>
                                    <div className='info'>
                                        <Link to={`/channel/${video.snippet.channelId}`} className='author'>{video.snippet.channelTitle}</Link>
                                        <span className='date'>{formatDate(video.snippet.publishedAt)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='channel__more'></div>
                </div>
            )}
        </section>
    )
}

export default Channel