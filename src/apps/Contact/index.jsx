/**
 * Application: Contact
 * 
 * Formulaire de contact style email XP
 */
import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { MenuBar, useZoom, getZoomStyle } from '../../components/ProjectLayout';

const EMAILJS_SERVICE_ID = 'service_6i7i8an';
const EMAILJS_TEMPLATE_ID = 'template_tv9399m';
const EMAILJS_PUBLIC_KEY = '3gmM9AHo9zW51AdS_';

export const config = {
  id: 'contact',
  name: 'Contact',
  icon: '/icons/message.ico',
  defaultWidth: 600,
  defaultHeight: 500,
};

export const Component = () => {
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Anti-bot honeypot check
    if (formRef.current.company.value) {
      setSending(false);
      return;
    }
    
    setSending(true);
    setStatus({ type: '', message: '' });

    emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formRef.current,
      EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setStatus({ type: 'success', message: 'Message envoyé' });
      setFormData({ name: '', email: '', message: '' });
      setSending(false);
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      setStatus({ type: 'error', message: 'Erreur lors de l\'envoi. Réessayez ou contactez-moi directement par email.' });
      setSending(false);
    });
  };

  return (
    <div className="xp-app">
      {/* Menu Bar avec Zoom */}
      <MenuBar 
        zoom={zoom} 
        onZoomIn={zoomIn} 
        onZoomOut={zoomOut} 
        onReset={resetZoom}
      />

      {/* Toolbar */}
      <div className="xp-toolbar">
        <button className="xp-toolbar-btn" type="submit" form="contact-form">
          Envoyer
        </button>
      </div>

      {/* Address Bar */}
      <div className="xp-addressbar">
        <span className="xp-addressbar-label">Adresse</span>
        <div className="xp-addressbar-input">
          <img src="/icons/message.ico" alt="" className="w-4 h-4" />
          <span>C:\Utilisateurs\Lucas\Contact</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="xp-content xp-content-zoomable" style={getZoomStyle(zoom)}>
        {/* Sidebar */}
        <div className="xp-sidebar">
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header">
              <img src="/icons/message.ico" alt="" className="w-4 h-4" />
              Contact direct
            </div>
            <div className="xp-sidebar-content">
              <a href="mailto:lucascontrerashodapp@gmail.com" className="xp-sidebar-link">
                <img src="/icons/message.ico" alt="" className="w-3 h-3" />
                Email
              </a>
              <a href="https://linkedin.com/in/lucas-contreras-hodapp" target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
                <img src="/icons/link.png" alt="" className="w-3 h-3" />
                LinkedIn
              </a>
              <a href="https://github.com/Por-Tra" target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
                <img src="/icons/git.png" alt="" className="w-3 h-3" />
                GitHub
              </a>
            </div>
          </div>

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header">
              <img src="/icons/info.png" alt="" className="w-4 h-4" />
              Informations
            </div>
            <div className="xp-sidebar-content">
              <p className="xp-sidebar-info"><strong>Lieu:</strong></p>
              <p className="xp-sidebar-info-small">Le Puy-en-Velay, France</p>
              <p className="xp-sidebar-info"><strong>Disponibilité:</strong></p>
              <p className="xp-sidebar-info-small">Ouvert aux opportunités</p>
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className="xp-content-main">
          {/* Header */}
          <div className="xp-content-header">
            <img src="/icons/message.ico" alt="" className="w-12 h-12" />
            <div>
              <h1 className="xp-title">Me Contacter</h1>
              <p className="xp-subtitle">Envoyez-moi un message</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="xp-box xp-box-blue">
            <div className="xp-box-header">
              <img src="/icons/message.ico" alt="" className="w-4 h-4" />
              Nouveau Message
            </div>
            <div className="xp-box-content">
              <form id="contact-form" ref={formRef} onSubmit={handleSubmit} className="space-y-3">
                {/* Honeypot anti-bot field */}
                <input
                  type="text"
                  name="company"
                  tabIndex="-1"
                  autoComplete="off"
                  style={{ display: 'none' }}
                />
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-16">De :</label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom"
                    className="flex-1 bg-white border border-[#7f9db9] px-2 py-1 text-xs focus:outline-none focus:border-[#0058e6]"
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-16">Email :</label>
                  <input
                    type="email"
                    name="reply_to"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="flex-1 bg-white border border-[#7f9db9] px-2 py-1 text-xs focus:outline-none focus:border-[#0058e6]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-medium block mb-1">Message :</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Écrivez votre message ici..."
                    className="w-full h-28 bg-white border border-[#7f9db9] px-2 py-1 text-xs focus:outline-none focus:border-[#0058e6] resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="submit" className="xp-btn" disabled={sending}>
                    <img src="/icons/message.ico" alt="" className="w-3 h-3" />
                    {sending ? 'Envoi...' : 'Envoyer'}
                  </button>
                </div>
              </form>

              {status.type === 'success' && (
                <div className="mt-3 bg-[#dff0d8] border border-[#3c763d] text-[#3c763d] p-2 text-xs">
                  {status.message}
                </div>
              )}
              {status.type === 'error' && (
                <div className="mt-3 bg-[#f2dede] border border-[#a94442] text-[#a94442] p-2 text-xs">
                  {status.message}
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="xp-box">
            <div className="xp-box-header">
              <img src="/icons/user.png" alt="" className="w-4 h-4" />
              Coordonnées
            </div>
            <div className="xp-box-content">
              <div className="space-y-2">
                <a href="mailto:lucascontrerashodapp@gmail.com" className="flex items-center gap-2 text-[#0058e6] hover:underline text-xs">
                  <img src="/icons/message.ico" alt="" className="w-4 h-4" />
                  lucascontrerashodapp@gmail.com
                </a>
                <a href="https://linkedin.com/in/lucas-contreras-hodapp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#0058e6] hover:underline text-xs">
                  <img src="/icons/link.png" alt="" className="w-4 h-4" />
                  LinkedIn - Lucas Contreras Hodapp
                </a>
                <a href="https://github.com/Por-Tra" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#0058e6] hover:underline text-xs">
                  <img src="/icons/git.png" alt="" className="w-4 h-4" />
                  GitHub - Por-Tra
                </a>
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="xp-tipbox">
            <img src="/icons/questionMark.png" alt="" className="w-4 h-4 flex-shrink-0" />
            <span>Je réponds généralement sous 24-48h. N'hésitez pas à me contacter pour toute question ou opportunité !</span>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="xp-statusbar">
        <span>Prêt</span>
        <span>lucascontrerashodapp@gmail.com</span>
      </div>
    </div>
  );
};
