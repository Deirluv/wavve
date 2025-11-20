"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { UploadCloud, Mic, X, ChevronDown, Check, AlertTriangle, Disc } from 'lucide-react';

import { uploadTrack, TrackApiDto } from '@/app/api/tracks/tracks.api';
import { getGenres, GenreApiDto } from '@/app/api/genres/genres.api';

const STYLES = {
    ACCENT_BG: { backgroundColor: 'var(--color-sc-accent)' },
    ACCENT_COLOR: { color: 'var(--color-sc-accent)' },
    TEXT_COLOR: { color: 'var(--color-sc-text)' },
    SECONDARY_COLOR: { color: 'var(--color-sc-secondary)' },
    TERTIARY_COLOR: { color: 'var(--color-sc-tertiary)' },
    CARD_BG: { backgroundColor: 'var(--color-sc-card-bg)' },
    BORDER_SECONDARY: { borderColor: 'var(--color-sc-secondary)' },
};


const getAudioDuration = (audioFile: File): Promise<number> => {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(audioFile);
        const audio = new Audio();

        audio.onloadedmetadata = () => {
            URL.revokeObjectURL(url);
            if (audio.duration === Infinity) {
                reject(new Error("Cannot determine duration (stream or corrupted file)."));
            } else {
                resolve(Math.floor(audio.duration));
            }
        };

        audio.onerror = (e) => {
            URL.revokeObjectURL(url);

            const errorMessage = audio.error
                ? `Media Error Code: ${audio.error.code}`
                : 'Unknown audio loading error.';

            reject(new Error(`Error loading audio file: ${errorMessage}`));
        };

        audio.src = url;
    });
};


interface UploadStateProps {
    fileName: string | null;
    status: 'idle' | 'recording' | 'file_selected' | 'metadata_submitted' | 'uploading' | 'error';
    onRemoveFile: () => void;
    onUploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRecordToggle: () => Promise<void>;
    isRecording: boolean;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    recordingTime: number;
    micError: string | null;
}

interface FormSubmissionData {
    title: string;
    description: string;
    genreId: string;
    previewFile: File | null;
}

interface MetadataFormProps {
    fileName: string | null;
    onSubmit: (data: FormSubmissionData) => Promise<void> | void;
    onRemoveFile: () => void;
    genreOptions: GenreApiDto[];
}

// component uploading and recording
const UploadState = ({ fileName, status, onRemoveFile, onUploadFile, onRecordToggle, isRecording, fileInputRef, recordingTime, micError } : UploadStateProps) => {

    return (
        <div className="space-y-6">
            {/* file uploading */}
            <div
                className="p-12 border-2 border-dashed flex flex-col items-center rounded-lg"
                style={{ ...STYLES.BORDER_SECONDARY, backgroundColor: 'transparent' }}
            >
                {/* file chosen */}
                {fileName && status !== 'recording' ? (
                    <div className="w-full flex items-center justify-between p-4 rounded-md" style={STYLES.CARD_BG}>
                        <div className="flex items-center space-x-3">
                            <Check className="w-6 h-6 text-green-500" />
                            <span className="font-semibold truncate" style={STYLES.TEXT_COLOR}>{fileName}</span>
                        </div>
                        <button onClick={onRemoveFile} className="hover:opacity-75">
                            <X className="w-5 h-5" style={STYLES.SECONDARY_COLOR} />
                        </button>
                    </div>
                ) : (
                    // file choosing
                    <>
                        <img src="/upload.png" alt="" className={"scale-80"}/>
                        <p style={STYLES.TERTIARY_COLOR} className="mt-2">Drag and drop audio files to get started.</p>

                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="audio/*"
                            onChange={onUploadFile}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="mt-4 py-2 px-6 rounded-md font-semibold cursor-pointer text-black"
                            style={{ backgroundColor: 'var(--color-sc-text)' }}
                        >
                            Choose files
                        </label>
                    </>
                )}

            </div>

            {/* dictofon */}
            <div
                className="w-full p-4 rounded-lg flex items-center justify-between cursor-pointer transition duration-200 border"
                style={{ ...STYLES.CARD_BG, ...STYLES.BORDER_SECONDARY }}
                onClick={onRecordToggle}
            >
                <div className="flex items-center space-x-3">
                    {/* icon */}
                    <div className={`p-1 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : ''}`}>
                        <Mic className='w-6 h-6' style={isRecording ? {color: 'white'} : STYLES.SECONDARY_COLOR} />
                    </div>

                    <div className="flex flex-col">
                        <p className="font-semibold" style={STYLES.SECONDARY_COLOR}>
                            Or record with a microphone
                            {isRecording && <span className="text-red-500 ml-2">({recordingTime}s recording...)</span>}
                        </p>
                        <p className="text-sm" style={STYLES.TERTIARY_COLOR}>
                            Upload recorded voice memos, updates, news, or intros to new releases
                        </p>
                    </div>
                </div>
                <ChevronDown className="w-5 h-5" style={STYLES.SECONDARY_COLOR} />
            </div>

            {/* microphone error */}
            {micError && (
                <div className="p-3 bg-red-900/50 text-red-400 rounded-lg flex items-center space-x-2 border border-red-700">
                    <AlertTriangle className="w-5 h-5" />
                    <p className="text-sm font-medium">{micError}</p>
                </div>
            )}
        </div>
    );
};

