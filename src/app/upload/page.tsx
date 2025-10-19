"use client";

import React, { useState, useRef } from 'react';
import { UploadCloud, Mic, X, ChevronDown, Check, AlertTriangle } from 'lucide-react';

// Styles
const STYLES = {
    ACCENT_BG: { backgroundColor: 'var(--color-sc-accent)' },     // #954BFF
    ACCENT_COLOR: { color: 'var(--color-sc-accent)' },             // #954BFF
    TEXT_COLOR: { color: 'var(--color-sc-text)' },                 // #FFFFFF
    SECONDARY_COLOR: { color: 'var(--color-sc-secondary)' },      // #C4C4C4
    TERTIARY_COLOR: { color: 'var(--color-sc-tertiary)' },         // #888888
    CARD_BG: { backgroundColor: 'var(--color-sc-card-bg)' },       // #1e1e1e
    BORDER_SECONDARY: { borderColor: 'var(--color-sc-secondary)' },// #C4C4C4
};

// --- Component uploading/recording ---
const UploadState = ({ fileName, status, onRemoveFile, onUploadFile, onRecordToggle, isRecording, fileInputRef }) => {

    // Dictophone style
    const micButtonStyles = isRecording
        ? { backgroundColor: '#FF0000', animation: 'pulse 1.5s infinite' }
        : { ...STYLES.CARD_BG, color: 'var(--color-sc-text)' };

    // Icons Dictophone
    const micIconClass = isRecording
        ? 'w-6 h-6 text-white'
        : 'w-6 h-6';

    return (
        <div className="space-y-6">
            {/* File uploading */}
            <div
                className="p-12 border-2 border-dashed flex flex-col items-center rounded-lg"
                style={{ ...STYLES.BACKGROUND, ...STYLES.BORDER_SECONDARY }}
            >
                {/* File chosen */}
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
                    // File choosing
                    <>
                        <UploadCloud className="w-12 h-12 mb-4" style={STYLES.ACCENT_COLOR}/>
                        <p style={STYLES.TERTIARY_COLOR}>Drag and drop audio files to get started.</p>

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
                            className="py-2 px-6 rounded-md font-semibold cursor-pointer"
                            style={{
                                color: '#000000',
                                backgroundColor: 'var(--color-sc-text)'
                            }}
                        >
                            Choose files
                        </label>
                    </>
                )}

            </div>

            {/* Dictophone */}
            <div
                className="w-full p-4 rounded-lg flex items-center justify-between cursor-pointer transition duration-200"
                style={STYLES.CARD_BG}
            >
                <div className="flex items-center space-x-3" onClick={onRecordToggle}>
                    {/* Icon */}
                    <div
                        className={`p-1 rounded-full ${isRecording ? 'bg-red-500' : ''}`}
                        style={isRecording ? {animation: 'pulse 1.5s infinite'} : STYLES.SECONDARY_COLOR}
                    >
                        <Mic className={micIconClass} style={isRecording ? {color: 'white'} : STYLES.SECONDARY_COLOR} />
                    </div>

                    <div className="flex flex-col">
                        <p className="font-semibold" style={STYLES.SECONDARY_COLOR}>
                            Or record with a microphone
                            {isRecording && <span className="text-red-500 ml-2">(Идет запись...)</span>}
                        </p>
                        <p className="text-sm" style={STYLES.TERTIARY_COLOR}>
                            Upload recorded voice memos, updates, news, or intros to new releases
                        </p>
                    </div>
                </div>
                <ChevronDown className="w-5 h-5" style={STYLES.SECONDARY_COLOR} />
            </div>
        </div>
    );
};

