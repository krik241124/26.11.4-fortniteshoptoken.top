const links = [
  { href: '/fortnite-item-shop-today/', label: 'Item Shop Today' },
  { href: '/pirate-shop-token-drop-rate/', label: 'Odds calculator' },
  { href: '/how-to-get-pirate-shop-token/', label: 'Get the token' },
  { href: '/best-farming-spots/', label: 'Farming' },
  { href: '/how-to-activate-pirate-shop-access/', label: 'Activation planner' },
]

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/" className="brand" aria-label="Shop Token — home">
          <svg className="brand-mark" width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M20 2 36 11v18L20 38 4 29V11Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="m20 8 3.3 8.7L32 20l-8.7 3.3L20 32l-3.3-8.7L8 20l8.7-3.3Z" fill="currentColor" />
            <circle cx="20" cy="20" r="3" fill="#0c1512" />
          </svg>
          <span className="brand-copy"><strong>SHOP TOKEN<span className="brand-dot">.</span></strong><small>FORTNITE FIELD GUIDE</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <details className="mobile-menu">
          <summary>Menu <span aria-hidden="true">＋</span></summary>
          <nav aria-label="Mobile navigation">
            {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
        </details>
      </div>
    </header>
  )
}
