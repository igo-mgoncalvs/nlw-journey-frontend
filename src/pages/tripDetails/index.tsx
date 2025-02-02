import { Plus } from 'lucide-react'
import { useState } from 'react'
import { CreateActivityModal } from './create-activity-modal'
import { ImportantLinks } from './important-links'
import { Guests } from './guests'
import { Activities } from './activities'
import { DestinationAndDateHeader } from './destination-and-date-Header'
import { Button } from '../../components/button'
import { CreateLinkModal } from './create-link-modal'
import { ManegeGuestesModal } from './manage-guests-modal'
import { ChangeDestinationAndDate } from './change-destination-and-date-modal'

export function TripDetails () {
  const [isCreateActivityMoalOpen, setIsCreateActivityMoalOpen] = useState(false)
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
  const [isManegeGuestesModalOpen, setManegeGuestesModalOpen] = useState(false)
  const [isChangeDestinationAndDateModal, setIsChangeDestinationAndDateModal] = useState(false)

  function openCreateActivityMoal() {
    setIsCreateActivityMoalOpen(true)
  }

  function closeCreateActivityMoal() {
    setIsCreateActivityMoalOpen(false)
  }

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true)
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false)
  }

  function openManegeGuestesModalOpen() {
    setManegeGuestesModalOpen(true)
  }

  function closeManegeGuestesModalOpen() {
    setManegeGuestesModalOpen(false)
  }

  function openDestinationAndDateModal() {
    setIsChangeDestinationAndDateModal(true)
  }

  function closeDestinationAndDateModal() {
    setIsChangeDestinationAndDateModal(false)
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader
        openDestinationAndDateModal={openDestinationAndDateModal}
      />

      <main className='flex gap-16 px-4'>
        <div className='flex-1 space-y-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-3xl font-semibold'>Atividades</h2>

            <Button
              onClick={openCreateActivityMoal}
              type='submit'
            >
              <Plus className='size-5'/>
              Cadastrar atividade
            </Button>
          </div>

          <Activities />
        </div>
        
        <div className='w-80 space-y-6'>
          <ImportantLinks
            openCreateLinkModal={openCreateLinkModal}
          /> 

          <div className='w-full h-px bg-zinc-800' />

          <Guests
            openManegeGuestesModalOpen={openManegeGuestesModalOpen}
          />
        </div>
      </main>

      {isCreateActivityMoalOpen && (
        <CreateActivityModal
          closeCreateActivityMoal={closeCreateActivityMoal}
        />
      )}
      
      {isCreateLinkModalOpen && (
        <CreateLinkModal
          closeCreateLinkModal={closeCreateLinkModal}
        />
      )}

      {isManegeGuestesModalOpen && (
        <ManegeGuestesModal
          closeManegeGuestesModalOpen={closeManegeGuestesModalOpen}
          
        />
      )}

      {isChangeDestinationAndDateModal && (
        <ChangeDestinationAndDate
          closeDestinationAndDateModal={closeDestinationAndDateModal}
        />
      )}
    </div>
  )
}