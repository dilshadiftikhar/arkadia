import { redirect } from 'next/navigation'
import {
  Trophy, Users, Brain, Flame, Heart, Sword, Compass,
  User, Shield, Crown,
  Calendar, MapPin, Clock,
} from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { colors, copperGradient } from '@/lib/design-tokens'

export default function DesignSystemPage() {
  if (process.env.NODE_ENV !== 'development') {
    redirect('/')
  }

  return (
    <main className="min-h-screen bg-ink-950 text-parchment py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-20">

        {/* ── HEADER ── */}
        <div className="text-center space-y-3">
          <h1 className="font-cinzel text-4xl font-bold tracking-wide"
              style={{ background: copperGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Design System — Arkadia
          </h1>
          <p className="font-crimson text-xl italic text-parchment-dim">
            Taverne médiévale moderne · Ambiance bougies &amp; feu de cheminée
          </p>
        </div>

        {/* ── LOGO ── */}
        <Section title="Logo">
          <div className="flex flex-wrap items-end gap-12">
            <div className="space-y-2">
              <Label>Variant full</Label>
              <Logo variant="full" />
            </div>
            <div className="space-y-2">
              <Label>Variant compact</Label>
              <Logo variant="compact" />
            </div>
            <div className="space-y-2">
              <Label>Variant icon</Label>
              <Logo variant="icon" />
            </div>
          </div>
        </Section>

        {/* ── TYPOGRAPHIE ── */}
        <Section title="Typographie">
          <div className="space-y-5">
            <div>
              <Label>H1 — Cinzel 56px Bold</Label>
              <h1 className="font-cinzel text-5xl font-bold">La Taverne d&apos;Arkadia</h1>
            </div>
            <div>
              <Label>H2 — Cinzel 32px Semibold</Label>
              <h2 className="font-cinzel text-3xl font-semibold">Prochains Événements</h2>
            </div>
            <div>
              <Label>H3 — Cinzel 20px Semibold</Label>
              <h3 className="font-cinzel text-xl font-semibold">Tournoi de Catan</h3>
            </div>
            <div>
              <Label>Subtitle — Crimson Text 18px italic</Label>
              <p className="font-crimson text-lg italic text-parchment-dim">
                Une soirée de stratégie et d&apos;alliance au coin du feu
              </p>
            </div>
            <div>
              <Label>Body — Inter 16px</Label>
              <p className="font-sans text-base text-parchment-dim leading-7">
                Rejoignez-nous pour une soirée inoubliable autour des meilleurs jeux de
                société. Débutants et confirmés bienvenus, l&apos;ambiance est chaleureuse
                et conviviale.
              </p>
            </div>
            <div>
              <Label>Small / Meta — Inter 13px muted</Label>
              <p className="font-sans text-[13px] text-parchment-muted">
                Capacité : 12 joueurs · Durée : 3h · Niveau débutant
              </p>
            </div>
            <div>
              <Label>Label / Badge — Inter 11px uppercase</Label>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-parchment-muted">
                Stratégie · Coopératif · Ambiance
              </p>
            </div>
            <div>
              <Label>Prix / Accent — Cinzel 16px copper</Label>
              <p className="font-cinzel text-base text-copper-light">12 €</p>
            </div>
            <div>
              <Label>Tagline logo — Cinzel 11px</Label>
              <p className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-copper-base">
                Jouer • Trinquer • Revenir
              </p>
            </div>
          </div>
        </Section>

        {/* ── COULEURS ── */}
        <Section title="Palette de couleurs">
          <div className="space-y-6">
            <ColorGroup label="Cuivre" colors={[
              { name: 'base',  hex: colors.copper.base  },
              { name: 'light', hex: colors.copper.light },
              { name: 'dark',  hex: colors.copper.dark  },
              { name: 'deep',  hex: colors.copper.deep  },
              { name: 'muted', hex: colors.copper.muted },
            ]} />
            <ColorGroup label="Forêt" colors={[
              { name: 'base',  hex: colors.forest.base  },
              { name: 'light', hex: colors.forest.light },
              { name: 'deep',  hex: colors.forest.deep  },
              { name: 'moss',  hex: colors.forest.moss  },
            ]} />
            <ColorGroup label="Encre (fonds)" colors={[
              { name: '950', hex: colors.ink[950] },
              { name: '900', hex: colors.ink[900] },
              { name: '800', hex: colors.ink[800] },
              { name: '700', hex: colors.ink[700] },
              { name: '600', hex: colors.ink[600] },
              { name: '500', hex: colors.ink[500] },
              { name: '400', hex: colors.ink[400] },
            ]} />
            <ColorGroup label="Parchemin (textes)" colors={[
              { name: 'primary',   hex: colors.text.primary   },
              { name: 'secondary', hex: colors.text.secondary },
              { name: 'muted',     hex: colors.text.muted     },
              { name: 'copper',    hex: colors.text.copper    },
            ]} />
          </div>
        </Section>

        {/* ── BOUTONS ── */}
        <Section title="Boutons">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="space-y-2 text-center">
              <Label>Primary</Label>
              <button className="btn-primary">Réserver ma place</button>
            </div>
            <div className="space-y-2 text-center">
              <Label>Secondary</Label>
              <button className="btn-secondary">Voir le détail</button>
            </div>
            <div className="space-y-2 text-center">
              <Label>Ghost</Label>
              <button className="btn-ghost">Retour</button>
            </div>
            <div className="space-y-2 text-center">
              <Label>Primary disabled</Label>
              <button className="btn-primary" disabled>Complet</button>
            </div>
          </div>
        </Section>

        {/* ── BADGES ── */}
        <Section title="Badges">
          <div className="space-y-4">
            <div>
              <Label>Niveaux</Label>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="badge-level-beginner">Débutant</span>
                <span className="badge-level-mid">Intermédiaire</span>
                <span className="badge-level-expert">Expert</span>
                <span className="badge-all">Tous niveaux</span>
              </div>
            </div>
            <div>
              <Label>Statuts</Label>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="badge-open-table">Table ouverte</span>
                <span className="badge-full">Complet</span>
              </div>
            </div>
            <div>
              <Label>Catégories — icônes Lucide</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                <BadgeIcon icon={<Compass size={12} />} label="Découverte" />
                <BadgeIcon icon={<Trophy size={12} />} label="Tournoi" />
                <BadgeIcon icon={<Users size={12} />} label="Coopératif" />
                <BadgeIcon icon={<Brain size={12} />} label="Stratégie" />
                <BadgeIcon icon={<Flame size={12} />} label="Ambiance" />
                <BadgeIcon icon={<Heart size={12} />} label="Famille" />
                <BadgeIcon icon={<Sword size={12} />} label="Jeux de rôle" />
              </div>
            </div>
            <div>
              <Label>Tiers abonnement</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                <BadgeIcon icon={<User size={12} />} label="Visiteur" variant="muted" />
                <BadgeIcon icon={<Shield size={12} />} label="Aventurier" variant="copper" />
                <BadgeIcon icon={<Crown size={12} />} label="Légende" variant="gold" />
              </div>
            </div>
          </div>
        </Section>

        {/* ── EVENT CARD ── */}
        <Section title="Event Card">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <div className="card-event">
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="badge-level-beginner">Débutant</span>
                  <Trophy size={16} color="#a2573a" />
                </div>
                <h3 className="font-cinzel text-lg font-semibold text-parchment">
                  Tournoi de Catan
                </h3>
                <p className="font-sans text-sm text-parchment-dim leading-relaxed">
                  Affrontez d&apos;autres joueurs dans ce classique de la stratégie.
                </p>
                <div className="space-y-1.5 text-[13px] text-parchment-muted">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} color="#8c8c8d" />
                    <span className="text-copper-light">Vendredi 4 avril</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={12} color="#8c8c8d" />
                    <span>19h00 – 22h00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={12} color="#8c8c8d" />
                    <span>Arkadia – Table 3</span>
                  </div>
                </div>
                {/* Capacity bar 60% */}
                <div>
                  <div className="flex justify-between text-[11px] text-parchment-muted mb-1">
                    <span>Places disponibles</span>
                    <span>6 / 10</span>
                  </div>
                  <div className="capacity-bar">
                    <div className="capacity-fill" style={{ width: '60%' }} />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-cinzel text-base text-copper-light">12 €</span>
                  <button className="btn-primary text-xs px-4 py-2">Réserver</button>
                </div>
              </div>
            </div>

            {/* Card complet */}
            <div className="card-event opacity-75">
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="badge-full">Complet</span>
                  <Brain size={16} color="#8c8c8d" />
                </div>
                <h3 className="font-cinzel text-lg font-semibold text-parchment">
                  Nuit Stratégie
                </h3>
                <p className="font-sans text-sm text-parchment-dim">
                  Twilight Imperium, Terraforming Mars, Wingspan.
                </p>
                <div className="space-y-1.5 text-[13px] text-parchment-muted">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} color="#8c8c8d" />
                    <span className="text-copper-light">Samedi 5 avril</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={12} color="#8c8c8d" />
                    <span>18h00 – 02h00</span>
                  </div>
                </div>
                {/* Capacity bar 100% */}
                <div>
                  <div className="flex justify-between text-[11px] text-parchment-muted mb-1">
                    <span>Places disponibles</span>
                    <span>0 / 8</span>
                  </div>
                  <div className="capacity-bar">
                    <div className="capacity-fill full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-cinzel text-base text-copper-light">18 €</span>
                  <button className="btn-secondary text-xs px-4 py-2" disabled>
                    Complet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── CAPACITY BARS ── */}
        <Section title="Capacity Bar">
          <div className="max-w-xs space-y-4">
            <div>
              <Label>40% — Normal</Label>
              <div className="capacity-bar mt-2">
                <div className="capacity-fill" style={{ width: '40%' }} />
              </div>
            </div>
            <div>
              <Label>80% — Presque complet</Label>
              <div className="capacity-bar mt-2">
                <div className="capacity-fill nearly-full" style={{ width: '80%' }} />
              </div>
            </div>
            <div>
              <Label>100% — Complet</Label>
              <div className="capacity-bar mt-2">
                <div className="capacity-fill full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </Section>

        {/* ── SÉPARATEUR ── */}
        <Section title="Séparateur">
          <div className="separator-copper">
            <span className="font-cinzel text-sm text-copper-light uppercase tracking-widest">
              •
            </span>
          </div>
        </Section>

        {/* ── INPUT ── */}
        <Section title="Input">
          <div className="max-w-sm space-y-4">
            <div>
              <label className="block font-sans text-sm text-parchment-dim mb-2">
                Ton prénom
              </label>
              <input
                className="input-arkadia"
                type="text"
                placeholder="ex. Théodore"
              />
            </div>
            <div>
              <label className="block font-sans text-sm text-parchment-dim mb-2">
                Email
              </label>
              <input
                className="input-arkadia"
                type="email"
                placeholder="theo@arkadia.fr"
              />
            </div>
          </div>
        </Section>

        {/* ── SKELETON ── */}
        <Section title="Skeleton Loader">
          <div className="max-w-sm space-y-3">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-4 w-2/3" />
            <div className="flex gap-3 mt-4">
              <div className="skeleton h-8 w-24 rounded-md" />
              <div className="skeleton h-8 w-16 rounded-md" />
            </div>
          </div>
        </Section>

      </div>
    </main>
  )
}

