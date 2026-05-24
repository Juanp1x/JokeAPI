"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function RegisterPage() {
  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const navigate = useNavigate();

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      setMessageType("error");
      setMessage("❌ Error en registro: " + error.message);
      return;
    }

    setLoading(false);

    setMessageType("success");
    setMessage("✅ Registro exitoso. Redirigiendo al login...");

    setTimeout(() => navigate("/login"), 2000);
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
          background: radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%);
          top: -200px;
          left: -100px;
          pointer-events: none;
        }

        .auth-root::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
          bottom: -100px;
          right: -100px;
          pointer-events: none;
        }

        .auth-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 48px 40px;
          backdrop-filter: blur(20px);
          position: relative;
          z-index: 1;
        }

        .auth-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(236,72,153,0.12);
          border: 1px solid rgba(236,72,153,0.28);
          color: #f9a8d4;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
          margin-bottom: 20px;
        }

        .auth-title {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #f8fafc;
          margin: 0 0 6px;
          line-height: 1.15;
        }

        .auth-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          margin: 0 0 36px;
        }

        .auth-subtitle a {
          color: #f472b6;
          text-decoration: none;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 24px;
        }

        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          margin-bottom: 6px;
        }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 13px 16px;
          font-size: 14px;
          color: #f1f5f9;
          outline: none;
          box-sizing: border-box;
        }

        .field-input::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .field-input:focus {
          border-color: rgba(236,72,153,0.5);
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
          cursor: pointer;
        }

        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-message {
          margin-top: 18px;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
          text-align: center;
        }

        .auth-message.success {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25);
          color: #86efac;
        }

        .auth-message.error {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #fca5a5;
        }
      `}</style>

      <div className="auth-root">
        <div className="auth-card">
          <div className="auth-badge">
            Nuevo usuario
          </div>

          <h1 className="auth-title">
            Crear cuenta
          </h1>

          <p className="auth-subtitle">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login">
              Inicia sesión
            </Link>
          </p>

          <form onSubmit={handleRegister}>
            <div className="field-group">

              <div>
                <label className="field-label">
                  Nombre
                </label>

                <input
                  type="text"
                  placeholder="Juan"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="field-input"
                />
              </div>

              <div>
                <label className="field-label">
                  Correo
                </label>

                <input
                  type="email"
                  placeholder="correo@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="field-input"
                />
              </div>

              <div>
                <label className="field-label">
                  Teléfono
                </label>

                <input
                  type="tel"
                  placeholder="3000000000"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="field-input"
                />
              </div>

              <div>
                <label className="field-label">
                  Contraseña
                </label>

                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="field-input"
                />
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-btn"
            >
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
}