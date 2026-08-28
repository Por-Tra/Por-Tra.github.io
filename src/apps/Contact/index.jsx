/**
 * Application: Contact
 * 
 * Formulaire de contact style email XP
 */


import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { MenuBar, useZoom, getZoomStyle } from '../../components/ProjectLayout';
import { t } from '../../i18n/text';

const EMAILJS_SERVICE_ID = 'service_9238i9o';
const EMAILJS_TEMPLATE_ID = 'template_z0t6obo';
const EMAILJS_PUBLIC_KEY = 'JXym1o248Cu8QeyUi';

export const config = {
  id: 'contact',
  name: 'Contact',
  icon: '/icons/message.ico',
  defaultWidth: 600,
  defaultHeight: 500,
};

const COPY = {
  toolbarSend: { FR: 'Envoyer', EN: 'Send', ES: 'Enviar' },
  address: { FR: 'Adresse', EN: 'Address', ES: 'Dirección' },
  addressPath: { FR: 'C:\\Utilisateurs\\Lucas\\Contact', EN: 'C:\\Users\\Lucas\\Contact', ES: 'C:\\Usuarios\\Lucas\\Contact' },
  directContact: { FR: 'Contact direct', EN: 'Direct contact', ES: 'Contacto directo' },
  information: { FR: 'Informations', EN: 'Information', ES: 'Información' },
  locationLabel: { FR: 'Lieu', EN: 'Location', ES: 'Ubicación' },
  locationValue: { FR: 'Le Puy-en-Velay, France', EN: 'Le Puy-en-Velay, France', ES: 'Le Puy-en-Velay, Francia' },
  availabilityLabel: { FR: 'Disponibilité', EN: 'Availability', ES: 'Disponibilidad' },
  availabilityValue: { FR: 'Ouvert aux opportunités', EN: 'Open to opportunities', ES: 'Abierto a las oportunidades' },
  headerTitle: { FR: 'Me Contacter', EN: 'Get in touch', ES: 'Ponte en contacto' },
  headerSubtitle: { FR: 'Envoyez-moi un message', EN: 'Send me a message', ES: 'Envíame un mensaje' },
  newMessage: { FR: 'Nouveau Message', EN: 'New Message', ES: 'Nuevo Mensaje' },
  labelFrom: { FR: 'De :', EN: 'From:', ES: 'De:' },
  labelEmail: { FR: 'Email :' },
  labelMessage: { FR: 'Message :', EN: 'Message:', ES: 'Mensaje:' },
  placeholderName: { FR: 'Votre nom', EN: 'Your name', ES: 'Tu nombre' },
  placeholderEmail: { FR: 'votre@email.com', EN: 'your@email.com', ES: 'tu@email.com' },
  placeholderMessage: { FR: 'Écrivez votre message ici...', EN: 'Write your message here...', ES: 'Escribe tu mensaje aquí...' },
  sending: { FR: 'Envoi...', EN: 'Sending...', ES: 'Enviando...' },
  send: { FR: 'Envoyer', EN: 'Send', ES: 'Enviar' },
  statusSuccess: { FR: 'Message envoyé', EN: 'Message sent', ES: 'Mensaje enviado' },
  statusError: { FR: "Erreur lors de l'envoi. Réessayez ou contactez-moi directement par email.", EN: 'Error sending message. Try again or contact me directly by email.', ES: 'Error enviando mensaje. Inténtalo de nuevo o contáctame directamente por email.' },
  contactDetails: { FR: 'Coordonnées', EN: 'Contact details', ES: 'Detalles de contacto' },
  tip: {
    FR: "Je réponds généralement sous 24-48h. N'hésitez pas à me contacter pour toute question ou opportunité !",
    EN: 'I usually reply within 24-48h. Feel free to reach out for any question or opportunity!',
    ES: 'Normalmente respondo dentro de 24-48h. ¡No dudes en contactarme para cualquier pregunta u oportunidad!',
  },
  statusReady: { FR: 'Prêt', EN: 'Ready', ES: 'Listo' },
};