// metadata and form submit
const MetadataForm = ({ fileName, onSubmit, onRemoveFile, genreOptions } : MetadataFormProps) => {

    const defaultGenreId = genreOptions.length > 0 ? genreOptions[0].id : '';

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genreId: defaultGenreId
    });

    // update formData, eif genres list changed/loaded
    useEffect(() => {
        if (genreOptions.length > 0 && formData.genreId === defaultGenreId) {
            setFormData(prev => ({ ...prev, genreId: genreOptions[0].id }));
        }
    }, [genreOptions]);


    const [previewFile, setPreviewFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, genreId: e.target.value });
    };

    const handlePreviewFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreviewFile(e.target.files ? e.target.files[0] : null);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // back to parent component
        onSubmit({
            ...formData,
            previewFile: previewFile
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold" style={STYLES.TEXT_COLOR}>Track Info</h2>

            {/* file preview */}
            <div className="p-4 rounded-lg border flex items-center justify-between" style={{ ...STYLES.CARD_BG, ...STYLES.BORDER_SECONDARY }}>
                <div className="flex items-center space-x-3">
                    <Check className="w-6 h-6 text-green-500" />
                    <span className="font-semibold truncate" style={STYLES.TEXT_COLOR}>{fileName}</span>
                </div>
                <button type="button" onClick={onRemoveFile} className="text-sm" style={STYLES.ACCENT_COLOR}>
                    Change/Delete
                </button>
            </div>

            {/* form fields */}
            <div>
                <label className="block text-sm font-medium mb-1" style={STYLES.SECONDARY_COLOR}>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md border text-white"
                    style={{ ...STYLES.CARD_BG, ...STYLES.BORDER_SECONDARY }}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1" style={STYLES.SECONDARY_COLOR}>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 rounded-md border text-white resize-none"
                    style={{ ...STYLES.CARD_BG, ...STYLES.BORDER_SECONDARY }}
                />
            </div>

            {/* cover art (preview file) input */}
            <div>
                <label className="block text-sm font-medium mb-1" style={STYLES.SECONDARY_COLOR}>Cover Art (Preview)</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePreviewFileChange}
                    className="w-full p-3 rounded-md border text-white"
                    style={{ ...STYLES.CARD_BG, ...STYLES.BORDER_SECONDARY }}
                />
                {previewFile && <p className="text-xs text-sc-tertiary mt-1">Selected: {previewFile.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1" style={STYLES.SECONDARY_COLOR}>Genre</label>
                <select
                    name="genreId"
                    value={formData.genreId}
                    onChange={handleGenreChange}
                    required
                    className="w-full p-3 rounded-md border text-white appearance-none cursor-pointer"
                    style={{ ...STYLES.CARD_BG, ...STYLES.BORDER_SECONDARY }}
                >
                    {/* dynamic genres list */}
                    {genreOptions.length > 0 ? (
                        genreOptions.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>Loading genres...</option>
                    )}
                </select>
            </div>

            {/* submission button */}
            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full py-3 text-lg font-bold text-white rounded-md transition duration-200 hover:opacity-80"
                    style={STYLES.ACCENT_BG}
                >
                    Finish uploading
                </button>
            </div>
        </form>
    );
};



export default function UploadPage() {
    const [fileName, setFileName] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'recording' | 'file_selected' | 'metadata_submitted' | 'uploading' | 'error'>('idle');
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0); // Длительность записи

    const [fileDuration, setFileDuration] = useState<number>(0);

    const [isRecordedFile, setIsRecordedFile] = useState(false);

    const [micError, setMicError] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const [audioFileToSend, setAudioFileToSend] = useState<File | null>(null);
    const [uploadedTrack, setUploadedTrack] = useState<TrackApiDto | null>(null);

    const [genres, setGenres] = useState<GenreApiDto[]>([]);
    const [genresLoading, setGenresLoading] = useState(true);
    const [genresError, setGenresError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // stop recording and clean
    const stopRecording = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
        setRecordingTime(0);
    }, []);

    // clean stream
    const cleanupStream = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    }, []);

    // useEffect for reset
    useEffect(() => {
        return () => {
            stopRecording();
            cleanupStream();
        };
    }, [stopRecording, cleanupStream]);

    // useEffect for genres loading
    useEffect(() => {
        const fetchGenres = async () => {
            setGenresLoading(true);
            try {
                const genreList = await getGenres();
                setGenres(genreList);
                setGenresError(null);
            } catch (err) {
                const errorMessage = (err as Error).message || "Failed to load genres.";
                setGenresError(errorMessage);
                console.error(err);
            } finally {
                setGenresLoading(false);
            }
        };

        fetchGenres();
    }, []);


    // dictofon
    const handleRecordToggle = async () => {
        setMicError(null);
        setFileDuration(0); // reset duration
        setIsRecordedFile(true); // if dictofon

        if (isRecording) {
            stopRecording();
        } else {
            if (fileName) handleRemoveFile();

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                streamRef.current = stream;

                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                audioChunksRef.current = [];

                mediaRecorder.ondataavailable = (event) => {
                    audioChunksRef.current.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
                    const audioFile = new File([audioBlob], `Recorded_Audio_Clip_${Date.now()}.mp3`, { type: 'audio/mp3' });

                    setAudioFileToSend(audioFile);

                    setFileName(audioFile.name);
                    setUploadStatus('file_selected');
                    cleanupStream();
                };

                mediaRecorder.start();
                setIsRecording(true);
                setUploadStatus('recording');

                setRecordingTime(0);
                timerRef.current = setInterval(() => {
                    setRecordingTime(prev => prev + 1);
                }, 1000);

            } catch (err) {
                console.error("Microphone access failed:", err);
                setMicError("Microphone access denied or not found. Please check your browser permissions.");
                setIsRecording(false);
                setUploadStatus('idle');
                cleanupStream();
            }
        }
    };

    // file select
    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            stopRecording();
            cleanupStream();
            setMicError(null);
            setIsRecordedFile(false);

            setAudioFileToSend(file);
            setFileName(file.name);
            setUploadStatus('file_selected');
            setUploadError(null);

            try {
                const duration = await getAudioDuration(file);
                setFileDuration(duration);
            } catch (err) {
                const errorMessage = (err as Error).message || "Failed to read audio duration.";
                setUploadError(`File Error: ${errorMessage}`);
                setUploadStatus('error');
                console.error(err);
                // if error reset the file
                handleRemoveFile();
            }
        }
    };

    // file removal
    const handleRemoveFile = () => {
        setFileName(null);
        setUploadStatus('idle');
        stopRecording();
        cleanupStream();
        setMicError(null);
        setUploadError(null);
        setAudioFileToSend(null); // reset file
        setUploadedTrack(null);
        setFileDuration(0); // reset duration
        setIsRecordedFile(false); // reset
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // metadata submit
    const handleMetadataSubmit = async (metadata: {
        title: string,
        description: string,
        genreId: string,
        previewFile: File | null
    }) => {
        if (!audioFileToSend) {
            setUploadError("Audio file is missing.");
            setUploadStatus('error');
            return;
        }

        if (!metadata.genreId) {
            setUploadError("Please select a genre.");
            setUploadStatus('error');
            return;
        }

        if (!metadata.previewFile) {
            setUploadError("Cover Art (Preview) is required.");
            setUploadStatus('error');
            return;
        }

        let durationToSend: number;
        if (isRecordedFile) {
            // if dictofon - recording time
            durationToSend = recordingTime;
        } else {
            // if loaded file then file duration
            durationToSend = fileDuration;
        }

        if (durationToSend <= 0) {
            setUploadError("Cannot determine file duration. Please re-upload.");
            setUploadStatus('error');
            return;
        }


        const formData = new FormData();

        // forming data
        formData.append("Title", metadata.title);
        formData.append("Description", metadata.description);
        formData.append("Duration", durationToSend.toString());
        formData.append("GenreId", metadata.genreId);

        formData.append("File", audioFileToSend, audioFileToSend.name);
        formData.append("Preview", metadata.previewFile, metadata.previewFile.name);

        setUploadStatus('uploading');
        setUploadError(null);

        try {
            const result = await uploadTrack(formData);
            setUploadedTrack(result);
            setUploadStatus('metadata_submitted');
        } catch (err) {
            const errorMessage = (err as Error).message || "An unknown error occurred during upload.";
            setUploadError(errorMessage);
            setUploadStatus('error');
            console.error(err);
        }
    };


    return (
        <div className="min-h-screen flex justify-center p-6 md:p-10" style={{ backgroundColor: 'transparent' }}>
            <div
                className="w-full max-w-4xl min-h-full p-8 md:p-12 rounded-lg shadow-2xl"
                style={{ backgroundColor: 'transparent' }}
            >
                <h1 className="text-3xl font-bold mb-8" style={STYLES.TEXT_COLOR}>
                    {uploadStatus === 'metadata_submitted' ? 'Upload Complete' :
                        uploadStatus === 'uploading' ? 'Uploading...' :
                            'Upload Track'}
                </h1>

                {/* quality */}
                <p className="text-sm mb-8" style={{ ...STYLES.SECONDARY_COLOR, color: 'var(--color-sc-secondary)' }}>
                    For best quality, use WAV, FLAC, AIFF, or ALAC. The maximum file size is 4GB uncompressed.
                    <a href="#" style={STYLES.ACCENT_COLOR} className="ml-1">Learn more</a>
                </p>

                {/* loading or error genres */}
                {(genresLoading || genresError) && (uploadStatus !== 'uploading' && uploadStatus !== 'metadata_submitted') && (
                    <div className={`p-3 rounded-lg flex items-center space-x-2 mb-6 ${genresError ? 'bg-red-900/50 text-red-400 border border-red-700' : 'bg-blue-900/50 text-blue-400 border border-blue-700'}`}>
                        {genresError ? <AlertTriangle className="w-5 h-5" /> : <Disc className="w-5 h-5 animate-spin" />}
                        <p className="text-sm font-medium">
                            {genresError || "Loading genres list..."}
                        </p>
                    </div>
                )}


                {/* main content block */}
                <div className="w-full">
                    {/* error message */}
                    {uploadStatus === 'error' && uploadError && (
                        <div className="p-3 bg-red-900/50 text-red-400 rounded-lg flex items-center space-x-2 border border-red-700 mb-6">
                            <AlertTriangle className="w-5 h-5" />
                            <p className="text-sm font-medium">Upload Failed: {uploadError}</p>
                        </div>
                    )}

                    {/* select record error */}
                    {(uploadStatus === 'idle' || uploadStatus === 'recording' || uploadStatus === 'file_selected' || uploadStatus === 'error') && uploadStatus !== 'metadata_submitted' && uploadStatus !== 'uploading' ? (
                        <UploadState
                            fileName={fileName}
                            status={uploadStatus}
                            onRemoveFile={handleRemoveFile}
                            onUploadFile={handleFileSelect}
                            onRecordToggle={handleRecordToggle}
                            isRecording={isRecording}
                            fileInputRef={fileInputRef}
                            recordingTime={recordingTime}
                            micError={micError}
                        />
                    ) : null}

                    {/* metadata after file select or record */}
                    {uploadStatus === 'file_selected' && fileName && !isRecording && !genresError && (
                        <MetadataForm
                            fileName={fileName}
                            onSubmit={handleMetadataSubmit}
                            onRemoveFile={handleRemoveFile}
                            genreOptions={genres}
                        />
                    )}

                    {/* upload */}
                    {uploadStatus === 'uploading' && (
                        <div className="p-8 text-center rounded-lg border" style={{ ...STYLES.CARD_BG, ...STYLES.BORDER_SECONDARY }}>
                            <Disc className="w-16 h-16 mx-auto mb-4 animate-spin" style={STYLES.ACCENT_COLOR} />
                            <h2 className="text-2xl font-bold" style={STYLES.TEXT_COLOR}>Uploading Track...</h2>
                            <p className="mt-2" style={STYLES.SECONDARY_COLOR}>Please wait, this may take a moment.</p>
                        </div>
                    )}

                    {/* submit good */}
                    {uploadStatus === 'metadata_submitted' && uploadedTrack && (
                        <div className="p-8 text-center rounded-lg border" style={{ ...STYLES.CARD_BG, ...STYLES.BORDER_SECONDARY }}>
                            <Check className="w-16 h-16 mx-auto mb-4" style={STYLES.ACCENT_COLOR} />
                            <h2 className="text-2xl font-bold" style={STYLES.TEXT_COLOR}>Track Successfully Published!</h2>
                            <p className="mt-2" style={STYLES.SECONDARY_COLOR}>Track **{uploadedTrack.title}** is now available to listeners.</p>
                            <button
                                onClick={handleRemoveFile}
                                className="mt-6 py-2 px-4 rounded-md font-semibold text-white"
                                style={STYLES.ACCENT_BG}
                            >
                                Upload one more
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}