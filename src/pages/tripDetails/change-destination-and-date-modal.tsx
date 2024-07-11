import { FormEvent, useEffect, useState } from 'react'
import { MapPin, X } from "lucide-react";
import { Button } from "../../components/button";
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import { DateRange } from 'react-day-picker'

interface ChangeDestinationAndDateProps {
  closeDestinationAndDateModal: () => void
}

export function ChangeDestinationAndDate ({
  closeDestinationAndDateModal
}: ChangeDestinationAndDateProps) {
  const [destination, setDestination] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  const { tripId } = useParams()

  useEffect(() => {
    api.get(`/trips/${tripId}`)
      .then(({data}) => {
        setDestination(data.trip.destination)
        setEventStartAndEndDates({
          from: new Date(data.trip.starts_at),
          to: new Date(data.trip.ends_at)
        })
      })

  }, [tripId])

  async function updateTrip (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const data = new FormData(event.currentTarget)

    const destination = data.get('destination')?.toString()
    
    api.put(`/trips/${tripId}`, {
      destination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to
    })

    window.document.location.reload()
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Alterar local/data</h2>

          <button type='button' onClick={closeDestinationAndDateModal}>
            <X className='size-5 text-zinc-400'/>
          </button>
        </div>

        <form onSubmit={updateTrip} className='space-y-3'>
          <div className='px-5 flex-1 gap-2 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center'>
            <MapPin className='text-zinc-400 size-5'/>
            <input
              name='destination'
              placeholder="Local"
              defaultValue={destination}
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className='flex justify-center'>
            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </div>

          <Button type='submit' size="full">
            Salvar alterações
          </Button>
        </form>
      </div>
    </div>
  )
}