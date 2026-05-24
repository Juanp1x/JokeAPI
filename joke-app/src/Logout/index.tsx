"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function LogoutPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  // Obtener el usuario actual al montar el componente
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setUserName(data.user.email);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signOut();

    setLoading(false);

    if (error) {
      setMessageType("error");
      setMessage("❌ Error al cerrar sesión: " + error.message);
      return;
    }

    setDone(true);
    setMessageType("success");
    setMessage("✅ Sesión cerrada correctamente. ¡Hasta pronto!");
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
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.09) 0%, transparent 70%);
          top: -150px;
          right: -50px;
          pointer-events: none;
        }

        .auth-root::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.07) 0%, transparent 70%);
          bottom: -100px;
          left: -100px;
          pointer-events: none;
        }

        .auth-card {
          width: 100%;
          max-width: 400px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 48px 40px;
          backdrop-filter: blur(20px);
          position: relative;
          z-index: 1;
          text-align: center;
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .logout-icon-wrap {
          width: 72px;
          height: 72px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-size: 30px;
          animation: iconPop 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }

        .logout-icon-wrap.done {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.25);
        }

        @keyframes iconPop {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }

        .auth-title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #f8fafc;
          margin: 0 0 10px;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .auth-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          margin: 0 0 12px;
          font-weight: 300;
          line-height: 1.6;
        }

        .user-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 32px;
        }

        .user-chip::before {
          content: '';
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .btn-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .auth-btn-danger {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
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

        .auth-btn-danger:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);
        }

        .auth-btn-danger:active:not(:disabled) {
          transform: translateY(0);
        }

        .auth-btn-danger:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-btn-ghost {
          width: 100%;
          padding: 13px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: rgba(255,255,255,0.5);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: block;
          box-sizing: border-box;
        }

        .auth-btn-ghost:hover {
          border-color: rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.03);
        }

        .auth-btn-green {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          text-decoration: none;
          display: block;
          box-sizing: border-box;
        }

        .auth-btn-green:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(34, 197, 94, 0.3);
        }

        .btn-loader {
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
      `}</style>

      <div className="auth-root">
        <div className="auth-card">
          <div className={`logout-icon-wrap ${done ? "done" : ""}`}>
            {done ? "👋" : "🔐"}
          </div>

          {!done ? (
            <>
              <h1 className="auth-title">Cerrar sesión</h1>
              <p className="auth-subtitle">
                ¿Seguro que quieres salir?<br />Tu sesión actual se cerrará.
              </p>

              {userName && (
                <div className="user-chip">{userName}</div>
              )}

              <div className="btn-group">
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="auth-btn-danger"
                >
                  {loading && <span className="btn-loader" />}
                  {loading ? "Cerrando sesión..." : "Sí, cerrar sesión"}
                </button>
                <a href="/Home" className="auth-btn-ghost">
                  Cancelar, volver al inicio
                </a>
              </div>
            </>
          ) : (
            <>
              <h1 className="auth-title">¡Hasta pronto!</h1>
              <p className="auth-subtitle">
                Tu sesión fue cerrada correctamente.<br />
                Puedes volver cuando quieras.
              </p>
              <div className="btn-group" style={{ marginTop: "24px" }}>
                <a href="/login" className="auth-btn-green">
                  Iniciar sesión de nuevo
                </a>
                <a href="/Registro" className="auth-btn-ghost">
                  Crear nueva cuenta
                </a>
              </div>
            </>
          )}

          {message && (
            <div className={`auth-message ${messageType}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}