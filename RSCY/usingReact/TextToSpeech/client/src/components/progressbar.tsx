// import React, { useState, useCallback } from "react";

// const App = () => {
//   const [files, setFiles] = useState([]);

//   const handleFileUpload = useCallback((event) => {
//     setFiles(event.target.files);
//   }, []);

//   const handleSubmit = useCallback(
//     (event) => {
//       event.preventDefault();
//       const formData = new FormData();
//       Array.from(files).forEach((file) => {
//         formData.append("myFiles", file);
//       });

//       fetch("http://localhost:3001/upload", {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => response.text())
//         .then((data) => console.log(data))
//         .catch((error) => console.error("Error:", error));
//     },
//     [files]
//   );

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" name="myFiles" multiple onChange={handleFileUpload} />
//       <button type="submit">Upload</button>
//     </form>
//   );
// };

// export default App;

import React, { useState, useRef, useEffect, useCallback } from "react";
import { FileUploader } from "react-drag-drop-files";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./index.css";

const App = () => {
  const [text, setText] = useState([]);
  const [highlightedWordIndices, setHighlightedWordIndices] = useState([]);
  const [audioURL, setAudioURL] = useState("");
  const [wordTimings, setWordTimings] = useState([]);
  const audioRef = useRef(null);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const formData = new FormData();
      Array.from(text).forEach((file, index) => {
        return formData.append(`myFile${index}`, file);
      });
      //formData.append('audio', audioURL)
      console.log("formData", formData);
      fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData, // Ensure formData is correctly set up
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    },
    [text, audioURL]
  );
  console.log("text", text);

  const handleFileUpload = useCallback((fileList) => {
    console.log("fileList", fileList);
    setText(fileList);
  }, []);
  //   const handleFileUpload = useCallback((fileList) => {
  //     Array.from(fileList).forEach((file) => {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         const fileContent = e.target.result;
  //         const words = fileContent.trim().split(" ");
  //         setText((prev) => [...prev, words]);
  //         setHighlightedWordIndices((prev) => [...prev, -1]);
  //       };
  //       reader.readAsText(file);
  //     });
  //   }, []);

  const handleAudioUpload = useCallback((file) => {
    const url = URL.createObjectURL(file);
    setAudioURL(url);
  }, []);

  //   useEffect(() => {
  //     const audioElement = audioRef.current?.audio?.current;
  //     if (!audioElement) {
  //       console.error("Audio element not found");
  //       return;
  //     }

  //     const handleLoadedMetadata = () => {
  //       const duration = audioElement.duration;
  //       console.log("Audio duration:", duration);
  //       const totalWords = text.flat().length;
  //       const wordDuration = duration / totalWords;
  //       const timings = text.flat().map((_, index) => index * wordDuration);
  //       setWordTimings(timings);
  //       console.log("Word timings:", timings);
  //     };

  //     const updateHighlight = () => {
  //       const currentTime = audioElement.currentTime;
  //       const wordIndex = wordTimings.findIndex((time) => currentTime < time) - 1;
  //       console.log("Current time:", currentTime, "Word index:", wordIndex);

  //       let cumulativeLength = 0;
  //       let currentParagraphIndex = -1;
  //       let currentWordIndex = -1;

  //       for (let i = 0; i < text.length; i++) {
  //         const sectionLength = text[i].length;
  //         if (
  //           wordIndex >= cumulativeLength &&
  //           wordIndex < cumulativeLength + sectionLength
  //         ) {
  //           currentParagraphIndex = i;
  //           currentWordIndex = wordIndex - cumulativeLength;
  //           break;
  //         }
  //         cumulativeLength += sectionLength;
  //       }

  //       const newIndices = text.map((_, index) =>
  //         index === currentParagraphIndex ? currentWordIndex : -1
  //       );
  //       setHighlightedWordIndices(newIndices);
  //     };

  //     audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
  //     audioElement.addEventListener("timeupdate", updateHighlight);

  //     return () => {
  //       audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
  //       audioElement.removeEventListener("timeupdate", updateHighlight);
  //     };
  //   }, [text, audioURL, wordTimings]);

  const fileTypes = ["JPG", "PNG", "GIF", "txt"];

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {/* <FileUploader
          handleChange={handleFileUpload}
          type="file"
          name="myFiles"
          types={fileTypes}
          multiple={true}
        /> */}
        <input
          type="file"
          name="myFiles"
          multiple
          onChange={handleFileUpload}
        />
        <FileUploader
          handleChange={handleAudioUpload}
          name="audio"
          types={["mp3", "mp4"]}
        />
        {audioURL && (
          <AudioPlayer
            src={audioURL}
            ref={audioRef}
            onPlay={() => console.log("onPlay")}
            onPause={() => console.log("onPause")}
            onEnded={() => console.log("onEnded")}
          />
        )}
        {/* {text.map((section, sectionIndex) => (
          <div className="text-wrapper" key={sectionIndex}>
            {section.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className={
                  wordIndex === highlightedWordIndices[sectionIndex]
                    ? "highlight"
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </div>
        ))} */}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default App;

// import React, { useState, useRef } from "react";
// import "./App.css";

// function App() {
//   const [text, setText] = useState("");
//   const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setText(e.target.result);
//       };
//       reader.readAsText(file);
//     }
//   };

//   const handlePlay = () => {
//     if (isPlaying) {
//       window.speechSynthesis.cancel();
//       setIsPlaying(false);
//       return;
//     }

//     const utterance = new SpeechSynthesisUtterance(text);

//     utterance.onboundary = (event) => {
//       if (event.name === "word") {
//           const charIndex = event.charIndex;
//           console.log("text.substring(0, charIndex):", text.substring(0, charIndex));
//         const wordIndex = text.substring(0, charIndex).split(" ").length - 1;
//         console.log("Current word index:", wordIndex); // Debugging line
//         setHighlightedWordIndex(wordIndex);
//       }
//     };

//     utterance.onend = () => {
//       setIsPlaying(false);
//       setHighlightedWordIndex(-1);
//     };

//     window.speechSynthesis.speak(utterance);
//     setIsPlaying(true);
//   };

//   return (
//     <div className="App">
//       <input type="file" accept=".txt" onChange={handleFileUpload} />
//       <button onClick={handlePlay}>{isPlaying ? "Stop" : "Play"}</button>
//       <div id="textContainer">
//         {text.split(" ").map((word, index) => (
//           <span
//             key={index}
//             className={index === highlightedWordIndex ? "highlight" : ""}
//           >
//             {word}{" "}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
