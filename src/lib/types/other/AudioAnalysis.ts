/**
 * Read more here:
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-analysis
 */
export interface AudioAnalysis {
	meta: AudioAnalysisMeta;
	track: AudioAnalysisTrack;
	bars: AudioAnalysisBar[];
	beats: AudioAnalysisBeat[];
	sections: AudioAnalysisSection[];
	segments: AudioAnalysisSegment[];
	tatums: AudioAnalysisTatums[];
}

export interface AudioAnalysisMeta {
	analyzer_version: string;
	platform: string;
	detailed_status: string;
	status_code: number;
	timestamp: number;
	analysis_time: number;
	input_process: string;
}

export interface AudioAnalysisTrack {
	num_samples: number;
	duration: number;
	offset_seconds: 0;
	window_seconds: 0;
	analysis_sample_rate: number;
	analysis_channels: number;
	end_of_fade_in: 0.0;
	start_of_fade_out: number;
	loudness: number;
	tempo: number;
	tempo_confidence: number;
	time_signature: number;
	time_signature_confidence: number;
	key: number;
	key_confidence: number;
	mode: number;
	mode_confidence: number;
	codestring: string;
	code_version: number;
	echoprintstring: string;
	echoprint_version: number;
	synchstring: string;
	synch_version: number;
	rhythmstring: string;
	rhythm_version: number;
}

export interface AudioAnalysisBar {
	start: number;
	duration: number;
	confidence: number;
}

export type AudioAnalysisBeat = AudioAnalysisBar[];

export interface AudioAnalysisSection extends AudioAnalysisBar {
	loudness: number;
	tempo: number;
	tempo_confidence: number;
	key: number;
	key_confidence: number;
	mode: number;
	mode_confidence: number;
	time_signature: number;
	time_signature_confidence: number;
}

export interface AudioAnalysisSegment extends AudioAnalysisBar {
	loudness_start: number;
	loudness_max: number;
	loudness_max_time: number;
	loudness_end: number;
	loudness_pitches: number[];
	timbre: number[];
}

export type AudioAnalysisTatums = AudioAnalysisBar[];