// Metadata
const MetadataForm = ({ fileName, onSubmit, onRemoveFile }) => {
    const [formData, setFormData] = useState({ title: '', description: '', genre: 'Hip Hop' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Метаданные отправлены:", formData);
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold" style={STYLES.TEXT_COLOR}>Track info</h2>

            {/* File preview */}
            <div className="p-4 rounded-lg border flex items-center justify-between" style={{ ...STYLES.CARD_BG, ...STYLES.BORDER_SECONDARY }}>
                <div className="flex items-center space-x-3">
                    <Check className="w-6 h-6 text-green-500" />
                    <span className="font-semibold truncate" style={STYLES.TEXT_COLOR}>{fileName}</span>
                </div>
                <button type="button" onClick={onRemoveFile} className="text-sm" style={STYLES.ACCENT_COLOR}>
                    Change/Delete
                </button>
            </div>

            {/* Form */}
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

            <div>
                <label className="block text-sm font-medium mb-1" style={STYLES.SECONDARY_COLOR}>Genres</label>
                <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md border text-white appearance-none cursor-pointer"
                    style={{ ...STYLES.CARD_BG, ...STYLES.BORDER_SECONDARY }}
                >
                    <option style={STYLES.BACKGROUND} value="Hip Hop">Hip Hop</option>
                    <option style={STYLES.BACKGROUND} value="Electronic">Electronic</option>
                    <option style={STYLES.BACKGROUND} value="Rock">Rock</option>
                    <option style={STYLES.BACKGROUND} value="Pop">Pop</option>
                </select>
            </div>

            {/* Кнопка отправки */}
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


// --- ОСНОВНОЙ КОМПОНЕНТ СТРАНИЦЫ ЗАГРУЗКИ ---

export default function UploadPage() {
    const [fileName, setFileName] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'recording' | 'file_selected' | 'metadata_submitted'>('idle');
    const [isRecording, setIsRecording] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- Логика Диктофона (Имитация) ---
    const handleRecordToggle = () => {
        // Если уже есть выбранный файл, сначала нужно его сбросить
        if (fileName && !isRecording) {
            handleRemoveFile();
        }

        if (isRecording) {
            // Остановка записи
            setIsRecording(false);
            setUploadStatus('file_selected');
            setFileName(`Recorded_Audio_Clip_${Date.now()}.mp3`);
        } else {
            // Начало записи
            setIsRecording(true);
            setUploadStatus('recording');
            setFileName(null);
        }
    };

    // --- Логика выбора файла ---
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Сброс состояния записи
            if (isRecording) setIsRecording(false);

            setFileName(file.name);
            setUploadStatus('file_selected');
        }
    };

    // --- Логика удаления файла ---
    const handleRemoveFile = () => {
        setFileName(null);
        setUploadStatus('idle');
        setIsRecording(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Сброс поля ввода файла
        }
    };

    // --- Логика отправки формы метаданных ---
    const handleMetadataSubmit = () => {
        setUploadStatus('metadata_submitted');
        alert(`Трек "${fileName}" успешно опубликован!`);
        // В реальном приложении: навигация на страницу трека
        handleRemoveFile(); // Сброс для следующей загрузки
    };


    return (
        <div className="min-h-screen bg-black flex justify-center p-6 md:p-10">
            <div
                className="w-full max-w-4xl min-h-full p-8 md:p-12 rounded-lg shadow-2xl"
                style={STYLES.BACKGROUND} // Фон #121212
            >
                <h1 className="text-3xl font-bold mb-8" style={STYLES.TEXT_COLOR}>
                    {uploadStatus === 'metadata_submitted' ? 'Uploading done' : 'Upload track'}
                </h1>

                {/* Сообщение о качестве */}
                <p className="text-sm mb-8" style={{ ...STYLES.SECONDARY_COLOR, color: 'var(--color-sc-secondary)' }}>
                    For best quality, use WAV, FLAC, AIFF, or ALAC. The maximum file size is 4GB uncompressed.
                    <a href="#" style={STYLES.ACCENT_COLOR} className="ml-1">Learn more</a>
                </p>

                {/* Главный блок контента */}
                <div className="w-full">

                    {/* СОСТОЯНИЕ 1: ВЫБОР/ЗАПИСЬ */}
                    {uploadStatus === 'idle' || uploadStatus === 'recording' || uploadStatus === 'file_selected' ? (
                        <UploadState
                            fileName={fileName}
                            status={uploadStatus}
                            onRemoveFile={handleRemoveFile}
                            onUploadFile={handleFileSelect}
                            onRecordToggle={handleRecordToggle}
                            isRecording={isRecording}
                            fileInputRef={fileInputRef}
                        />
                    ) : null}

                    {/* СОСТОЯНИЕ 2: ФОРМА МЕТАДАННЫХ (Появляется после выбора файла) */}
                    {uploadStatus === 'file_selected' && fileName && !isRecording && (
                        <MetadataForm
                            fileName={fileName}
                            onSubmit={handleMetadataSubmit}
                            onRemoveFile={handleRemoveFile}
                        />
                    )}

                    {/* СОСТОЯНИЕ 3: Успешная отправка (Просто заглушка) */}
                    {uploadStatus === 'metadata_submitted' && (
                        <div className="p-8 text-center rounded-lg" style={STYLES.CARD_BG}>
                            <Check className="w-16 h-16 mx-auto mb-4" style={STYLES.ACCENT_COLOR} />
                            <h2 className="text-2xl font-bold" style={STYLES.TEXT_COLOR}>Трек успешно опубликован!</h2>
                            <p className="mt-2" style={STYLES.SECONDARY_COLOR}>Ваш трек теперь доступен слушателям.</p>
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