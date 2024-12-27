import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js';
import './App.css';
import { availableClasses } from './config/classes';

// Configurazione necessaria per react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

function App() {
  const [selectedClass, setSelectedClass] = useState('');

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const getPdfUrl = () => {
    return selectedClass ? `/pdf/${selectedClass}.pdf` : null;
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Visualizzatore Orario Scolastico</h1>
      
      <div className="form-container">
        <div className="form-section">
          <label htmlFor="class-select">Seleziona la classe:</label>
          <select 
            id="class-select"
            className="input-select"
            value={selectedClass}
            onChange={handleClassChange}
          >
            <option value="">Scegli una classe</option>
            {availableClasses.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>

        {selectedClass && (
          <div className="pdf-container">
            <Document
              file={getPdfUrl()}
              error="Si è verificato un errore nel caricamento del PDF"
              loading="Caricamento del PDF in corso..."
            >
              <Page pageNumber={1} />
            </Document>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;