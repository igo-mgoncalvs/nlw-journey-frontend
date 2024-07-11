import { useState } from 'react'

import { MapPin, Calendar, ArrowRight, Settings2, X } from 'lucide-react'
import { DayPicker, DateRange } from 'react-day-picker'
import { Button } from '../../../components/button'
import "react-day-picker/dist/style.css";
import { format } from 'date-fns/format';

interface DestinationAndDateStepProps {
  isGuestsInputsOpen: boolean,
  closeGuestsInputs: () => void,
  openGuestsInput: () => void,
  setDestination: (destination: string) => void,
  setEventStartAndEndDates: (name: DateRange | undefined) => void
  eventStartAndEndDates: DateRange | undefined
}

export function DestinationAndDateStep ({
  isGuestsInputsOpen,
  closeGuestsInputs,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to 
  ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
  : null

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
        <div className='flex items-center gap-2 flex-1'>
          <MapPin className='size-5 text-zinc-400' />
          <input
            disabled={isGuestsInputsOpen}
            type="text" placeholder="Para onde você vai?"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>

        <button disabled={isGuestsInputsOpen} onClick={openDatePicker} className='flex items-center gap-2 w-[240px]'>
          <Calendar className='size-5 text-zinc-400' />
          <span  className="bg-transparent text-lg text-left w-40 text-zinc-400 flex-1">
            {displayedDate || 'Quando?'}
          </span>
        </button>

        {isDatePickerOpen && (
          <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-lg font-semibold'>Selecione a Data</h2>

                  <button type='button' onClick={closeDatePicker}>
                    <X className='size-5 text-zinc-400'/>
                  </button>
                </div>
              </div>

              <DayPicker
                mode="range"
                selected={eventStartAndEndDates}
                onSelect={setEventStartAndEndDates}
              />
            </div>
          </div>
        )}

        <div className='w-px h-6 bg-zinc-800'/>

        {isGuestsInputsOpen ? (
          <Button onClick={closeGuestsInputs} vatiant='secondary'>
            Alterar local/data
            <Settings2 className='size-5'/>
          </Button>
        ): (
          <Button onClick={openGuestsInput}>
            Continuar
            <ArrowRight className='size-5'/>
          </Button>
        )}
        
      </div>
  )
}