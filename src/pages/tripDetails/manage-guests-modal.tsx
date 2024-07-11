import { X, AtSign, Plus } from 'lucide-react'
import { FormEvent, useState, useEffect } from 'react'
import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { useParams } from 'react-router-dom'

interface InviteGuestesModalProps {
  closeManegeGuestesModalOpen: () => void,
}

interface Participants {
  id: string,
  name: string | null,
  email: string,
  is_confirmed: boolean
}

export function ManegeGuestesModal ({
  closeManegeGuestesModalOpen,
}: InviteGuestesModalProps) {
  const [participantsEmails, setParticipantsEmails] = useState<Participants[] | undefined>()

  const { tripId } = useParams()

  function getApi () {
    api.get(`/trips/${tripId}/participants`)
      .then(({data}) => {
        setParticipantsEmails(data.participants)
      })
  }

  useEffect(() => {
    if(tripId) {
      getApi()
    }
  }, [tripId])

  function addNewParticipant (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const email = formData.get('email')?.toString()

    if(participantsEmails?.find(participant => participant.email === email)) {
      return 
    }

    api.post(`/trips/${tripId}/invites`, {
      email
    })
      .then(() => {
        getApi()
      })
  }
  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Gerenciar convidados</h2>

            <button type='button' onClick={closeManegeGuestesModalOpen}>
              <X className='size-5 text-zinc-400'/>
            </button>
          </div>

          <p className='text-sm text-zinc-400'>Remova e adicione novos convidados da viagem.</p>
        </div>

        <div className='flex flex-wrap gap-2'>
          {participantsEmails?.map((participant) => (
            <div key={participant.id} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
              <span className='text-zinc-300'>{participant.email}</span>
              <button type='button'>
                <X className='size-4 text-zinc-400'/>
              </button>
            </div>
          ))}
        </div>

        <div className='w-full h-px bg-zinc-800'/>

        <form onSubmit={addNewParticipant} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center'>
          <div className='px-2 flex items-center flex-1 gap-2'>
            <AtSign className='text-zinc-400 size-5'/>
            <input
              type="email"
              name='email'
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button type='submit'>
            Convidar
            <Plus className='size-5'/>
          </Button>
        </form>
      </div>
    </div>
  )
}