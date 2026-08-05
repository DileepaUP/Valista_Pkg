// Per docs/CLAUDE.md §3, Contact must include a working WhatsApp channel
// ("never a placeholder number"). Number below is the mobile contact from
// §1 (076 588 75 76 → +94 76 588 7576), pulled from client truck signage —
// verify this is still current before launch, per §9's caveat on phone numbers.
const WHATSAPP_NUMBER = "94765887576";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
    >
      <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7" aria-hidden="true">
        <path d="M17.6 6.32A8.86 8.86 0 0 0 11.9 4C7.03 4 3.08 7.95 3.08 12.82c0 1.56.41 3.08 1.19 4.42L3 21l3.86-1.24a9.83 9.83 0 0 0 4.98 1.35h.01c4.87 0 8.83-3.95 8.83-8.82a8.77 8.77 0 0 0-2.68-6.27l1.48-.7Zm-5.7 13.6h-.01a8.16 8.16 0 0 1-4.16-1.14l-.3-.18-3.09 1 1.03-3.02-.2-.31a8.1 8.1 0 0 1-1.25-4.35c0-4.5 3.66-8.15 8.16-8.15 2.18 0 4.22.85 5.76 2.4a8.08 8.08 0 0 1 2.39 5.76c0 4.5-3.66 8.15-8.33 8.15v-.01Zm4.47-6.12c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.03-.38-1.96-1.21a7.34 7.34 0 0 1-1.36-1.69c-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.31-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.11-.22-.17-.46-.29Z" />
      </svg>
    </a>
  );
}
