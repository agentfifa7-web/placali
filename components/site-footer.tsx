import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-brand">
        <Link href="/" className="brand brand-light">
          <span className="brand-mark">
            <img src="/images/logo.png" alt="" />
          </span>
          <span>
            <strong>PLACALI</strong>
            <em>ABOURÉ</em>
          </span>
        </Link>
        <p>
          La cuisine ivoirienne
          <br />
          avec le cœur.
        </p>
      </div>
      <div className="footer-col">
        <h4>Nous trouver</h4>
        <p>
          Rue des Jardins, Cocody
          <br />
          Abidjan, Côte d’Ivoire
        </p>
        <Link href="/restaurants">
          Voir nos restaurants <ArrowRight size={15} />
        </Link>
      </div>
      <div className="footer-col">
        <h4>Explorer</h4>
        <div className="footer-links">
          <Link href="/menu">La carte</Link>
          <Link href="/evenements">Événements</Link>
          <Link href="/fidelite">Fidélité</Link>
          <Link href="/magazine">Magazine</Link>
          <Link href="/entreprise">Entreprise</Link>
          <Link href="/cartes-cadeaux">Cartes cadeaux</Link>
        </div>
      </div>
      <div className="footer-col socials">
        <h4>Suivez-nous</h4>
        <p>
          Instagram · TikTok
          <br />
          @placaliaboure
        </p>
        <a href="#accueil">
          Revenir en haut <ChevronDown size={15} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Placali Abouré</span>
        <span>Fait avec le cœur à Abidjan</span>
        <Link href="/admin">Espace pro</Link>
      </div>
    </footer>
  )
}