/* ── Composants locaux ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-4">
        <h2 className="font-cinzel text-2xl font-semibold text-parchment">{title}</h2>
        <div className="flex-1 h-px bg-ink-600" />
      </div>
      {children}
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-parchment-muted mb-1">
      {children}
    </p>
  )
}

function ColorGroup({ label, colors: swatches }: { label: string; colors: { name: string; hex: string }[] }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-3 mt-2">
        {swatches.map(({ name, hex }) => (
          <div key={name} className="flex flex-col items-center gap-1.5">
            <div
              className="w-12 h-12 rounded-md border border-ink-600"
              style={{ backgroundColor: hex }}
            />
            <span className="font-sans text-[10px] text-parchment-muted text-center">
              {name}
            </span>
            <span className="font-sans text-[9px] text-parchment-muted/60 uppercase">
              {hex}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BadgeIcon({
  icon,
  label,
  variant = 'default',
}: {
  icon: React.ReactNode
  label: string
  variant?: 'default' | 'muted' | 'copper' | 'gold'
}) {
  const styles = {
    default: 'bg-ink-700 text-parchment-dim border border-ink-600',
    muted:   'bg-ink-700 text-parchment-muted border border-ink-600',
    copper:  'bg-copper-base/20 text-copper-light border border-copper-base/40',
    gold:    'bg-copper-light/20 text-copper-light border border-copper-light/40',
  }[variant]

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${styles}`}>
      {icon}
      {label}
    </span>
  )
}
