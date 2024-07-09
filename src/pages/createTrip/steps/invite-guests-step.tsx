import { ArrowRight, UserRoundPlus } from 'lucide-react'
import { Button } from '../../../components/button'

interface InviteGuestsStepProps {
  openGuestsModal: () => void
  emailsToInvite: string[]
  openConfirmTripModal: () => void
}

export function InviteGuestsStep ({
  openGuestsModal,
  emailsToInvite,
  openConfirmTripModal
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button type='button' onClick={openGuestsModal} className='flex items-center gap-2 flex-1'>
        <UserRoundPlus className='size-5 text-zinc-400' />
        {emailsToInvite.length > 0 ? (
          <span className='bg-transparent text-lg text-left text-zinc-100 flex-1'>
            {`${emailsToInvite.length} pessoa(s) convidada(s)`}
          </span>
        ): (
          <span className='bg-transparent text-lg text-left text-zinc-400 flex-1'>Quem estará na viagem?</span>
        )}
      </button>

      <div className='w-px h-6 bg-zinc-800'/>

      <Button onClick={openConfirmTripModal}>
        Confirmar viagem
        <ArrowRight className='size-5'/>
      </Button>
    </div>
  )
}