import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';

// Azure Speech Service Credentials
const speechConfig = speechsdk.SpeechConfig.fromSubscription(
  "BRSNZiVwft5xHRt7mDe13KHWiseJRlTKSzYraMvoHFnuywfJ37gPJQQJ99BCACqBBLyXJ3w3AAAYACOGCVA8",
  "southeastasia"
);

speechConfig.speechRecognitionLanguage = 'en-US';

export const startRecording = (
  onRecognized: (text: string) => void,
  onProcessing: (status: boolean) => void
): { stop: () => void } => {
  const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

  recognizer.recognizing = (_, event) => {
    // This could be used to provide interim results
    console.log(`Recognizing: ${event.result.text}`);
  };

  recognizer.recognized = (_, event) => {
    if (event.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
      const text = event.result.text;
      onRecognized(text);
    }
  };

  recognizer.canceled = (_, event) => {
    if (event.reason === speechsdk.CancellationReason.Error) {
      console.error(`Error: ${event.errorDetails}`);
    }
    onProcessing(false);
  };

  recognizer.sessionStopped = () => {
    onProcessing(false);
    recognizer.stopContinuousRecognitionAsync();
  };

  onProcessing(true);
  recognizer.startContinuousRecognitionAsync();

  return {
    stop: () => {
      recognizer.stopContinuousRecognitionAsync();
      onProcessing(false);
    },
  };
};

export const transcribeAudioFile = async (
  audioFile: File,
  onProgress: (progress: number) => void,
  onComplete: (text: string) => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    // For simplicity, we're showing the file-based transcription
    // In a real app, you would upload the file to your server or Azure Blob Storage
    // Then use the Azure Speech SDK's fromWavFileInput method
    
    // This is a simplified example
    onProgress(10);
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      if (!event.target?.result) {
        onError('Error reading file');
        return;
      }
      
      onProgress(50);
      
      // In a real implementation, you would send this to your backend service
      // where you would use the Azure SDK to transcribe it
      // For demo purposes, we'll simulate a successful transcription
      
      setTimeout(() => {
        onProgress(100);
        onComplete("This is the transcribed text from your audio file. In a real implementation, this would be the actual transcription from Azure Speech Service.");
      }, 2000);
    };
    
    reader.onerror = () => {
      onError('Error reading file');
    };
    
    reader.readAsArrayBuffer(audioFile);
  } catch (error) {
    onError(`Error processing audio: ${error}`);
  }
}; 