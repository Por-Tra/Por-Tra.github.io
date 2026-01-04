/**
 * Application: Contact
 * 
 * Formulaire de contact style email XP
 */
import { useState } from 'react';

export const config = {
  id: 'contact',
  name: 'Contact',
  icon: '/icons/folder.png',
  defaultWidth: 480,
  defaultHeight: 420,
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
    <div className="h-full bg-[#ece9d8] overflow-auto">
      {/* Toolbar */}
      <div className="bg-gradient-to-b from-[#ece9d8] to-[#d4d0c8] border-b border-[#808080] px-2 py-1 flex gap-4 text-xs">
        <span className="text-gray-600 hover:underline cursor-pointer">Fichier</span>
        <span className="text-gray-600 hover:underline cursor-pointer">Édition</span>
        <span className="text-gray-600 hover:underline cursor-pointer">Affichage</span>
        <span className="text-gray-600 hover:underline cursor-pointer">?</span>
      </div>

      {/* Button Bar */}
      <div className="bg-[#ece9d8] border-b border-[#808080] px-2 py-1 flex items-center gap-1">
        <button className="xp-button px-2 py-0.5 text-xs flex items-center gap-1">
          <img src="/icons/signal.png" alt="" className="w-4 h-4" />
          Envoyer
        </button>
        <button className="xp-button px-2 py-0.5 text-xs flex items-center gap-1">
          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
          Joindre
        </button>
      </div>

      <div className="p-3">
        {/* Contact Form */}
        <div className="bg-white border border-[#808080] rounded shadow-sm">
          <div className="bg-gradient-to-r from-[#0058e6] to-[#2878e8] text-white px-3 py-2 flex items-center gap-2">
            <img src="/icons/signal.png" alt="" className="w-5 h-5" />
            <h2 className="font-bold text-sm">Nouveau Message</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-3 space-y-2">
            <div className="flex items-center gap-2 border-b border-[#d4d0c8] pb-2">
              <label className="text-[11px] font-medium w-10">De :</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Votre nom"
                className="flex-1 bg-white border border-[#7f9db9] px-2 py-1 text-[11px] focus:outline-none focus:border-[#0058e6]"
                required
              />
            </div>

            <div className="flex items-center gap-2 border-b border-[#d4d0c8] pb-2">
              <label className="text-[11px] font-medium w-10">Email :</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="votre@email.com"
                className="flex-1 bg-white border border-[#7f9db9] px-2 py-1 text-[11px] focus:outline-none focus:border-[#0058e6]"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-medium block mb-1">Message :</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Écrivez votre message ici..."
                className="w-full h-24 bg-white border border-[#7f9db9] px-2 py-1 text-[11px] focus:outline-none focus:border-[#0058e6] resize-none"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="submit" className="xp-button px-3 py-1 text-[11px] flex items-center gap-1">
                <img src="/icons/signal.png" alt="" className="w-3 h-3" />
                Envoyer
              </button>
            </div>
          </form>

          {sent && (
            <div className="mx-3 mb-3 bg-[#dff0d8] border border-[#3c763d] text-[#3c763d] p-2 text-[11px]">
              Message envoyé avec succès !
            </div>
          )}
        </div>

        {/* Contact Links */}
        <div className="mt-3 bg-white border border-[#808080] rounded shadow-sm">
          <div className="bg-gradient-to-r from-[#0058e6] to-[#2878e8] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
            <img src="/icons/signal.png" alt="" className="w-4 h-4" />
            Autres moyens de contact
          </div>
          <div className="p-3 space-y-2 text-[11px]">
            <a
              href="mailto:lucascontrerashodapp@gmail.com"
              className="flex items-center gap-2 text-[#0058e6] hover:underline"
            >
              <img src="/icons/signal.png" alt="" className="w-4 h-4" />
              lucascontrerashodapp@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/lucas-contreras-hodapp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#0058e6] hover:underline"
            >
              <img src="/icons/explorer.png" alt="" className="w-4 h-4" />
              LinkedIn - Lucas Contreras Hodapp
            </a>
            <a
              href="https://github.com/Por-Tra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#0058e6] hover:underline"
            >
              <img src="/icons/explorer.png" alt="" className="w-4 h-4" />
              GitHub - Por-Tra
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
