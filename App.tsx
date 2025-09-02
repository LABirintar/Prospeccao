
import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PainPointsSection from './components/PainPointsSection';
import CustomPainPoints from './components/CustomPainPoints';
import DiagnosticReport from './components/DiagnosticReport';
import SocialProof from './components/SocialProof';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

// !!! IMPORTANT !!!
// Replace this with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SHEET_WEB_APP_URL';

const App: React.FC = () => {
  const [selectedPainPointIds, setSelectedPainPointIds] = useState<string[]>([]);
  const [selectedDetails, setSelectedDetails] = useState<Record<string, string[]>>({});
  const [customPainText, setCustomPainText] = useState('');
  const [userName, setUserName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [reportGenerated, setReportGenerated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePainPointSelect = useCallback((id: string) => {
    setSelectedPainPointIds(prev => 
      prev.includes(id)
        ? prev.filter(pid => pid !== id)
        : [...prev, id]
    );
    // Also clear details when deselecting a category
    if (selectedPainPointIds.includes(id)) {
      setSelectedDetails(prev => {
        const newDetails = { ...prev };
        delete newDetails[id];
        return newDetails;
      });
    }
  }, [selectedPainPointIds]);
  
  const handleDetailSelect = useCallback((painPointId: string, detail: string) => {
    setSelectedDetails(prev => {
      const currentDetails = prev[painPointId] || [];
      const newDetails = currentDetails.includes(detail)
        ? currentDetails.filter(d => d !== detail)
        : [...currentDetails, detail];
      return { ...prev, [painPointId]: newDetails };
    });
  }, []);

  const handleGenerateReport = useCallback(async () => {
    const hasSelectedPoints = selectedPainPointIds.length > 0 || Object.values(selectedDetails).some(d => d.length > 0);
    if (!hasSelectedPoints && customPainText.trim() === '') {
      alert('Por favor, selecione ao menos um desafio ou descreva sua dor para gerar o relatório.');
      return;
    }
    if (userName.trim() === '' || schoolName.trim() === '') {
        alert('Por favor, preencha seu nome e o nome da escola.');
        return;
    }
    if (whatsAppNumber.trim().length < 10) {
        alert('Por favor, insira um número de WhatsApp válido para receber o relatório.');
        return;
    }

    setIsSubmitting(true);

    const submissionData = {
      timestamp: new Date().toISOString(),
      userName: userName,
      schoolName: schoolName,
      whatsAppNumber: whatsAppNumber,
      selectedCategories: selectedPainPointIds.join(', '),
      selectedDetails: JSON.stringify(selectedDetails, null, 2),
      customPain: customPainText,
    };

    try {
      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SHEET_WEB_APP_URL') {
        console.warn("Google Apps Script URL is not set. Skipping submission.");
        // Simulate a successful submission for local testing
        console.log("Submission Data (local simulation):", submissionData);
      } else {
        // We are using text/plain for the request to avoid CORS preflight issues with simple triggers
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', 
          headers: {
            // Note: Content-Type is often omitted with no-cors to avoid preflight
            // but we send it as text/plain and parse it in Apps Script
          },
          body: JSON.stringify(submissionData),
        });
        // no-cors mode means we can't read the response, so we optimistically proceed
        console.log('Submission attempt finished.');
      }
      
      setReportGenerated(true);
      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (error) {
      console.error('Error submitting to Google Sheet:', error);
      alert('Houve um erro ao enviar seu diagnóstico. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedPainPointIds, selectedDetails, customPainText, userName, schoolName, whatsAppNumber]);


  return (
    <div className="bg-brand-bg-light min-h-screen text-brand-text">
      <Header />
      <main>
        <Hero />
        {!reportGenerated ? (
          <>
            <PainPointsSection 
              selectedPainPointIds={selectedPainPointIds} 
              onSelectPainPoint={handlePainPointSelect}
              selectedDetails={selectedDetails}
              onSelectDetail={handleDetailSelect}
            />
            <CustomPainPoints
              customPainText={customPainText}
              onCustomPainChange={setCustomPainText}
              userName={userName}
              onUserNameChange={setUserName}
              schoolName={schoolName}
              onSchoolNameChange={setSchoolName}
              whatsAppNumber={whatsAppNumber}
              onWhatsAppChange={setWhatsAppNumber}
              onGenerateReport={handleGenerateReport}
              isSubmitting={isSubmitting}
            />
          </>
        ) : (
          <div ref={reportRef}>
            <DiagnosticReport 
              selectedPainPointIds={selectedPainPointIds}
              selectedDetails={selectedDetails}
              customPainText={customPainText}
              userName={userName}
              schoolName={schoolName}
              whatsAppNumber={whatsAppNumber}
            />
            <SocialProof />
            <CallToAction />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
