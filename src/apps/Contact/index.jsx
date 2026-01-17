/**
 * Application: Contact
 * 
 * Formulaire de contact style email XP
 */
import { useState } from 'react';

export const config = {
  id: 'contact',
  name: 'Contact',
  icon: '/icons/signal.png',
  defaultWidth: 600,
  defaultHeight: 500,
};

export const Component = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="xp-app">
      {/* Menu Bar */}
      <div className="xp-menubar">
        <span>Fichier</span>
        <span>Édition</span>
        <span>Affichage</span>
        <span>Message</span>
        <span>?</span>
      </div>

      {/* Toolbar */}
      <div className="xp-toolbar">
        <button className="xp-toolbar-btn" onClick={handleSubmit}>
          <img src="/icons/signal.png" alt="" className="w-4 h-4" />
          Envoyer
        </button>
        <div className="xp-toolbar-separator"></div>
        <button className="xp-toolbar-btn">
          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
          Joindre
        </button>
        <button className="xp-toolbar-btn">
          <img src="/icons/check.png" alt="" className="w-4 h-4" />
          Orthographe
        </button>
      </div>

      {/* Address Bar */}
      <div className="xp-addressbar">
        <span className="xp-addressbar-label">Adresse</span>
        <div className="xp-addressbar-input">
          <img src="/icons/signal.png" alt="" className="w-4 h-4" />
          <span>C:\Utilisateurs\Lucas\Contact</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="xp-content">
        {/* Sidebar */}
        <div className="xp-sidebar">
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header">
              <img src="/icons/signal.png" alt="" className="w-4 h-4" />
              Contact direct
            </div>
            <div className="xp-sidebar-content">
              <a href="mailto:lucascontrerashodapp@gmail.com" className="xp-sidebar-link">
                <img src="/icons/signal.png" alt="" className="w-3 h-3" />
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
            <img src="/icons/signal.png" alt="" className="w-12 h-12" />
            <div>
              <h1 className="xp-title">Me Contacter</h1>
              <p className="xp-subtitle">Envoyez-moi un message</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="xp-box xp-box-blue">
            <div className="xp-box-header">
              <img src="/icons/signal.png" alt="" className="w-4 h-4" />
              Nouveau Message
            </div>
            <div className="xp-box-content">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-16">De :</label>
                  <input
                    type="text"
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
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Écrivez votre message ici..."
                    className="w-full h-28 bg-white border border-[#7f9db9] px-2 py-1 text-xs focus:outline-none focus:border-[#0058e6] resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="submit" className="xp-btn">
                    <img src="/icons/signal.png" alt="" className="w-3 h-3" />
                    Envoyer
                  </button>
                </div>
              </form>

              {sent && (
                <div className="mt-3 bg-[#dff0d8] border border-[#3c763d] text-[#3c763d] p-2 text-xs">
                  Message envoyé avec succès !
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
                  <img src="/icons/signal.png" alt="" className="w-4 h-4" />
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
