import { useEffect, useState, SyntheticEvent } from 'react';
import { GENDER, LANGUAGES, MODELS } from "@/shared/constants.ts";
import { Button } from "@/components/ui/button.tsx";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon } from "@radix-ui/react-icons";
import api from "@/api";
import { useToast } from "@/hooks/use-toast.ts";
import { useQueryClient } from "@tanstack/react-query";

const CUSTOM_VOICE_MODELS = [
    { value: 'normal', text: 'Normal' },
    { value: 'customVoice', text: 'Nopporn Neutral' },
    { value: 'customVoice2', text: 'Nopporn Neutral v2' }
];

const schema = z.object({
    title: z.string().min(2, { message: 'At least should have 2 characters' }),
    text: z.string().min(2, { message: 'At least should have 2 characters' })
});

const TextToSpeechView = () => {
    const [id, setId] = useState('');
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { mutate: addTextToSpeech } = api.text_to_speech_v.addTextToSpeechVMutation.useMutation({
        onSuccess: (data) => {
            setId(data.data as string);
        },
        onError: (error) => {
            console.error('Error:', error);
            toast({
                title: 'Error',
                description: 'Upload Failed',
                variant: 'destructive'
            });
        }
    });

    const { data: historyData } = api.text_to_speech.fetchHistoryByID.useQuery(id, {
        enabled: !!id,
        notifyOnChangeProps: "all"
    });

    const [gender, setGender] = useState('Male');
    const [language, setLanguage] = useState('th-TH');
    const [model, setModel] = useState('normal');
    const [highlightedText, setHighlightedText] = useState('');
    const [transcript, setTranscript] = useState({ Text: '', segmentList: [], Url: '' });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            text: ''
        }
    });

    useEffect(() => {
        if (!historyData) return;

        let text = historyData.text;
        const segments = historyData.segmentList;
        const newSegments = segments.map((segment) => {
            let trimmedText = segment.text.trim();
            const index = text.indexOf(trimmedText);
            if (index > 0 && (text[index - 1] === ' ' || text[index - 1] === '\n')) {
                trimmedText = ' ' + trimmedText;
            }
            if (trimmedText.length > 1) {
                text = text.slice(trimmedText.length);
            }
            return { ...segment, text: trimmedText === '' ? ' ' : trimmedText };
        });

        setTranscript({
            Text: historyData.text,
            segmentList: newSegments,
            Url: historyData.url
        });
        setHighlightedText(historyData.text);
    }, [historyData]);

    const audioHandler = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
        const currentTime = (e.target as HTMLAudioElement).currentTime;
        highlightSegment(currentTime);
    };

    const highlightSegment = (currentTime: number) => {
        let res = '';
        const tolerance = 0.1;
        transcript.segmentList.forEach((word) => {
            if (currentTime >= word.startTime - tolerance && currentTime <= word.endTime + tolerance) {
                res += `<span class="bg-yellow-200">${word.text}</span>`;
            } else {
                res += `${word.text}`;
            }
        });
        setHighlightedText(res.trim());
    };

    function onSubmit(values: z.infer<typeof schema>) {
        const payload = {
            requestMessage: values.text,
            languagedata: language,
            languageSecond: MODELS[model as 'normal' | 'customVoice' | 'customVoice2'][language as 'en-US' | 'th-TH'],
            gender: gender,
            title: values.title,
            listAlias: []
        };
        addTextToSpeech(payload);
    }

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: ['fetchHistoryByID']
        });
    }, [id, queryClient]);

    return (
        <section className="p-3">
            <div className="bg-white p-3 w-full sm:w-[67%] mx-auto rounded-lg shadow-sm flex flex-col gap-1">
                <h1>Text To Speech</h1>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title <span className={'text-red-600'}>*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="text"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Text <span className={'text-red-600'}>*</span></FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="content"
                                                className="min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <div className={'mt-4'}>
                    <div className={'mb-2'}>Settings</div>
                    <div className={'flex flex-col sm:flex-row gap-3 justify-between items-center'}>
                        <div>
                            <div className={'text-sm font-medium mb-1'}>Gender</div>
                            <div className={'bg-accent w-fit p-1 space-x-2 rounded'}>
                                {GENDER.map((g) => (
                                    <Button key={g} onClick={() => setGender(g)} variant={gender === g ? "default" : "outline"} className={'h-6 text-xs'}>{g}</Button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className={'text-sm font-medium mb-1'}>Language</div>
                            <div className={'bg-accent w-fit p-1 space-x-2 rounded'}>
                                {LANGUAGES.map((l) => (
                                    <Button key={l} onClick={() => setLanguage(l)} variant={language === l ? "default" : "outline"} className={'h-6 text-xs'}>{l}</Button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className={'text-sm font-medium mb-1'}>Models</div>
                            <Select disabled={language == 'en-US'} value={model} onValueChange={(e) => setModel((e))}>
                                <SelectTrigger className="h-7 bg-accent text-sm border-0 w-fit">
                                    <SelectValue placeholder="Select Model" />
                                </SelectTrigger>
                                <SelectContent>
                                    {CUSTOM_VOICE_MODELS.map((m) => (
                                        <SelectItem value={m.value} key={m.value}>{m.text}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className={'flex justify-end mt-4'}>
                    <Button onClick={form.handleSubmit(onSubmit)} size={'sm'}><CheckIcon className="mr-1" />Submit</Button>
                </div>

                {historyData && (
                    <div className="mt-4">
                        <h2 className="text-lg font-bold">Segments</h2>
                        <div className="flex gap-3">
                            <section className="h-full p-3 overflow-y-auto bg-white rounded-lg shadow-sm">
                                <div>
                                    <audio onTimeUpdate={audioHandler} controls preload="auto" src={transcript.Url} type="audio/wav">
                                        Your browser does not support the audio element.
                                    </audio>
                                    <div dangerouslySetInnerHTML={{ __html: highlightedText }}></div>
                                </div>
                            </section>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TextToSpeechView;