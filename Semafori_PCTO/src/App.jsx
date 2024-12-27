import { useState } from 'react';
import './App.css';

function App() {
  const [indirizzoStudio, setIndirizzoStudio] = useState('');
  const [votoCondotta, setVotoCondotta] = useState('');
  const [attestatoSicurezza, setAttestatoSicurezza] = useState(false);
  const [votiInsufficienti, setVotiInsufficienti] = useState({});
  const [risultato, setRisultato] = useState('');
  const [materieNonIndirizzoInsufficienti, setMaterieNonIndirizzoInsufficienti] = useState('');

  const materieIndirizzo = {
    "LICEO SCIENTIFICO opzione SCIENZE APPLICATE": ["MATEMATICA", "FISICA", "SCIENZE NATURALI"],
    "AMMINISTRAZIONE FINANZA e MARKETING": ["DIRITTO", "INFORMATICA", "ECONOMIA AZ.LE", "ECONOMIA POLITICA"],
    "TURISMO": ["DIRITTO", "SPAGNOLO", "TURISMO", "GEOGRAFIA", "ARTE"],
    "ELETTROTECNICA E AUTOMAZIONE": ["ELETTROTECNICA ed ELETTRONICA", "TECNOLOGIA", "SISTEMI AUTOMATICI"],
    "INFORMATICA": ["INFORMATICA", "TPSIT", "TELECOMUNICAZIONI", "SISTEMI e RETI"],
    "MECCANICA - MECCATRONICA": ["MECCANICA", "TECNOLOGIA", "SISTEMI", "DPOI"],
    "MECCANICA - ENERGIA": ["MECCANICA", "TECNOLOGIA", "SISTEMI", "IEDP"],
  };

  const calcolaRisultato = (e) => {
    e.preventDefault();

    if (Number(votoCondotta) < 8) {
      setRisultato('rosso');
      return;
    }

    if (!attestatoSicurezza) {
      setRisultato('rosso');
      return;
    }

    const materieIndirizzoSelezionato = materieIndirizzo[indirizzoStudio] || [];

    const insufficienzeIndirizzo = materieIndirizzoSelezionato.filter(
      (materia) => votiInsufficienti[materia] === true
    ).length;

    const totaleInsufficienze = 
      insufficienzeIndirizzo + Number(materieNonIndirizzoInsufficienti);

    if (totaleInsufficienze >= 4) {
      setRisultato('rosso');
    } else if (totaleInsufficienze === 3 && insufficienzeIndirizzo >= 2) {
      setRisultato('rosso');
    } else {
      setRisultato('verde');
    }
  };

  const gestisciCambioVoto = (materia, insufficiente) => {
    setVotiInsufficienti((votiPrecedenti) => ({
      ...votiPrecedenti,
      [materia]: insufficiente,
    }));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Calcolo Semaforo dello Studente</h1>
      <form className="form-container" onSubmit={calcolaRisultato}>
        <div className="form-section">
          <h3>Seleziona l&apos;indirizzo di studio</h3>
          <select
            className="input-select"
            value={indirizzoStudio}
            onChange={(e) => setIndirizzoStudio(e.target.value)}
            required
          >
            <option value="">Seleziona indirizzo di studio</option>
            {Object.keys(materieIndirizzo).map((indirizzo, index) => (
              <option key={index} value={indirizzo}>
                {indirizzo}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-section">
            <h3>Inserisci il voto di condotta</h3>
            <input
              type="number"
              className="input-number"
              value={votoCondotta}
              onChange={(e) => {
                const valore = Math.max(0, Math.min(10, Number(e.target.value)));
                setVotoCondotta(valore);
              }}
              placeholder="Voto da 0 a 10"
              min="0"
              max="10"
              required
            />
          </div>

          <div className="form-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={attestatoSicurezza}
                onChange={(e) => setAttestatoSicurezza(e.target.checked)}
              />
              Attestato Sicurezza conseguito
            </label>
          </div>
        </div>

        {indirizzoStudio && (
          <div className="form-section">
            <h3>Seleziona le materie insufficienti</h3>
            <h4>Materie di indirizzo:</h4>
            {materieIndirizzo[indirizzoStudio]?.map((materia) => (
              <div key={materia} className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={votiInsufficienti[materia] || false}
                    onChange={(e) => gestisciCambioVoto(materia, e.target.checked)}
                  />
                  {materia}
                </label>
              </div>
            ))}
            <div className="non-pro-subjects">
              <h4>Materie non di indirizzo:</h4>
              <input
                type="number"
                className="input-number"
                min="0"
                max = "11"
                value={materieNonIndirizzoInsufficienti}
                onChange={(e) => {
                  const valore = Math.max(0, Number(e.target.value));
                  setMaterieNonIndirizzoInsufficienti(valore);
                }}
                placeholder="Numero di materie"
                required
              />
            </div>
          </div>
        )}
        <button className="submit-button" type="submit">
          Calcola Semaforo
        </button>
      </form>

      {risultato && (
        <p className={`result-message ${risultato}`}>
          Lo studente ha il semaforo: {risultato.toUpperCase()}
        </p>
      )}
    </div>
  );
}

export default App;