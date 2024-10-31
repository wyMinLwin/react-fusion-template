import { useEffect, useState, SyntheticEvent } from 'react';
import { transcriptEN, transcriptTH } from './dummyText';
import {useTranslation} from "react-i18next";

const SegmentsView = () => {
    const {t} = useTranslation()
    const [highlightedTextEN, setHighlightedTextEN] = useState(transcriptEN.Text);
    const [highlightedTextTH, setHighlightedTextTH] = useState(transcriptTH.Text);

    const audioHandler = (e: SyntheticEvent<HTMLAudioElement, Event>, type: 'en' | 'th') => {
        const currentTime = (e.target as HTMLAudioElement).currentTime;
        highlightSegment(currentTime, type);
    };

    const highlightSegment = (currentTime: number, type: 'en' | 'th') => {
        let highlightedText = '';
        const tolerance = 0.1;
        const transcript = type === 'en' ? transcriptEN : transcriptTH;
        transcript.textSegment.forEach((word) => {
            if (currentTime >= word.StartTime - tolerance && currentTime <= word.EndTime + tolerance) {
                highlightedText += `<span class="bg-yellow-200">${word.Text}</span>`;
            } else {
                highlightedText += `${word.Text}`;
            }
        });
        type === 'en'
            ? setHighlightedTextEN(highlightedText.trim())
            : setHighlightedTextTH(highlightedText.trim());
    };

    useEffect(() => {
        let text = transcriptTH.Text;
        const segments = transcriptTH.textSegment;
        const newSegments = segments.map((segment) => {
            let trimmedText = segment.Text.trim();
            if (segment.Text.includes('ยัง')) {
                console.log(segment.Text);
                console.log(text);
            }
            const index = text.indexOf(trimmedText);
            if (index > 0 && text[index - 1] === ' ') {
                trimmedText = ' ' + trimmedText;
            }
            if (trimmedText.length > 1) {
                text = text.slice(trimmedText.length);
            }
            return { ...segment, Text: trimmedText === '' ? ' ' : trimmedText };
        });
        transcriptTH.textSegment = newSegments;
    }, []);

    return (
        <div className="p-3">
            <h1 className="mb-4 text-xl font-bold">{t('title.segments')}</h1>

            <div className="flex gap-3">
                <section className="h-full p-3 overflow-y-auto bg-white rounded-lg shadow-sm">
                    <div>
                        <audio onTimeUpdate={(e) => audioHandler(e, 'en')} controls preload="auto">
                            <source src={transcriptEN.Url} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                        <div dangerouslySetInnerHTML={{ __html: highlightedTextEN }}></div>
                    </div>

                    <div className="mt-3">
                        <audio onTimeUpdate={(e) => audioHandler(e, 'th')} controls>
                            <source src={transcriptTH.Url} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                        <div dangerouslySetInnerHTML={{ __html: highlightedTextTH }}></div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SegmentsView;