import React, { useEffect, useState, useRef } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { ReactReader, ReactReaderStyle } from 'react-reader';
import useLocalStorageState from 'use-local-storage-state';
import { useTheme } from '@/components/theme-provider';

function updateTheme(rendition, theme) {
    if (!rendition) return;
    switch (theme) {
        case 'dark':
            rendition.themes.override('color', '#fff');
            rendition.themes.override('background', '#000');
            break;
        case 'light':
            rendition.themes.override('color', '#000');
            rendition.themes.override('background', '#fff');
            break;
        default:
            break;
    }
}

const Read = () => {
    const { theme } = useTheme();
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [location, setLocation] = useLocalStorageState('reader-location', { defaultValue: 0 });
    const [fileType, setFileType] = useState(null);
    const rendition = useRef(null);
    const url = '/the-great-gatsby.epub';

    useEffect(() => {
        if (url.endsWith('.epub')) {
            setFileType('epub');
        } else if (url.endsWith('.pdf')) {
            setFileType('pdf');
        }
    }, [url]);

    useEffect(() => {
        if (rendition.current) {
            updateTheme(rendition.current, theme);
        }
    }, [theme]);

    return (
        <div className="w-full h-full">
            {fileType === 'epub' && (
                <ReactReader
                    url={url}
                    location={location}
                    title="The Great Gatsby"
                    locationChanged={(loc) => setLocation(loc)}
                    readerStyles={theme === 'dark' ? darkReaderTheme : lightReaderTheme}
                    getRendition={(renditionInstance) => {
                        rendition.current = renditionInstance;
                        updateTheme(renditionInstance, theme);
                    }}
                />
            )}

            {fileType === 'pdf' && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
                    <div style={{ height: '750px' }}>
                        <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
                    </div>
                </Worker>
            )}
        </div>
    );
};

export default Read;

const lightReaderTheme = {
    ...ReactReaderStyle,
    readerArea: {
        ...ReactReaderStyle.readerArea,
        backgroundColor: '#fff',
        color: '#000',
        transition: undefined,
    },
};

const darkReaderTheme = {
    ...ReactReaderStyle,
    readerArea: {
        ...ReactReaderStyle.readerArea,
        backgroundColor: '#000',
        color: '#fff',
        transition: undefined,
    },
    titleArea: {
        ...ReactReaderStyle.titleArea,
        color: '#ccc',
    },
    tocArea: {
        ...ReactReaderStyle.tocArea,
        background: '#111',
    },
    tocButtonExpanded: {
        ...ReactReaderStyle.tocButtonExpanded,
        background: '#222',
    },
    tocButtonBar: {
        ...ReactReaderStyle.tocButtonBar,
        background: '#fff',
    },
    tocButton: {
        ...ReactReaderStyle.tocButton,
        color: 'white',
    },
};
