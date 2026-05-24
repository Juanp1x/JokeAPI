"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function RegisterPage() {
  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setLoading(false);
      setMessageType("error");
      setMessage("❌ Error en registro: " + authError.message);
      return;
    }

    const userId = authData.user?.id;
    if (!userId) {
      setLoading(false);
      setMessageType("error");
      setMessage("⚠️ No se pudo obtener el ID del usuario.");
      return;
    }

    const { error: insertError } = await supabase
      .from("estudiantes")
      .insert([
        {
          id: userId,
          nombre,
          correo: email,
          telefono,
        },
      ]);

    setLoading(false);

    if (insertError) {
      setMessageType("error");
      setMessage("⚠️ Usuario autenticado pero no guardado: " + insertError.message);
      return;
    }

    setMessageType("success");
    setMessage("✅ Registro exitoso. Revisa tu correo para confirmar tu cuenta.");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .auth-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .auth-root::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%);
          top: -200px;
          left: -100px;
          pointer-events: none;
        }

        .auth-root::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
          bottom: -100px;
          right: -100px;
          pointer-events: none;
        }

        .auth-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 48px 40px;
          backdrop-filter: blur(20px);
          position: relative;
          z-index: 1;
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .auth-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(236, 72, 153, 0.12);
          border: 1px solid rgba(236, 72, 153, 0.28);
          color: #f9a8d4;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
          margin-bottom: 20px;
        }

        .auth-badge::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #ec4899;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .auth-title {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #f8fafc;
          margin: 0 0 6px;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .auth-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          margin: 0 0 36px;
          font-weight: 300;
        }

        .auth-subtitle a {
          color: #f472b6;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .auth-subtitle a:hover {
          color: #f9a8d4;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 24px;
        }

        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 13px 16px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #f1f5f9;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .field-input::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .field-input:focus {
          border-color: rgba(236, 72, 153, 0.5);
          background: rgba(236, 72, 153, 0.04);
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
        }

        .auth-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #db2777 0%, #ec4899 50%, #f472b6 100%);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
        }

        .auth-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(236, 72, 153, 0.35);
        }

        .auth-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-btn .btn-loader {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .auth-message {
          margin-top: 18px;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
          text-align: center;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .auth-message.success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.25);
          color: #86efac;
        }

        .auth-message.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #fca5a5;
        }

        .step-indicator {
          display: flex;
          gap: 6px;
          margin-bottom: 28px;
        }

        .step-dot {
          height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,0.1);
          flex: 1;
          transition: background 0.3s;
        }

        .step-dot.active {
          background: #ec4899;
        }
      `}</style>

      <div className="auth-root">
        <div className="auth-card">
          <div className="auth-badge">Nuevo estudiante</div>

          <h1 className="auth-title">Crea tu<br />cuenta</h1>
          <p className="auth-subtitle">
            ¿Ya tienes cuenta?{" "}
            <a href="/login">Inicia sesión</a>
          </p>

          <div className="step-indicator">
            <div className="step-dot active" />
            <div className="step-dot active" />
            <div className="step-dot active" />
            <div className="step-dot" />
          </div>

          <form onSubmit={handleRegister}>
            <div className="field-group">
              <div>
                <label className="field-label">Nombre completo</label>
                <input
                  type="text"
                  placeholder="Juan Pérez"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="field-input"
                />
              </div>
              <div>
                <label className="field-label">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="field-input"
                />
              </div>
              <div>
                <label className="field-label">Teléfono</label>
                <input
                  type="tel"
                  placeholder="+57 300 000 0000"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="field-input"
                />
              </div>
              <div>
                <label className="field-label">Contraseña</label>
                <input
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="field-input"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="auth-btn">
              {loading && <span className="btn-loader" />}
              {loading ? "Registrando..." : "Crear cuenta"}
            </button>
          </form>

          {message && (
            <div className={`auth-message ${messageType}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}// HAGALO CON SUPABASE