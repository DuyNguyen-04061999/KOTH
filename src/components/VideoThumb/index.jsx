import { useEffect } from "react";
import { useRef } from "react";

export default function VideoThumb(props) {
    const { video, isPlaying } = props;
    const videoRef = useRef(null);

    useEffect(() => {
      if(isPlaying) {
        setTimeout(() => {
          if(videoRef?.current) {
            videoRef?.current?.play()
          }
        }, 350)
      } else if(videoRef?.current) {
          videoRef?.current?.pause();
          videoRef.current.currentTime = 0;
      }
    }, [isPlaying])

    return (
      <>
        <video
          onClick={() => {
           
          }}
          ref={videoRef}
          src={video}
          muted
          controls={false}
          width={"200px"}
          height={"200px"}
          className="img-fluid"
        ></video>
      </>
    );
}


