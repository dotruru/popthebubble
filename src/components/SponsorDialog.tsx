'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SPONSOR_TIERS } from '@/lib/content'

type Tier = (typeof SPONSOR_TIERS)[number]

interface SponsorDialogProps {
  children: React.ReactNode
}

export function SponsorDialog({ children }: SponsorDialogProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null)
  const [form, setForm] = useState({ name: '', email: '', company: '', website: '' })

  function reset() {
    setStep(1)
    setSelectedTier(null)
    setForm({ name: '', email: '', company: '', website: '' })
  }

  function handleOpenChange(v: boolean) {
    setOpen(v)
    if (!v) reset()
  }

  function handleSelect(tier: Tier) {
    setSelectedTier(tier)
    setStep(2)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const tierName = selectedTier?.name ?? 'Partnership'
    const subject = encodeURIComponent(`${tierName} Sponsorship — Pop the Bubble`)
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in the ${tierName} tier for Pop the Bubble — London, 5–7 June 2026.\n\nName: ${form.name}\nCompany: ${form.company}\nWebsite: ${form.website || '—'}\n\nLooking forward to connecting.`
    )
    window.open(`mailto:contact@hackhouse.uk?subject=${subject}&body=${body}`)
    setOpen(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="max-w-xl gap-0 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {step === 1 && (
          <div className="p-6">
            <DialogHeader className="mb-5">
              <DialogTitle className="text-xl font-semibold">Partner with Pop the Bubble</DialogTitle>
              <DialogDescription>
                Three tiers. Pick the one that fits — your intro email opens ready to send.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              {SPONSOR_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => handleSelect(tier)}
                  className={`w-full text-left border rounded-xl p-4 transition-all group ${tier.borderClass}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">{tier.index}</Badge>
                      <span className="font-semibold">{tier.name}</span>
                    </div>
                    <span className="text-xs opacity-40 group-hover:opacity-70 transition-opacity">Select →</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex gap-1.5">
                        <span className="opacity-40 shrink-0">·</span>
                        <span><strong className="opacity-80">{perk.title}</strong> — <span className="opacity-60">{perk.detail}</span></span>
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-5 text-center">
              Credits, API access, and custom arrangements also welcome
            </p>
          </div>
        )}

        {step === 2 && selectedTier && (
          <div className="p-6">
            <button
              onClick={() => setStep(1)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-4 flex items-center gap-1"
            >
              ← Back to tiers
            </button>

            <DialogHeader className="mb-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="font-mono text-xs">{selectedTier.index}</Badge>
                <Badge>{selectedTier.name}</Badge>
              </div>
              <DialogTitle className="text-xl font-semibold">Tell us about yourself</DialogTitle>
              <DialogDescription>We'll follow up within 48 hours.</DialogDescription>
            </DialogHeader>

            <Separator className="my-4" />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="sp-name">Full name</Label>
                  <Input
                    id="sp-name"
                    required
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sp-email">Work email</Label>
                  <Input
                    id="sp-email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="sp-company">Company</Label>
                  <Input
                    id="sp-company"
                    required
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sp-website">Website</Label>
                  <Input
                    id="sp-website"
                    type="url"
                    placeholder="https://acme.com"
                    value={form.website}
                    onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                This opens your email client with a pre-filled intro to <strong>contact@hackhouse.uk</strong>.
              </p>

              <button
                type="submit"
                className="glass-button glass-button--primary w-full"
              >
                Send enquiry — {selectedTier.name} →
              </button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
