import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQ_ITEMS } from '@/lib/content'

export function FAQSection() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <h2 className="section-title mb-12">Questions.</h2>

        <div
          className="glass glass--milk rounded-lg overflow-hidden"
          style={{ padding: '0.5rem' }}
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b last:border-b-0"
                style={{ borderColor: 'rgb(255 255 255 / 0.28)' }}
              >
                <AccordionTrigger
                  className="px-6 py-4 text-left hover:no-underline"
                  style={{ color: 'var(--ink)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent
                  className="px-6 pb-4 body-copy"
                  style={{ color: 'var(--ink)', opacity: 0.75 }}
                >
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