export const Component = ({ currentLanguage }) => {
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Anti-bot honeypot check
    if (formRef.current.company.value) {
      setSending(false);
      return;
    }
    
    setSending(true);
    setStatus({ type: '' });

    emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formRef.current,
      EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setStatus({ type: 'success' });
      setFormData({ name: '', email: '', message: '' });
      setSending(false);
      setTimeout(() => setStatus({ type: '' }), 5000);
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      setStatus({ type: 'error' });
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
        currentLanguage={currentLanguage}
      />

      {/* Toolbar */}
      <div className="xp-toolbar">
        <button className="xp-toolbar-btn" type="submit" form="contact-form">
          {t(COPY.toolbarSend, currentLanguage)}
        </button>
      </div>

      {/* Address Bar */}
      <div className="xp-addressbar">
        <span className="xp-addressbar-label">{t(COPY.address, currentLanguage)}</span>
        <div className="xp-addressbar-input">
          <img src="/icons/message.ico" alt="" className="w-4 h-4" />
          <span>{t(COPY.addressPath, currentLanguage)}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="xp-content xp-content-zoomable" style={getZoomStyle(zoom)}>
        {/* Sidebar */}
        <div className="xp-sidebar">
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header">
              <img src="/icons/message.ico" alt="" className="w-4 h-4" />
              {t(COPY.directContact, currentLanguage)}
            </div>
            <div className="xp-sidebar-content">
              <a href="mailto:lucascontrerashodapp@gmail.com" className="xp-sidebar-link">
                <img src="/icons/message.ico" alt="" className="w-3 h-3" />
                Email
              </a>
              <a href="https://linkedin.com/in/lucas-contreras-hodapp" target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
                <img src="/icons/link.webp" alt="" className="w-3 h-3" />
                LinkedIn
              </a>
              <a href="https://github.com/Por-Tra" target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
                <img src="/icons/git.webp" alt="" className="w-3 h-3" />
                GitHub
              </a>
            </div>
          </div>

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header">
              <img src="/icons/info.png" alt="" className="w-4 h-4" />
              {t(COPY.information, currentLanguage)}
            </div>
            <div className="xp-sidebar-content">
              <p className="xp-sidebar-info"><strong>{t(COPY.locationLabel, currentLanguage)}:</strong></p>
              <p className="xp-sidebar-info-small">{t(COPY.locationValue, currentLanguage)}</p>
              <p className="xp-sidebar-info"><strong>{t(COPY.availabilityLabel, currentLanguage)}:</strong></p>
              <p className="xp-sidebar-info-small">{t(COPY.availabilityValue, currentLanguage)}</p>
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className="xp-content-main">
          {/* Header */}
          <div className="xp-content-header">
            <img src="/icons/message.ico" alt="" className="w-12 h-12" />
            <div>
              <h1 className="xp-title">{t(COPY.headerTitle, currentLanguage)}</h1>
              <p className="xp-subtitle">{t(COPY.headerSubtitle, currentLanguage)}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="xp-box xp-box-blue">
            <div className="xp-box-header">
              <img src="/icons/message.ico" alt="" className="w-4 h-4" />
              {t(COPY.newMessage, currentLanguage)}
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
                  <label className="text-xs font-medium w-16">{t(COPY.labelFrom, currentLanguage)}</label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t(COPY.placeholderName, currentLanguage)}
                    className="flex-1 bg-white border border-[#7f9db9] px-2 py-1 text-xs focus:outline-none focus:border-[#0058e6]"
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-16">{t(COPY.labelEmail, currentLanguage)}</label>
                  <input
                    type="email"
                    name="reply_to"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t(COPY.placeholderEmail, currentLanguage)}
                    className="flex-1 bg-white border border-[#7f9db9] px-2 py-1 text-xs focus:outline-none focus:border-[#0058e6]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-medium block mb-1">{t(COPY.labelMessage, currentLanguage)}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t(COPY.placeholderMessage, currentLanguage)}
                    className="w-full h-28 bg-white border border-[#7f9db9] px-2 py-1 text-xs focus:outline-none focus:border-[#0058e6] resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="submit" className="xp-btn" disabled={sending}>
                    <img src="/icons/message.ico" alt="" className="w-3 h-3" />
                    {sending ? t(COPY.sending, currentLanguage) : t(COPY.send, currentLanguage)}
                  </button>
                </div>
              </form>

              {status.type === 'success' && (
                <div className="mt-3 bg-[#dff0d8] border border-[#3c763d] text-[#3c763d] p-2 text-xs">
                  {t(COPY.statusSuccess, currentLanguage)}
                </div>
              )}
              {status.type === 'error' && (
                <div className="mt-3 bg-[#f2dede] border border-[#a94442] text-[#a94442] p-2 text-xs">
                  {t(COPY.statusError, currentLanguage)}
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="xp-box">
            <div className="xp-box-header">
              <img src="/icons/user.png" alt="" className="w-4 h-4" />
              {t(COPY.contactDetails, currentLanguage)}
            </div>
            <div className="xp-box-content">
              <div className="space-y-2">
                <a href="mailto:lucascontrerashodapp@gmail.com" className="flex items-center gap-2 text-[#0058e6] hover:underline text-xs">
                  <img src="/icons/message.ico" alt="" className="w-4 h-4" />
                  lucascontrerashodapp@gmail.com
                </a>
                <a href="https://linkedin.com/in/lucas-contreras-hodapp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#0058e6] hover:underline text-xs">
                  <img src="/icons/link.webp" alt="" className="w-4 h-4" />
                  LinkedIn - Lucas Contreras Hodapp
                </a>
                <a href="https://github.com/Por-Tra" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#0058e6] hover:underline text-xs">
                  <img src="/icons/git.webp" alt="" className="w-4 h-4" />
                  GitHub - Por-Tra
                </a>
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="xp-tipbox">
            <img src="/icons/questionMark.webp" alt="" className="w-4 h-4 flex-shrink-0" />
            <span>{t(COPY.tip, currentLanguage)}</span>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="xp-statusbar">
        <span>{t(COPY.statusReady, currentLanguage)}</span>
        <span>lucascontrerashodapp@gmail.com</span>
      </div>
    </div>
  );
};
