// Cloudflare's documented email_off markers preserve this static contact link.
// The HTML is a constant; no user input is interpolated.
export default function ContactEmail({ className }: { className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: '<!--email_off--><a href="mailto:support@fortniteshoptoken.top">support@fortniteshoptoken.top</a><!--/email_off-->' }} />;
}
