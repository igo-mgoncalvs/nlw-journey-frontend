import { useEffect, useState } from 'react'
import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from 'date-fns/format';

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

interface DestinationAndDateHeaderProps {
  openDestinationAndDateModal: () => void
}

export function DestinationAndDateHeader ({
  openDestinationAndDateModal
}: DestinationAndDateHeaderProps) {
  const [trip, setTrip] = useState<Trip | undefined>()

  const { tripId } = useParams()

  useEffect(() => {
    api.get(`/trips/${tripId}`)
      .then(({data}) => {
        setTrip(data.trip)
      })

  }, [tripId])

  const displayedDate = trip 
  ? format(trip.starts_at, "d' de 'LLL").concat(' até ').concat(format(trip.ends_at, "d' de 'LLL"))
  : null

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className='flex items-center gap-2'> 
        <MapPin className='size-5 text-zinc-400' />
        <span className='text-zinc-100'>
          {trip?.destination}
        </span>
      </div>

      <div className='flex items-center gap-5'>
        <div className='flex items-center gap-2'> 
          <Calendar className='size-5 text-zinc-400' />
          <span className='text-zinc-100'>
            {displayedDate}
          </span>
        </div>

        <div className='w-px h-6 bg-zinc-800'/>

        <Button vatiant="secondary" onClick={openDestinationAndDateModal}>
          Alterar local/data
          <Settings2 className='size-5'/>
        </Button>
      </div>
    </div>
  )
}