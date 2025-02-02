import React, {useEffect, useState} from 'react'
// using the react pdf viewer 
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// importing the styles for pdf viewer
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// using react-reader for epub files
import {ReactReader} from "react-reader";
import useLocalStorageState from 'use-local-storage-state'


import { useTheme } from '@/components/theme-provider';

const Read = () => {
  // get theme from the theme provider
  const {theme} = useTheme();
  
  // using the default layout plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [location, setLocation] = useLocalStorageState(0);
  const url = "../../public/the-great-gatsby.epub";

  const [type, setType] = useState(null)

  useEffect(() => {
    if (url.search('.epub') !== -1) {
      setType('epub')
    } else if (url.search('.pdf') !== -1) {
      setType('pdf')
    }
  }, [url])

  return (
    <div className='w-full h-full'>
      {type === "epub" && <ReactReader 
        url={url}
        location={location}
        locationChanged={(epubcfi) => setLocation(epubcfi)}
        title="The Great Gatsby"
      />
      }

      {type === "pdf" && <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
        <div style={{ height: '750px' }}>
            <Viewer
                fileUrl={url}
                plugins={[
                    defaultLayoutPluginInstance,
                ]}
                theme={theme}
            />
        </div>
      </Worker>
      }
    </div>
  )
}

export default Read