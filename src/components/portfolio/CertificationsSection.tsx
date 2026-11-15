import React, { useState } from 'react';
import { Award, ExternalLink, Eye, X, ShieldCheck, CheckCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Certification } from '../../types/portfolio';

export const CertificationsSection: React.FC = () => {
  const { certifications, adminPreviewMode } = useData();
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  const visibleCerts = certifications.filter((c) => adminPreviewMode || c.status === 'published');

  return (
    <section id="certifications" className="border-b-4 border-retro-black bg-white p-6 sm:p-10 md:p-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-retro-lime text-retro-black font-mono text-xs font-bold border-2 border-retro-black shadow-neo-sm mb-2">
              <Award size={16} />
              <span>INDUSTRY RECOGNITION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-retro-black uppercase tracking-wider">
              LICENSES & CERTIFICATIONS
            </h2>
          </div>
          <span className="font-mono text-xs font-bold bg-retro-cream px-3 py-1.5 border-2 border-retro-black shadow-neo-sm">
            {visibleCerts.length} CREDENTIALS RECORDED
          </span>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCerts.map((cert, idx) => (
            <div
              key={cert.id}
              className="card-neo p-6 bg-white flex flex-col justify-between hover:-translate-y-1 hover:shadow-neo-lg transition-all"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-retro-purple text-white border-2 border-retro-black flex items-center justify-center font-display font-black text-sm shadow-neo-sm">
                    0{idx + 1}
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-retro-yellow border border-retro-black">
                    {cert.issue_date}
                  </span>
                </div>

                <h3 className="font-display text-lg font-black text-retro-black uppercase leading-snug mb-2">
                  {cert.title}
                </h3>

                <p className="font-mono text-xs text-retro-darkgray mb-4">
                  Issued by: <strong className="text-retro-black">{cert.issuer}</strong>
                </p>

                {cert.credential_id && (
                  <div className="bg-retro-cream p-2 border border-retro-black font-mono text-[11px] text-gray-700 mb-4 break-all">
                    <span className="font-bold text-retro-black">ID:</span> {cert.credential_id}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t-2 border-retro-black flex items-center gap-2">
                {cert.image_url && (
                  <button
                    onClick={() => setActiveCert(cert)}
                    className="btn-neo text-xs py-1.5 px-3 flex-1 flex items-center justify-center gap-1.5"
                  >
                    <Eye size={14} />
                    <span>PREVIEW</span>
                  </button>
                )}

                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-neo-lime text-xs py-1.5 px-3 flex items-center justify-center gap-1"
                  >
                    <span>VERIFY</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border-4 border-retro-black shadow-neo-xl overflow-hidden">
            <div className="bg-retro-black text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-retro-black">
              <span className="font-mono text-xs font-bold">CERTIFICATE_VIEWER // {activeCert.title}</span>
              <button
                onClick={() => setActiveCert(null)}
                className="w-6 h-6 bg-retro-pink text-retro-black flex items-center justify-center font-bold"
              >
                <X size={14} />
              </button>
            </div>
            <div className="p-4 bg-retro-cream">
              <img
                src={activeCert.image_url}
                alt={activeCert.title}
                className="w-full max-h-[65vh] object-contain border-2 border-retro-black bg-white"
              />
            </div>
            <div className="p-4 bg-white border-t-2 border-retro-black flex items-center justify-between">
              <div>
                <p className="font-display text-sm font-black uppercase">{activeCert.title}</p>
                <p className="font-mono text-xs text-gray-600">{activeCert.issuer} • {activeCert.issue_date}</p>
              </div>
              <button
                onClick={() => setActiveCert(null)}
                className="btn-neo text-xs py-1 px-3"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
