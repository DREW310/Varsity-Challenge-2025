import React, { useState, useRef } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Tabs, 
  Tab, 
  CircularProgress,
  Fade,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
  Snackbar,
  Chip
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';

import { useFinancial } from '../../context/FinancialContext';
import { startRecording, transcribeAudioFile } from '../../services/speechService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`communication-tabpanel-${index}`}
      aria-labelledby={`communication-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Communication: React.FC = () => {
  const { addIntent, loading: processingIntent, intents } = useFinancial();
  const [tabValue, setTabValue] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [recordingState, setRecordingState] = useState<{
    isRecording: boolean;
    recordedText: string;
  }>({
    isRecording: false,
    recordedText: '',
  });
  const stopRecordingRef = useRef<{ stop: () => void } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState<{
    uploading: boolean;
    transcribedText: string;
    error: string;
  }>({
    uploading: false,
    transcribedText: '',
    error: '',
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;
    
    try {
      await addIntent(textInput);
      setTextInput('');
      setSnackbar({
        open: true,
        message: 'Communication analyzed successfully!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to analyze communication.',
        severity: 'error',
      });
    }
  };

  const handleStartRecording = () => {
    setRecordingState({
      isRecording: true,
      recordedText: '',
    });

    stopRecordingRef.current = startRecording(
      (text) => {
        setRecordingState((prev) => ({
          ...prev,
          recordedText: text,
        }));
      },
      (status) => {
        if (!status) {
          setRecordingState((prev) => ({
            ...prev,
            isRecording: false,
          }));
        }
      }
    );
  };

  const handleStopRecording = () => {
    if (stopRecordingRef.current) {
      stopRecordingRef.current.stop();
      stopRecordingRef.current = null;
    }
  };

  const handleRecordingSubmit = async () => {
    if (!recordingState.recordedText.trim()) return;
    
    try {
      await addIntent(recordingState.recordedText);
      setRecordingState({
        isRecording: false,
        recordedText: '',
      });
      setSnackbar({
        open: true,
        message: 'Voice communication analyzed successfully!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to analyze voice communication.',
        severity: 'error',
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadState({
      uploading: true,
      transcribedText: '',
      error: '',
    });
    setUploadProgress(0);

    try {
      await transcribeAudioFile(
        file,
        (progress) => {
          setUploadProgress(progress);
        },
        (text) => {
          setUploadState({
            uploading: false,
            transcribedText: text,
            error: '',
          });
          setUploadProgress(100);
        },
        (error) => {
          setUploadState({
            uploading: false,
            transcribedText: '',
            error,
          });
          setUploadProgress(0);
          setSnackbar({
            open: true,
            message: `Error processing audio file: ${error}`,
            severity: 'error',
          });
        }
      );
    } catch (error) {
      setUploadState({
        uploading: false,
        transcribedText: '',
        error: 'Failed to process audio file',
      });
      setUploadProgress(0);
      setSnackbar({
        open: true,
        message: 'Failed to process audio file',
        severity: 'error',
      });
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadState.transcribedText.trim()) return;
    
    try {
      await addIntent(uploadState.transcribedText);
      setUploadState({
        uploading: false,
        transcribedText: '',
        error: '',
      });
      setSnackbar({
        open: true,
        message: 'Uploaded communication analyzed successfully!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to analyze uploaded communication.',
        severity: 'error',
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleClearTranscription = () => {
    setUploadState({
      uploading: false,
      transcribedText: '',
      error: '',
    });
    setUploadProgress(0);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Communication Analysis
        </Typography>
        <Typography color="text.secondary" variant="body1">
          Add financial communications to detect intents and generate insights
        </Typography>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          mb: 4
        }}
      >
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="fullWidth"
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': {
              py: 2
            }
          }}
        >
          <Tab label="Text Input" />
          <Tab label="Voice Memo" />
          <Tab label="Audio Upload" />
        </Tabs>

        {/* Text Input Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Enter financial communication"
              multiline
              rows={6}
              value={textInput}
              onChange={handleTextInputChange}
              fullWidth
              placeholder="Example: I'm concerned about our cashflow situation this quarter. We need to reduce expenses and improve our collections process."
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SendIcon />}
                onClick={handleTextSubmit}
                disabled={!textInput.trim() || processingIntent}
                sx={{ borderRadius: 2, px: 3 }}
              >
                {processingIntent ? <CircularProgress size={24} color="inherit" /> : 'Analyze'}
              </Button>
            </Box>
          </Box>
        </TabPanel>

        {/* Voice Recording Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Paper
              elevation={0}
              sx={{
                width: '100%',
                p: 3,
                borderRadius: 3,
                backgroundColor: recordingState.isRecording ? 'rgba(244, 67, 54, 0.1)' : 'rgba(33, 150, 243, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: 1,
                borderColor: recordingState.isRecording ? 'error.main' : 'primary.main',
                borderStyle: 'dashed',
              }}
            >
              <Box sx={{ mb: 2 }}>
                {recordingState.isRecording ? (
                  <IconButton
                    onClick={handleStopRecording}
                    sx={{
                      backgroundColor: 'error.main',
                      color: 'white',
                      p: 3,
                      '&:hover': {
                        backgroundColor: 'error.dark',
                      },
                    }}
                  >
                    <StopIcon fontSize="large" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={handleStartRecording}
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      p: 3,
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }}
                  >
                    <MicIcon fontSize="large" />
                  </IconButton>
                )}
              </Box>
              <Typography variant="h6" align="center" gutterBottom>
                {recordingState.isRecording ? 'Recording in progress...' : 'Press to start recording'}
              </Typography>
              <Typography color="text.secondary" variant="body2" align="center">
                {recordingState.isRecording 
                  ? 'Speak clearly and talk about your financial concerns or plans' 
                  : 'You can record your voice to analyze financial intents'
                }
              </Typography>
            </Paper>

            {recordingState.recordedText && (
              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                }}
              >
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Transcription:
                </Typography>
                <Typography variant="body1" paragraph>
                  {recordingState.recordedText}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SendIcon />}
                    onClick={handleRecordingSubmit}
                    disabled={!recordingState.recordedText.trim() || processingIntent}
                    sx={{ borderRadius: 2, px: 3 }}
                  >
                    {processingIntent ? <CircularProgress size={24} color="inherit" /> : 'Analyze'}
                  </Button>
                </Box>
              </Paper>
            )}
          </Box>
        </TabPanel>

        {/* Audio Upload Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper
              elevation={0}
              sx={{
                width: '100%',
                p: 3,
                borderRadius: 3,
                backgroundColor: 'rgba(33, 150, 243, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: 1,
                borderColor: 'primary.main',
                borderStyle: 'dashed',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <IconButton
                  component="label"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    p: 3,
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                  disabled={uploadState.uploading}
                >
                  <input
                    type="file"
                    accept="audio/*"
                    hidden
                    onChange={handleFileUpload}
                  />
                  <UploadFileIcon fontSize="large" />
                </IconButton>
              </Box>
              <Typography variant="h6" align="center" gutterBottom>
                Upload Audio File
              </Typography>
              <Typography color="text.secondary" variant="body2" align="center">
                Select an audio file containing financial communication
              </Typography>
              
              {uploadState.uploading && (
                <Box sx={{ width: '100%', mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={uploadProgress} 
                    size={24}
                    sx={{ color: 'primary.main' }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Processing audio ({uploadProgress}%)...
                  </Typography>
                </Box>
              )}
            </Paper>

            {uploadState.transcribedText && (
              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Transcription:
                  </Typography>
                  <IconButton size="small" onClick={handleClearTranscription}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="body1" paragraph>
                  {uploadState.transcribedText}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SendIcon />}
                    onClick={handleUploadSubmit}
                    disabled={!uploadState.transcribedText.trim() || processingIntent}
                    sx={{ borderRadius: 2, px: 3 }}
                  >
                    {processingIntent ? <CircularProgress size={24} color="inherit" /> : 'Analyze'}
                  </Button>
                </Box>
              </Paper>
            )}

            {uploadState.error && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {uploadState.error}
              </Alert>
            )}
          </Box>
        </TabPanel>
      </Paper>

      {/* Analysis Result Section */}
      {intents.length > 0 && (
        <Paper sx={{ mt: 4, p: 3, borderRadius: 3, backgroundColor: 'background.paper', border: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom>
            Analysis Result
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Original Text:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {intents[intents.length - 1].financial_intents?.relevant_details || intents[intents.length - 1].text}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Detected Intents:
            </Typography>
            {(intents[intents.length - 1].financial_intents?.detected_intents || []).map((intent: any, idx: number) => (
              <Box key={idx} sx={{ mb: 1, pl: 2, borderLeft: '2px solid #eee' }}>
                <Typography variant="body2"><strong>Description:</strong> {intent.description}</Typography>
                <Typography variant="body2"><strong>Urgency Level:</strong> {intent.urgency_level}</Typography>
                <Typography variant="body2"><strong>Urgency Score:</strong> {intent.urgency_score}</Typography>
                <Typography variant="body2"><strong>Timeline:</strong> {intent.timeline}</Typography>
                <Typography variant="body2"><strong>Impact:</strong> {intent.impact}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Confidence Score:
            </Typography>
            <Typography variant="body2">{intents[intents.length - 1].financial_intents?.confidence_score}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Financial Topics:
            </Typography>
            <Typography variant="body2">{(intents[intents.length - 1].financial_intents?.financial_topics || []).join(', ')}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Action Items:
            </Typography>
            <Typography variant="body2">{(intents[intents.length - 1].financial_intents?.action_items || []).join(', ')}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Expenditures:
            </Typography>
            {(intents[intents.length - 1].financial_intents?.expenditures || []).map((exp: any, idx: number) => (
              <Typography key={idx} variant="body2">{JSON.stringify(exp)}</Typography>
            ))}
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Revenue Actions:
            </Typography>
            {(intents[intents.length - 1].financial_intents?.revenue_actions || []).map((rev: any, idx: number) => (
              <Typography key={idx} variant="body2">{JSON.stringify(rev)}</Typography>
            ))}
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Alerts:
            </Typography>
            {(intents[intents.length - 1].financial_intents?.alerts || []).map((alert: any, idx: number) => (
              <Typography key={idx} variant="body2">{JSON.stringify(alert)}</Typography>
            ))}
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Suggestions:
            </Typography>
            {(intents[intents.length - 1].financial_intents?.suggestions || []).map((sugg: any, idx: number) => (
              <Typography key={idx} variant="body2">{JSON.stringify(sugg)}</Typography>
            ))}
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Urgency Analysis:
            </Typography>
            <Typography variant="body2">{JSON.stringify(intents[intents.length - 1].urgency_analysis)}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Sentiment:
            </Typography>
            <Chip
              label={(
                typeof intents[intents.length - 1].urgency_analysis?.sentiment === 'string'
                  ? intents[intents.length - 1].urgency_analysis.sentiment
                  : intents[intents.length - 1].urgency_analysis?.sentiment?.label || 'N/A'
              ).toLowerCase()}
              color={(() => {
                const val = typeof intents[intents.length - 1].urgency_analysis?.sentiment === 'string'
                  ? intents[intents.length - 1].urgency_analysis.sentiment.toLowerCase()
                  : intents[intents.length - 1].urgency_analysis?.sentiment?.label?.toLowerCase();
                if (val === 'positive') return 'success';
                if (val === 'negative') return 'error';
                return 'default';
              })()}
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
        </Paper>
      )}

      {/* Tips Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: 'rgba(76, 175, 80, 0.05)',
          border: 1,
          borderColor: 'success.light',
          borderStyle: 'solid',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>
          Tips for Better Analysis
        </Typography>
        <List dense disablePadding>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText
              primary="Be specific about financial concerns or goals"
              primaryTypographyProps={{ color: 'text.primary', variant: 'body2' }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText
              primary="Mention specific areas like cash flow, expenses, revenue, or budget planning"
              primaryTypographyProps={{ color: 'text.primary', variant: 'body2' }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText
              primary="Include timeframes when discussing financial matters (this quarter, next year, etc.)"
              primaryTypographyProps={{ color: 'text.primary', variant: 'body2' }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText
              primary="For voice input, speak clearly and at a moderate pace"
              primaryTypographyProps={{ color: 'text.primary', variant: 'body2' }}
            />
          </ListItem>
        </List>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Communication; 